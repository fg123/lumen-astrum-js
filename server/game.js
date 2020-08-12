const GameState = require('../shared/game-state');
const Constants = require('../shared/constants');
const { StateChange, TurnPassoverStateChange, GuardianLockdownStateChange, PhaseChangeStateChange, MoveUnitStateChange, UnitAttackStateChange } = require('../shared/state-change');
const PathFinder = require('../shared/path-finder');

module.exports = class Game {
    static fromJson(json) {
        const game = new Game(json.redPlayer, json.bluePlayer, undefined,
            undefined, json.gameStartTime);
        clearTimeout(game.initialTurnPassover);
        for (let i = 0; i < json.stateChanges.length; i++) {
            game.processStateChange(StateChange.deserialize(json.stateChanges[i]));
        }
        return game;
    }
    constructor(redPlayer, bluePlayer, redSocket, blueSocket, gameStartTime) {
        this.redPlayer = redPlayer;
        this.bluePlayer = bluePlayer;
        this.redSocket = redSocket;
        this.blueSocket = blueSocket;
        this.state = new GameState(gameStartTime, redPlayer, bluePlayer);
        this.stateChanges = [];

        this.queuedActions = {
            movement: [],
            builds: []
        };

        this.nextPhaseTimer = undefined;

        // Initial Turn Passover
        this.initialTurnPassover = setTimeout(() => {
            // Pretend Blue Side to Trigger Red to be the First
            this.processStateChange(
                PhaseChangeStateChange.create(
                    Constants.BLUE_SIDE));
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
        if (this.state.phase === Constants.PHASE_PLANNING) {
            // Block movement and buildings commands during planning
            if (stateChange instanceof MoveUnitStateChange) {
                const unitPos = stateChange.data.posFrom;
                for (let i = 0; i < this.queuedActions.movement.length; i++) {
                    // Only one queued movement per unit
                    const curr = this.queuedActions.movement[i].data.posFrom;
                    if (curr.x === unitPos.x && curr.y === unitPos.y) {
                        this.queuedActions.movement.splice(i, 1);
                        break;
                    }
                }
                this.queuedActions.movement.push(stateChange);
                return this.state.getWinner();
            }
        }

        stateChange.simulateStateChange(this.state);
        if (stateChange instanceof PhaseChangeStateChange) {
            if (this.state.phase === Constants.PHASE_PLANNING) {
                // Starting planning phase now
                if (this.nextPhaseTimer === undefined) {
                    this.nextPhaseTimer = setTimeout(() => {
                        this.nextPhaseTimer = undefined;
                        this.processStateChange(
                            PhaseChangeStateChange.create(Constants.BLUE_SIDE));
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
        if (this.redSocket) {
            this.redSocket.emit('state-change', stateChange);
        }
        if (this.blueSocket) {
            this.blueSocket.emit('state-change', stateChange);
        }
        return this.state.getWinner();
    }

    updateSocket(username, socket) {
        if (username === this.redPlayer) {
            this.redSocket = socket;
            return;
        }
        if (username === this.bluePlayer) {
            this.blueSocket = socket;
            return;
        }
    }

    removeSocket(socket) {
        if (this.redSocket === socket) {
            this.redSocket = undefined;
        }
        if (this.blueSocket === socket) {
            this.blueSocket = undefined;
        }
    }

    getSide(username) {
        if (this.redPlayer === username) return Constants.RED_SIDE;
        return Constants.BLUE_SIDE;
    }

    runActionPhase() {
        // Create pathfinding cache
        let nextKey = 0;
        const unitMovementCache = {};
        let longestPath = 0;
        for (let i = 0; i < this.queuedActions.movement.length; i++) {
            const movement = this.queuedActions.movement[i];
            // Quick verification pass
            if (this.verifyStateChange(movement)) {
                const path = PathFinder.findPath(this.state, movement.data.posFrom, movement.data.posTo);
                longestPath = Math.max(longestPath, path.length);
                unitMovementCache[nextKey++] = {
                    from: movement.from,
                    currentPos: movement.data.posFrom,
                    path: path
                };
            }
        }
        
        this.queuedActions.movement = [];
        
        // Perform movement ticks
        console.log('Action phase, perform ' + longestPath + ' ticks.');
        let i = 0;
        const movementTick = setInterval(() => {
            if (i >= longestPath) {
                clearInterval(movementTick);
                // Process Buildings
                //   TODO: what to do if u can't done it
                for (let i = 0; i < this.queuedActions.builds.length; i++) {
                    if (this.verifyStateChange(this.queuedActions.builds[i])) {
                        this.processStateChange(this.queuedActions.builds[i]);
                    }
                }
                this.queuedActions.movement.builds = [];
                if (longestPath === 0) {
                    this.checkForAttacks();
                }
                setTimeout(() => {
                    this.processStateChange(PhaseChangeStateChange.create(Constants.BLUE_SIDE));
                }, Constants.TIME_BEFORE_ACTION_TO_PLANNING * 1000);
                return;
            }
            // EACH TICK
            const cacheKeys = Object.keys(unitMovementCache);
            const cancelQueue = new Set();
            for (let j = 0; j < cacheKeys.length; j++) {
                const key = cacheKeys[j];
                if (cancelQueue.has(key)) continue;

                const currentPendingMovement = {
                    from: unitMovementCache[key].currentPos,
                    to: unitMovementCache[key].path[0]
                };
                // Check that no one else is moving into this tile
                // TODO: advanced resolution mechanic here later
                let isBlock = false;
                for (let k = 0; k < cacheKeys.length; k++) {
                    if (k === j) continue;
                    if (unitMovementCache[cacheKeys[k]].path[0] === currentPendingMovement.to) {
                        // I am move blocked by this dude who wants to go where
                        //   I wanna go, now we both don't get to go (for now)
                        cancelQueue.push(cacheKeys[k]);
                        isBlock = true;
                    }
                }
                if (isBlock) {
                    // Someone is moveblocking me
                    cancelQueue.add(key);
                    continue;
                }
                this.processStateChange(MoveUnitStateChange.create(
                    unitMovementCache[key].from, unitMovementCache[key].currentPos,
                    unitMovementCache[key].path[0]));
                unitMovementCache[key].currentPos = unitMovementCache[key].path.shift();
                if (unitMovementCache[key].path.length === 0) {
                    cancelQueue.add(key);
                }
            }
            cancelQueue.forEach((k) => {
                delete unitMovementCache[k];
            });
            
            this.checkForAttacks();
            i++;
        }, 400);
    }
    
    checkForAttacks() {
        const queuedAttacks = [];
        for (let i = 0; i < this.state.units.length; i++) {
            const unit = this.state.units[i];
            const potentialEnemies = this.state.getEnemiesInAttackRange(unit.position);
            if (potentialEnemies.length > 0) {
                queuedAttacks.push({
                    from: unit.side,
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
