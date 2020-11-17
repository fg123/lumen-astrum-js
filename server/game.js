const GameState = require('../shared/game-state');
const Constants = require('../shared/constants');
const {
    StateChange, 
    PhaseChangeStateChange, 
    MoveUnitStateChange, 
    ChatMessageStateChange,
    UnitAttackStateChange, 
    ActionTickStateChange
} = require('../shared/state-change');
const { maps, setupMap } = require('../shared/map');
const { movementSort } = require('./movement-controller');

module.exports = class Game {
    toJson() {
        return {
            gameStartTime: this.gameStartTime,
            mapName: this.mapName,
            playerUsernames: this.playerUsernames,
            stateChanges: this.stateChanges
        };
    }

    static fromJson(json, onGameOver) {
        const map = {};
        Object.keys(json.playerUsernames).forEach(p => {
            map[p] = {
                socket: undefined,
                username: json.playerUsernames[p]
            };
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

    constructor(playersMap, gameStartTime, onGameOver, mapName, options = {
        testMode: false,
        // TestMode runs no timers.
        verboseMode: true
    }) {
        // Players is a map of id: {socket:, username:}

        this.mapName = mapName;
        this.gameStartTime = gameStartTime;
        this.testMode = options.testMode;
        this.verboseMode = options.verboseMode;
        
        this.players = Object.keys(playersMap);
        this.onGameOver = onGameOver;
        
        this.sockets = {};
        this.playerUsernames = {};

        this.players.forEach(k => {
            this.sockets[k] = playersMap[k].socket;
            this.playerUsernames[k] = playersMap[k].username;
        })
        
        const gameMap = setupMap(maps[mapName]);
        this.state = new GameState(gameStartTime, this.playerUsernames, gameMap);

        this.stateChanges = [];

        // Holds the timer object for transitions from Action to Planning or Vice Versa
        this.nextPhaseTimer = undefined;

        this.isGameOver = false;

        // Initial Phase State Change
        if (!this.testMode) {
            this.initialTurnPassover = setTimeout(() => {
                this.processStateChange(
                    PhaseChangeStateChange.create(this.state, undefined));
                this.processStateChange(ChatMessageStateChange.create(
                    this.state, undefined, 'WASD: Move the Camera'));
                this.processStateChange(ChatMessageStateChange.create(
                    this.state, undefined, 'Mouse Scroll: Zoom In / Out'));
                this.processStateChange(ChatMessageStateChange.create(
                    this.state, undefined, 'Right Click or Hold G + Click: To Move Units'));
            }, Constants.TIME_IN_SECONDS_BEFORE_GAME_START * 1000);
        }
        else {
            this.mockGameTime = 0;
            this.processStateChange(
                PhaseChangeStateChange.create(this.state, undefined))
        }
    }

    verifyStateChange(stateChange) {
        if (this.verboseMode) {
            console.log('Verifying State Change');
            console.log(stateChange);
        }

        return stateChange &&
            stateChange.verifyStateChange(this.state);
    }

    processStateChange(stateChange) {
        if (this.isGameOver) {
            console.warn("Tried to process a state change after game is over!");
            return;
        }
        if (this.verboseMode) {
            console.log('Processing State Change');
            console.log(stateChange);
        }
        const shouldBroadcastMap = {};
        this.players.forEach(p => {
            shouldBroadcastMap[p] = true;
        });

        stateChange.simulateStateChange(this.state);

        if (!Constants.IS_PRODUCTION) {
            this.state.verifyIntegrity();
        }

        // if (stateChange instanceof SetUnitTargetStateChange) {
        //     // Only tell the player it concerns
        //     this.players.forEach(p => {
        //         shouldBroadcastMap[p] = (p === stateChange.from);
        //     });
        // }
       
        this.stateChanges.push(stateChange);

        // TODO: Advanced processing here.
        this.players.forEach(p => {
            if (this.sockets[p] !== undefined && shouldBroadcastMap[p]) {
                this.sockets[p].emit('state-change', stateChange);
            }
        });

        const winner = this.state.getWinner();
        if (winner !== undefined) {
            if (this.nextPhaseTimer) {
                clearInterval(this.nextPhaseTimer);
                this.nextPhaseTimer = undefined;
            }
            this.onGameOver(this, winner);
        }

        if (stateChange instanceof PhaseChangeStateChange) {
            if (this.state.phase === Constants.PHASE_PLANNING) {
                // Starting planning phase now
                // During a Replay Event, this won't be triggered from nextPhaseTimer
                if (this.nextPhaseTimer) clearInterval(this.nextPhaseTimer);
                this.nextPhaseTimer = undefined;

                if (!this.testMode) {
                    if (this.nextPhaseTimer === undefined) {
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
            }
            else {
                this.runActionPhase();
            }
        }
        
        return this.state.getWinner();
    }

    updateSocket(userID, socket) {
        this.sockets[userID] = socket;
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
        
        const actionPhaseTickFn = () => {
            // Before any combat, units and structures tick
            // Each tick is every 100ms, unit tries to acquire target,
            //  given cooldown
            if (this.testMode) {
                // We're in mock mode, so the actual tick will be 0, but every
                //   tick the game time increases by 100 as if the tick was 
                //   every 100.
                this.mockGameTime += 100;
                this.state.getGameTime = () => {
                    return this.mockGameTime;
                };
            }
            let currentTime = this.state.getGameTime();
            
            this.processStateChange(ActionTickStateChange.create(this.state, undefined, currentTime));
            
            let nonDeadUnits = [];
            for (let j = 0; j < this.state.units.length; j++) {
                const unit = this.state.units[j];
                if (unit.currentHealth > 0) {
                    nonDeadUnits.push(unit);
                }
            }
            nonDeadUnits = movementSort(this, nonDeadUnits);
            
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

                
                // if (unit.targetPoints.length > 0) {
                //     // Repath first
                //     this.processStateChange(SetUnitTargetStateChange.create(this.state, 
                //         unit.owner,
                //         unit.position, unit.targetPoints));
                //     if (unit.targetPoints.length > 0) {
                //         unit.desiredPath = PathFinder.findPath(this.state,
                //             unit.position, unit.targetPoints[0]);
                //     }
                // }

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
                const gameStateOver = this.state.getWinner();
                if (gameStateOver === undefined) {
                    if (!this.testMode) {
                        this.nextPhaseTimer = setTimeout(() => {
                            this.nextPhaseTimer = undefined;
                            this.processStateChange(PhaseChangeStateChange.create(this.state, undefined));
                        }, Constants.TIME_BEFORE_ACTION_TO_PLANNING * 1000);
                    }
                    else {
                        this.processStateChange(PhaseChangeStateChange.create(this.state, undefined));
                    }
                }
                else {
                    this.onGameOver(this, gameStateOver);
                }
                return false;
            }
            return true;
        };
        if (this.testMode) {
            while (actionPhaseTickFn()) {
            }
        }
        else {
            const actionPhaseTick = setInterval(() => {
                if (!actionPhaseTickFn()) {
                    clearInterval(actionPhaseTick);
                }
            }, TICK_TIME);
        }
    }
};
