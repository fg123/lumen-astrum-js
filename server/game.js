const GameState = require('../shared/game-state');
const Constants = require('../shared/constants');
const {
    StateChange, 
    PhaseChangeStateChange, 
    MoveUnitStateChange, 
    ChatMessageStateChange,
    UnitAttackStateChange, 
    SetUnitTargetStateChange,
    ActionTickStateChange
} = require('../shared/state-change');
const { default: modifier } = require('../shared/modifier');
const { maps, setupMap } = require('../shared/map');
const PathFinder = require('../shared/path-finder');

module.exports = class Game {
    static fromJson(json, onGameOver) {
        const map = {};
        json.players.forEach(p => {
            map[p] = undefined;
        });

        const game = new Game(map, json.gameStartTime, onGameOver, json.mapName);
        clearTimeout(game.initialTurnPassover);
        for (let i = 0; i < json.stateChanges.length; i++) {
            const stateChange = StateChange.deserialize(json.stateChanges[i]);
            stateChange.simulateStateChange(game.state);
            game.stateChanges.push(stateChange);
        }
        // Don't have any idea what phase we're actually in, so let's just:
        game.processStateChange(PhaseChangeStateChange.create(game.state, undefined));
        return game;
    }

    constructor(playerSocketMap, gameStartTime, onGameOver, mapName, testMode = false) {
        // TestMode runs no timers.

        this.mapName = mapName;
        this.gameStartTime = gameStartTime;
        this.testMode = testMode;
        
        this.players = Object.keys(playerSocketMap);
        this.onGameOver = onGameOver;

        console.log("Constructing a new game with players: ", this.players);
        this.sockets = playerSocketMap;
        const gameMap = setupMap(maps[mapName]);
        this.state = new GameState(gameStartTime, this.players, gameMap);

        this.stateChanges = [];

        // Holds the timer object for transitions from Action to Planning or Vice Versa
        this.nextPhaseTimer = undefined;

        this.isGameOver = false;

        // Initial Phase State Change
        if (!testMode) {
            this.initialTurnPassover = setTimeout(() => {
                this.processStateChange(
                    PhaseChangeStateChange.create(this.state, undefined));
                this.processStateChange(ChatMessageStateChange.create(
                    this.state, undefined, 'WASD: Move the Camera'));
                this.processStateChange(ChatMessageStateChange.create(
                    this.state, undefined, 'Mouse Scroll: Zoom In / Out'));
                this.processStateChange(ChatMessageStateChange.create(
                    this.state, undefined, 'G (hold): To Move Units'));
            }, Constants.TIME_IN_SECONDS_BEFORE_GAME_START * 1000);
        }
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

        if (!Constants.IS_PRODUCTION) {
            this.state.verifyIntegrity();
        }

        if (stateChange instanceof PhaseChangeStateChange) {
            if (this.state.phase === Constants.PHASE_PLANNING) {
                // Starting planning phase now
                // During a Replay Event, this won't be triggered from nextPhaseTimer
                if (this.nextPhaseTimer) clearInterval(this.nextPhaseTimer);
                this.nextPhaseTimer = undefined;

                if (!this.testMode && this.nextPhaseTimer === undefined) {
                    this.nextPhaseTimer = setTimeout(() => {
                        this.nextPhaseTimer = undefined;
                        this.processStateChange(
                            PhaseChangeStateChange.create(this.state, undefined));
                    }, Constants.PLANNING_TIME * 1000);
                }
                else {
                    console.error('Next phase timer already set on Action!');
                }
            }
            else if (!this.testMode) {
                this.runActionPhase();
            }
        }

        if (stateChange instanceof SetUnitTargetStateChange) {
            // Only tell the player it concerns
            this.players.forEach(p => {
                shouldBroadcastMap[p] = (p === stateChange.from);
            });
        }
       
        this.stateChanges.push(stateChange);

        // TODO: Advanced processing here.
        this.players.forEach(p => {
            if (this.sockets[p] !== undefined && shouldBroadcastMap[p]) {
                this.sockets[p].emit('state-change', stateChange);
            }
        });

        const winner = this.state.getWinner();
        if (winner !== undefined) {
            if (this.state.nextPhaseTimer) {
                clearInterval(this.state.nextPhaseTimer);
                this.state.nextPhaseTimer = undefined;
            }
            this.onGameOver(this, winner);
        }
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
        // During a Replay Event, this won't be triggered from nextPhaseTimer
        if (this.nextPhaseTimer) clearInterval(this.nextPhaseTimer);
        this.nextPhaseTimer = undefined;
        
        // Action Phase Lasts a Set Amount of Time
        // After this time, all attack / movement is stopped for the round

        // Someone claimed everything.
        if (this.isGameOver) {
            return;
        }

        const actionMap = {};
        const TICK_TIME = 100;
        const MOVE_COOLDOWN = 400;
        const actionPhaseStart = this.state.getGameTime();
        
        const actionPhaseTick = setInterval(() => {
            // Before any combat, units and structures tick
            // Each tick is every 100ms, unit tries to acquire target,
            //  given cooldown
            let currentTime = this.state.getGameTime();
            
            this.processStateChange(ActionTickStateChange.create(this.state, undefined, currentTime));
            
            const nonDeadUnits = [];
            for (let j = 0; j < this.state.units.length; j++) {
                const unit = this.state.units[j];
                if (unit.currentHealth > 0) {
                    nonDeadUnits.push(unit);
                }
            }
            for (let j = 0; j < nonDeadUnits.length; j++) {
                const unit = nonDeadUnits[j];
                const id = unit.id;
                if (actionMap[id] === undefined) {
                    // target is a {enemy: _, inRangeTile: _ } as returned by
                    //   getEnemiesInAttackRange
                    actionMap[id] = {
                        nextAttackTime: 0,
                        nextMoveTime: 0,
                        target: undefined
                    };
                }
                let didMove = false;

                if (unit.targetPoints.length > 0) {
                    // Repath first
                    this.processStateChange(SetUnitTargetStateChange.create(this.state, 
                        unit.owner,
                        unit.position, unit.targetPoints));
                    if (unit.targetPoints.length > 0) {
                        unit.desiredPath = PathFinder.findPath(this.state,
                            unit.position, unit.targetPoints[0]);
                    }
                }

                if (unit.targetPoints.length !== 0 && unit.desiredPath &&
                        unit.desiredPath.length !== 0 && actionMap[id].nextMoveTime < currentTime &&
                        unit.currentHealth > 0) {
                    const pendingMove = MoveUnitStateChange.create(
                        this.state,
                        unit.owner, unit.position,
                        unit.desiredPath[0]);
                    if (this.verifyStateChange(pendingMove)) {
                        this.processStateChange(pendingMove);
                        actionMap[id].nextMoveTime = currentTime + MOVE_COOLDOWN;
                        didMove = true;
                    }
                }
                // Try to acquire target and put into action map
                const potentialEnemies = this.state.getEnemiesInAttackRange(unit.position);
                if (unit.onTargetAcquire) {
                    unit.onTargetAcquire(potentialEnemies);
                }
                if (potentialEnemies.length > 0) {
                    if (actionMap[id].target !== undefined) {
                        // See if current target still in potential enemies
                        const idToFind = actionMap[id].target.enemy.id;
                        actionMap[id].target = undefined;

                        for (let i = 0; i < potentialEnemies.length; i++) {
                            if (idToFind === potentialEnemies[i].enemy.id) {
                                actionMap[id].target = potentialEnemies[i];
                                break;
                            }
                        }
                    }
                    if (actionMap[id].target === undefined) {
                        // get (random) target
                        actionMap[id].target = potentialEnemies[0];
                    }
                }
                else {
                    actionMap[id].target = undefined;
                }
                 
                if (!didMove && actionMap[id].target !== undefined &&
                    actionMap[id].nextAttackTime < currentTime &&
                    unit.getStunnedTime(this.state) === 0) {
                    // Have a target for this tick and attack not cooldown
                    const pendingAttack = UnitAttackStateChange.create(
                        this.state, 
                        unit.owner, unit.position, actionMap[id].target.inRangeTile
                    );
                    if (this.verifyStateChange(pendingAttack)) {
                        this.processStateChange(pendingAttack);
                        const timeToNextAttack = 1000.0 / unit.attackSpeed;
                        actionMap[id].nextAttackTime = currentTime + timeToNextAttack;
                    }
                }
            }
            
            // Time is up for action phase if next tick will exceed
            const timeUp = (currentTime + TICK_TIME) > (actionPhaseStart + (Constants.ACTION_MAX_TIME * 1000));

            // We also end action phase if no one has any more targets,
            //   and finished moving
            let finishedActions = !this.state.didAnyoneTick;
            for (let i = 0; i < nonDeadUnits.length; i++) {
                const unit = nonDeadUnits[i];
                if (actionMap[unit.id].target !== undefined) {
                    finishedActions = false;
                }
                if (unit.targetPoints.length > 0 && unit.moveRange > 0) {
                    finishedActions = false;
                }
            }

            // No one did a move, we can proceed with ending this action phase.
            if (timeUp || finishedActions || this.isGameOver) {
                clearInterval(actionPhaseTick);
                const gameStateOver = this.state.getWinner();
                if (gameStateOver === undefined) {
                    this.nextPhaseTimer = setTimeout(() => {
                        this.nextPhaseTimer = undefined;
                        this.processStateChange(PhaseChangeStateChange.create(this.state, undefined));
                    }, Constants.TIME_BEFORE_ACTION_TO_PLANNING * 1000);
                }
                else {
                    this.onGameOver(this, gameStateOver);
                }
            }
        }, TICK_TIME);
    }
};
