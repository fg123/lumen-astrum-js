const Constants = require('../shared/constants');
const { getReachable, getSurrounding } = require('../shared/coordinates');
const { getBaseObject } = require('../shared/data');
const {
    withinMap,
    map
} = require('../shared/map');
const {
    StateChange,
    BuildStructureStateChange,
    SpawnUnitStateChange,
    MoveUnitStateChange,
    TurnPassoverStateChange,
    UnitAttackStateChange
} = require('../shared/state-change');
const GameState = require('../shared/game-state');
const { Tuple } = require('../shared/coordinates');
const PathFinder = require('../shared/path-finder');
const {
    InPlaceSpriteAnimation,
    MoveUnitAnimation,
    AttackProjectileAnimation
} = require('./animation');
const { Resource } = require('./resources');

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_ESCAPE = 27;
const KEY_SPACE = 32;
const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 3;
const DIGIT_KEYS = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];

const INTERNAL_TICK_INTERVAL = 16;
const CAMERA_SPEED = 50;

module.exports = class ClientState {
    constructor(socket, camera, inputManager, ui, resourceManager, animationManager) {
        this.ui = ui;
        this.socket = socket;
        this.camera = camera;
        this.inputManager = inputManager;
        this.resourceManager = resourceManager;
        this.globalAnimationManager = animationManager;

        this.side = Constants.NONE_SIDE;
        this.gameState = undefined;
        this.selectedObject = null;
        this.hoveredOption = null;
        this.bigMessage = '';
        this.smallAlert = { current: null, queue: [], lastShownTime: 0 };
        this.commandCenter = null;
        this.unitMoveRange = [];
        this.unitAttackRange = [];
        this.canCurrentUnitAttackPosition = false;
        this.canCurrentUnitMoveToPosition = false;
        this.buildingStructure = null;
        this.spawningUnit = null;
        this.allowedToBuildOrSpawn = false;
        this.hoveringEndTurn = false;
        this.turnTimer = '';
        this.cursorMessage = '';

        inputManager.attachInputPollingListener((keyState, prevKeyState) => {
            if (keyState[KEY_A]) {
                this.camera.delta.x = -CAMERA_SPEED;
            }
            if (keyState[KEY_D]) {
                this.camera.delta.x = CAMERA_SPEED;
            }
            if (keyState[KEY_W]) {
                this.camera.delta.y = -CAMERA_SPEED;
            }
            if (keyState[KEY_S]) {
                this.camera.delta.y = CAMERA_SPEED;
            }
            if (keyState[KEY_ESCAPE] && !prevKeyState[KEY_ESCAPE]) {
                if (this.buildingStructure || this.spawningUnit) {
                    this.buildingStructure = null;
                    this.spawningUnit = null;
                }
                else if (this.selectedObject) {
                    this.selectedObject = null;
                }
            }
            for (let i = 0; i < DIGIT_KEYS.length; i++) {
                if (keyState[DIGIT_KEYS[i]] && !prevKeyState[DIGIT_KEYS[i]]) {
                    if (this.selectedObject && this.objectOnMySide(this.selectedObject)) {
                        const baseObj = getBaseObject(this.selectedObject.name);
                        if (i < baseObj.options.length) {
                            this.handleOptionClicked(baseObj.options[i]);
                        }
                    }
                }
            }
            if (keyState[KEY_SPACE]) {
                this.selectObject(this.commandCenter);
            }
        });

        inputManager.attachMouseDownObserver((button) => {
            return this.gameUIClickEvent(button);
        });

        inputManager.attachMouseDownObserver((button) => {
            return this.gameObjectClickEvent(button);
        });

        inputManager.attachMouseUpObserver((button) => {
            if (button === LEFT_MOUSE_BUTTON) {
                this.potentialMoveUnitEvent();
            }
        });

        socket.on('state-change', (stateChange) => {
            console.log('State Change!');
            console.log(stateChange);
            const change = StateChange
                .deserialize(stateChange);

            if (change instanceof TurnPassoverStateChange) {
                this.buildingStructure = null;
                this.spawningUnit = null;
                /* Spawn Animations for buildings being constructed */
                const animationSpawner = mapObject => {
                    if (mapObject.side === change.from) {
                        if (mapObject.turnsUntilBuilt === 1) {
                            /* About to turn, let's start an animation. */
                            if (mapObject.width === 1) {
                                mapObject.animationManager.addAnimation(
                                    new InPlaceSpriteAnimation(
                                        this.resourceManager.get(Resource.WIDTH_1_BUILD_ANIM),
                                        10,
                                        1
                                    )
                                );
                            }
                            else if (mapObject.width === 0) {
                                mapObject.animationManager.addAnimation(
                                    new InPlaceSpriteAnimation(
                                        this.resourceManager.get(Resource.WIDTH_0_BUILD_ANIM),
                                        6,
                                        1
                                    )
                                );
                            }
                        }
                    }
                };
                this.gameState.structures.forEach(animationSpawner);
                this.gameState.units.forEach(animationSpawner);
            } else if (change instanceof MoveUnitStateChange) {
                const unit = this.gameState.mapObjects[
                    change.data.posFrom.y][change.data.posFrom.x];
                if (unit) {
                    const path = PathFinder.findPath(
                        this.gameState,
                        change.data.posFrom,
                        change.data.posTo
                    );
                    path.unshift(change.data.posFrom);
                    // Hide move range indicator for now.
                    const currentlySelected = this.selectedObject &&
                        this.selectedObject.position.x === change.data.posFrom.x &&
                        this.selectedObject.position.y === change.data.posFrom.y;
                    if (currentlySelected) {
                        this.unitMoveRange = [];
                        this.unitAttackRange = [];
                    }
                    unit.animationManager.addAnimation(
                        new MoveUnitAnimation(path, 10, () => {
                            if (currentlySelected && !this.selectedObject) {
                                this.selectObject(unit);
                            }
                        })
                    );
                }
            } else if (change instanceof UnitAttackStateChange) {
                this.globalAnimationManager.addAnimation(
                    new AttackProjectileAnimation(
                        this.resourceManager,
                        change.data.posFrom,
                        change.data.posTo
                    )
                );
            }
            /* Trust Server */
            change.simulateStateChange(this.gameState);
            /* Currently Selected Unit might have died */
            if (this.selectedObject) {
                if (!this.gameState.mapObjects[this.selectedObject.position.y][
                    this.selectedObject.position.x]) {
                    this.selectObject(null);
                }
            }
        });

        socket.on('invalid-state-change', () => {
            // Should never happen since UI should prevent it, but if so...
            this.pushAlertMessage('Invalid action!');
        });

        socket.on('game-start', (side, gameStartTime) => {
            console.log('Game Start!');
            this.side = side;
            this.gameState = new GameState(gameStartTime);
            console.log(this.side);
            if (side === Constants.RED_SIDE) {
                this.commandCenter = this.gameState.mapObjects[
                    map.redCommandCenterLocation.y][
                    map.redCommandCenterLocation.x];
                this.camera.position = new Tuple(
                    map.redCommandCenterLocation.x * 96,
                    map.redCommandCenterLocation.y * 111 +
                        (map.redCommandCenterLocation.x % 2) * 55
                );
            }
            else {
                this.commandCenter = this.gameState.mapObjects[
                    map.blueCommandCenterLocation.y][
                    map.blueCommandCenterLocation.x];
                this.camera.position = new Tuple(
                    map.blueCommandCenterLocation.x * 96,
                    map.blueCommandCenterLocation.y * 111 +
                        (map.blueCommandCenterLocation.x % 2) * 55
                );
            }
            this.ui.loadScreen(this.ui.Screen.GAME_SCREEN);
            const interval = setInterval(() => {
                const seconds = parseInt(Constants.TIME_IN_SECONDS_BEFORE_GAME_START - (Date.now() - this.gameState.gameStartTime) / 1000);
                this.bigMessage = 'Game starting in ' + seconds + ' seconds';
                if (seconds === 0) {
                    clearInterval(interval);
                    this.bigMessage = '';
                }
            }, 1000);
        });

        this.internalTick = setInterval(() => {
            /* This just sets up some internal checks as the game goes on for
             * UI purposes */
            if (this.buildingStructure) {
                this.allowedToBuildOrSpawn = BuildStructureStateChange.create(
                    this.side,
                    this.buildingStructure,
                    this.inputManager.mouseState.tile,
                    this.selectedObject
                ).verifyStateChange(this.gameState);
            }
            else if (this.spawningUnit) {
                this.allowedToBuildOrSpawn = SpawnUnitStateChange.create(
                    this.side,
                    this.spawningUnit,
                    this.inputManager.mouseState.tile,
                    this.selectedObject
                ).verifyStateChange(this.gameState);
            }
            if (this.gameState && this.gameState.currentTurn === this.side) {
                let diff = this.gameState.turnEndTime - Date.now();
                // Diff in Millis
                diff = Math.ceil(diff / 1000);
                // Diff in Seconds
                this.turnTimer = ('0' + Math.floor(diff / 60)).slice(-2) + ':' + ('0' + (diff % 60)).slice(-2);
            }
            else {
                this.turnTimer = '00:00';
            }
        }, INTERNAL_TICK_INTERVAL);
    }

    isMyTurn() {
        return this.gameState.currentTurn !== Constants.NONE_SIDE &&
                this.gameState.currentTurn === this.side;
    }

    sendStateChange(stateChange) {
        this.socket.emit('state-change', stateChange);
    }

    objectOnMySide(mapObject) {
        return mapObject.side === this.side;
    }

    handleOptionClicked(option) {
        // Parse command
        const parts = option.command.split('-');
        if (this.side !== this.gameState.currentTurn) {
            // Cannot Exercise Option If Not Your Turn
            this.pushAlertMessage('Wait for your turn!');
            return;
        }
        // Check for Gold Cost and Prereqs
        if (option.cost > this.getGold()) {
            this.pushAlertMessage('Not enough gold!');
            return;
        }
        if (!this.gameState.isTierSatisfied(parts[1], this.side)) {
            this.pushAlertMessage('Requires tier support building!');
            return;
        }

        if (!this.gameState.arePrereqsSatisfied(option, this.side)) {
            let message = 'Missing some of: ' + option.prereq.join(', ') + '!';
            if (option.prereq.length === 1) {
                message = 'Missing a ' + option.prereq[0] + '!';
            }
            this.pushAlertMessage(message);
            return;
        }

        switch (parts[0]) {
        case 'spawn':
            this.spawningUnit = parts[1];
            this.buildingStructure = null;
            break;
        case 'build':
            this.buildingStructure = parts[1];
            this.spawningUnit = null;
            break;
        }
        return;
    }

    potentialMoveUnitEvent() {
        // Check if is unit:
        if (this.selectedObject && this.selectedObject.isUnit &&
            this.objectOnMySide(this.selectedObject) &&
            this.selectedObject.turnsUntilBuilt === 0) {
            if (this.canCurrentUnitMoveToPosition) {
                this.sendStateChange(
                    MoveUnitStateChange.create(
                        this.side,
                        this.selectedObject.position,
                        this.inputManager.mouseState.tile));
            }
        }
    }

    getGold() {
        // GameState gold will not be guaranteed to reflect the correct amount
        //   of the opposite side.
        if (this.side === Constants.RED_SIDE) return this.gameState.redGold;
        else return this.gameState.blueGold;
    }

    pushAlertMessage(message) {
        console.log('Pushed Alert Message');
        this.smallAlert.queue.push(message);
    }

    selectObject(object) {
        this.buildingStructure = null;
        this.spawningUnit = null;
        this.selectedObject = object;
        if (object && object.isUnit) {
            this.unitMoveRange =
                getReachable(object.position,
                    object.moveRange,
                    (pos) => {
                        // It's blocked if it's not in the map, or occupied
                        return !withinMap(pos) || this.gameState.occupied[pos.y][pos.x];
                    });
            this.unitAttackRange = getSurrounding(object.position, object.attackRange);
        }
    }

    gameUIClickEvent() {
        if (this.ui.currentScreen !== this.ui.Screen.GAME_SCREEN) return false;
        if (this.hoveredOption) {
            this.handleOptionClicked(this.hoveredOption);
            return true;
        }
        if (this.hoveringEndTurn) {
            this.sendStateChange(TurnPassoverStateChange.create(this.side, true));
            return true;
        }
        return false;
    }

    gameObjectClickEvent(button) {
        if (this.ui.currentScreen !== this.ui.Screen.GAME_SCREEN) return false;
        if (button === LEFT_MOUSE_BUTTON && withinMap(this.inputManager.mouseState.tile)) {
            // Could be a Placement
            if (this.buildingStructure || this.spawningUnit) {
                if (this.allowedToBuildOrSpawn) {
                    if (this.buildingStructure) {
                        this.sendStateChange(
                            BuildStructureStateChange.create(
                                this.side,
                                this.buildingStructure,
                                this.inputManager.mouseState.tile,
                                this.selectedObject
                            )
                        );
                    }
                    else {
                        this.sendStateChange(
                            SpawnUnitStateChange.create(
                                this.side,
                                this.spawningUnit,
                                this.inputManager.mouseState.tile,
                                this.selectedObject
                            )
                        );
                    }
                    this.buildingStructure = null;
                    this.spawningUnit = null;
                    return true;
                }
                return false;
            }
            else {
                let obj = null;
                let occupiedPoint = this.gameState.occupied[
                    this.inputManager.mouseState.tile.y][this.inputManager.mouseState.tile.x];
                // Check that it's actually occupied by an object
                if (occupiedPoint && occupiedPoint !== true) {
                    obj = this.gameState.mapObjects[occupiedPoint.y][occupiedPoint.x];
                }
                this.selectObject(obj);
                return true;
            }
        }
        if (button === RIGHT_MOUSE_BUTTON && withinMap(this.inputManager.mouseState.tile)) {
            // Potential Attack
            if (this.canCurrentUnitAttackPosition) {
                this.sendStateChange(
                    UnitAttackStateChange.create(
                        this.side,
                        this.selectedObject.position,
                        this.inputManager.mouseState.tile
                    )
                );
                return true;
            }
        }
        return false;
    }
};
