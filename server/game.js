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
        map[json.redPlayer] = undefined;
        map[json.bluePlayer] = undefined;
        const game = new Game(map, json.gameStartTime);
        clearTimeout(game.initialTurnPassover);
        for (let i = 0; i < json.stateChanges.length; i++) {
            game.processStateChange(StateChange.deserialize(json.stateChanges[i]));
        }
        return game;
    }
    constructor(playerSocketMap, gameStartTime) {
        this.players = Object.keys(playerSocketMap);
        this.sockets = playerSocketMap;

        this.state = new GameState(gameStartTime, this.players);
        this.stateChanges = [];

        this.queuedActions = {
            builds: []
        };

        this.nextPhaseTimer = undefined;

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
        // Perform movement ticks
        const movementTick = setInterval(() => {
            // EACH TICK
            let someoneMoved = false;
            for (let j = 0; j < this.state.units.length; j++) {
                const unit = this.state.units[j];
                if (unit.targetPoint && unit.desiredPath && unit.desiredPath.length !== 0) {
                    // We have a target point that we trynna get to you feel

                    // Try moving it one tile this tick
                    const pendingMove = MoveUnitStateChange.create(
                        unit.owner, unit.position,
                        unit.desiredPath[0]);
                    console.log('MOVE ', unit.position, unit.desiredPath[0]);
                    if (this.verifyStateChange(pendingMove)) {
                        this.processStateChange(pendingMove);
                        someoneMoved = true;
                    }
                }
            }
            
            this.checkForAttacks();

            // No one did a move, we can proceed with ending this action phase.
            if (!someoneMoved) {
                clearInterval(movementTick);
                // Process Buildings
                //   TODO: what to do if u can't done it
                for (let i = 0; i < this.queuedActions.builds.length; i++) {
                    if (this.verifyStateChange(this.queuedActions.builds[i])) {
                        this.processStateChange(this.queuedActions.builds[i]);
                    }
                }
                this.queuedActions.builds = [];
                setTimeout(() => {
                    this.processStateChange(PhaseChangeStateChange.create(undefined));
                }, Constants.TIME_BEFORE_ACTION_TO_PLANNING * 1000);
            }
        }, 400);
    }
    
    checkForAttacks() {
        const queuedAttacks = [];
        for (let i = 0; i < this.state.units.length; i++) {
            const unit = this.state.units[i];
            const potentialEnemies = this.state.getEnemiesInAttackRange(unit.position);
            if (potentialEnemies.length > 0) {
                queuedAttacks.push({
                    from: unit.owner,
                    posFrom: unit.position,
                    posTo: potentialEnemies[0].position
                });
            }
        }
        for (let i = 0; i < queuedAttacks.length; i++) {
            const pendingAttack = UnitAttackStateChange.create(
                queuedAttacks[i].from, queuedAttacks[i].posFrom, queuedAttacks[i].posTo
            );
            if (this.verifyStateChange(pendingAttack)) {
                this.processStateChange(pendingAttack);
            }
        }
    }
};
