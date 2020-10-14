const GameState = require('../shared/game-state');
const Constants = require('../shared/constants');
const {
    StateChange, 
    TurnPassoverStateChange, 
    GuardianLockdownStateChange, 
    PhaseChangeStateChange, 
    MoveUnitStateChange, 
    UnitAttackStateChange, 
    SetUnitTargetStateChange
} = require('../shared/state-change');
const PathFinder = require('../shared/path-finder');

module.exports = class Game {
    static fromJson(json) {
        const map = {};
        json.players.forEach(p => {
            map[p] = undefined;
        });

        const game = new Game(map, json.gameStartTime);
        clearTimeout(game.initialTurnPassover);
        for (let i = 0; i < json.stateChanges.length; i++) {
            game.processStateChange(StateChange.deserialize(json.stateChanges[i]));
        }
        return game;
    }
    constructor(playerSocketMap, gameStartTime) {
        this.players = Object.keys(playerSocketMap);
        console.log("Constructing a new game with players: ", this.players);
        this.sockets = playerSocketMap;

        this.state = new GameState(gameStartTime, this.players);
        this.stateChanges = [];

        this.queuedActions = {
            builds: []
        };

        this.nextPhaseTimer = undefined;

        this.isGameOver = false;

        // Initial Phase State Change
        this.initialTurnPassover = setTimeout(() => {
            this.processStateChange(
                PhaseChangeStateChange.create(undefined));
        }, Constants.TIME_IN_SECONDS_BEFORE_GAME_START * 1000);
    }

    verifyStateChange(stateChange) {
        console.log('Verifying State Change');
        console.log(stateChange);
        return stateChange &&
            stateChange.verifyStateChange(this.state);
    }

    processStateChange(stateChange) {
        console.log('Processing State Change');

        const shouldBroadcastMap = {};
        this.players.forEach(p => {
            shouldBroadcastMap[p] = true;
        });

        stateChange.simulateStateChange(this.state);

        if (stateChange instanceof PhaseChangeStateChange) {
            if (this.state.phase === Constants.PHASE_PLANNING) {
                // Starting planning phase now
                if (this.nextPhaseTimer === undefined) {
                    this.nextPhaseTimer = setTimeout(() => {
                        this.nextPhaseTimer = undefined;
                        this.processStateChange(
                            PhaseChangeStateChange.create(undefined));
                    }, Constants.PLANNING_TIME * 1000);
                }
                else {
                    console.error('Next phase timer already set on Action!');
                }
            }
            else {
                this.runActionPhase();
            }
        }

        if (stateChange instanceof SetUnitTargetStateChange) {
            // Only tell the player it concerns
            this.players.forEach(p => {
                shouldBroadcastMap[p] = (p === stateChange.from);
            });
        }
        let shouldPush = true;
        if (stateChange instanceof GuardianLockdownStateChange) {
            let lastStateChange = this.stateChanges[this.stateChanges.length - 1];
            if (lastStateChange instanceof GuardianLockdownStateChange) {
                if (stateChange.data.posFrom.x === lastStateChange.data.posFrom.x &&
                    stateChange.data.posFrom.y === lastStateChange.data.posFrom.y) {
                    // Remove Last One
                    this.stateChanges.pop();
                    shouldPush = false;
                }
            }
        }
        if (shouldPush) {
            this.stateChanges.push(stateChange);
        }
        // TODO: Advanced processing here.
        this.players.forEach(p => {
            if (this.sockets[p] !== undefined && shouldBroadcastMap[p]) {
                this.sockets[p].emit('state-change', stateChange);
            }
        });
        return this.state.getWinner();
    }

    updateSocket(username, socket) {
        this.sockets[username] = socket;
    }

    removeSocket(socket) {
        this.players.forEach(p => {
            if (this.sockets[p] === socket) {
                this.sockets[p] = undefined;
            }
        })
    }

    runActionPhase() {
        // Action Phase Lasts a Set Amount of Time
        // After this time, all attack / movement is stopped for the round

        // Process Buildings
        for (let i = 0; i < this.queuedActions.builds.length; i++) {
            if (this.verifyStateChange(this.queuedActions.builds[i])) {
                this.processStateChange(this.queuedActions.builds[i]);
            }
        }
        this.queuedActions.builds = [];

        // Someone claimed everything.
        if (this.isGameOver) {
            return;
        }

        const actionMap = [];
        for (let i = 0; i < this.state.units.length; i++) {
            // target is a {enemy: _, inRangeTile: _ } as returned by
            //   getEnemiesInAttackRange
            actionMap.push({
                nextAttackTime: 0,
                nextMoveTime: 0,
                target: undefined
            });
        }
 
        const TICK_TIME = 10;

        const MOVE_COOLDOWN = 400;

        const actionPhaseStart = Date.now();
        
        const actionPhaseTick = setInterval(() => {
            // Each tick is every 10ms, unit tries to acquire target,
            //  given cooldown
            let currentTime = Date.now();

            for (let j = 0; j < this.state.units.length; j++) {
                const unit = this.state.units[j];
                // Try to acquire target and put into action map
                const potentialEnemies = this.state.getEnemiesInAttackRange(unit.position);
                if (potentialEnemies.length > 0) {
                    if (actionMap[j].target !== undefined) {
                        // See if current target still in potential enemies
                        const idToFind = actionMap[j].target.enemy.id;
                        actionMap[j].target = undefined;

                        for (let i = 0; i < potentialEnemies.length; i++) {
                            if (idToFind === potentialEnemies[i].enemy.id) {
                                actionMap[j].target = potentialEnemies[i];
                                break;
                            }
                        }
                    }
                    if (actionMap[j].target === undefined) {
                        // get (random) target
                        actionMap[j].target = potentialEnemies[0];
                    }
                }
                else {
                    actionMap[j].target = undefined;
                }
                
                let didMove = false;

                if (unit.targetPoint && unit.desiredPath &&
                        unit.desiredPath.length !== 0 && actionMap[j].nextMoveTime < currentTime &&
                        unit.currentHealth > 0) {
                    const pendingMove = MoveUnitStateChange.create(
                        unit.owner, unit.position,
                        unit.desiredPath[0]);
                    if (this.verifyStateChange(pendingMove)) {
                        this.processStateChange(pendingMove);
                        actionMap[j].nextMoveTime = currentTime + MOVE_COOLDOWN;
                        didMove = true;
                    }
                }
                
                if (!didMove && actionMap[j].target !== undefined && actionMap[j].nextAttackTime < currentTime) {
                    // Have a target for this tick and attack not cooldown
                    const pendingAttack = UnitAttackStateChange.create(
                        unit.owner, unit.position, actionMap[j].target.inRangeTile
                    );
                    if (this.verifyStateChange(pendingAttack)) {
                        this.processStateChange(pendingAttack);
                        const timeToNextAttack = 1000.0 / unit.attackSpeed;
                        actionMap[j].nextAttackTime = currentTime + timeToNextAttack;
                    }
                }
            }
            
            // Time is up for action phase if next tick will exceed
            const timeUp = (currentTime + TICK_TIME) > (actionPhaseStart + (Constants.ACTION_MAX_TIME * 1000));

            // We also end action phase if no one has any more targets,
            //   and finished moving
            let finishedActions = true;
            for (let i = 0; i < this.state.units.length; i++) {
                const unit = this.state.units[i];
                if (actionMap[i].target !== undefined) {
                    finishedActions = false;
                }
                if (unit.targetPoint && unit.moveRange > 0) {
                    finishedActions = false;
                }
            }
            // No one did a move, we can proceed with ending this action phase.
            if (timeUp || finishedActions || this.isGameOver) {
                clearInterval(actionPhaseTick);
                if (!this.isGameOver) {
                    setTimeout(() => {
                        this.processStateChange(PhaseChangeStateChange.create(undefined));
                    }, Constants.TIME_BEFORE_ACTION_TO_PLANNING * 1000);
                }
            }
        }, TICK_TIME);
    }
};
