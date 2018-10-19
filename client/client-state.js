const Constants = require('../shared/constants');
const { getReachable } = require('../shared/coordinates');
const { getBaseObject } = require('../shared/data');
const {
    withinMap,
    RED_SIDE_COMMAND_CENTER_LOC,
    BLUE_SIDE_COMMAND_CENTER_LOC
} = require('../shared/map');
const {
    StateChange,
    BuildStructureStateChange,
    SpawnUnitStateChange,
    TurnPassoverStateChange,
} = require('../shared/state-change');
const GameState = require('../shared/game-state');
const Utils = require('./utils');
const { Tuple } = require('../shared/coordinates');

const movement = [new Tuple(500, 500), new Tuple(2250, 1320), new Tuple(4092, 296), new Tuple(4733, 2323), new Tuple(2000, 2387)];
let movementIndex = 0;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_ESCAPE = 27;
const KEY_SPACE = 32;
const LEFT_MOUSE_BUTTON = 1;
const DIGIT_KEYS = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];

const INTERNAL_TICK_INTERVAL = 16;

module.exports = class ClientState {
    constructor(socket, camera, inputManager, ui) {
        this.ui = ui;
        this.socket = socket;
        this.camera = camera;
        this.inputManager = inputManager;
        this.side = Constants.NONE_SIDE;
        this.gameState = undefined;
        this.selectedObject = null;
        this.hoveredOption = null;
        this.bigMessage = '';
        this.smallAlert = { current: null, queue: [], lastShownTime: 0 };
        this.commandCenter = null;
        this.unitMoveRange = [];
        this.buildingStructure = null;
        this.spawningUnit = null;
        this.allowedToBuildOrSpawn = false;
        this.hoveringEndTurn = false;
        this.turnTimer = '';
        this.cursorMessage = '';

        inputManager.attachInputPollingListener((keyState, prevKeyState) => {
            if (keyState[KEY_A]) {
                this.camera.delta.x = -35;
            }
            if (keyState[KEY_D]) {
                this.camera.delta.x = 35;
            }
            if (keyState[KEY_W]) {
                this.camera.delta.y = -35;
            }
            if (keyState[KEY_S]) {
                this.camera.delta.y = 35;
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
            this.gameUIClickEvent(button);
        });

        inputManager.attachMouseDownObserver((button) => {
            this.gameObjectClickEvent(button);
        });

        socket.on('state-change', (stateChange) => {
            console.log('State Change!');
            console.log(stateChange);
            StateChange
                .deserialize(stateChange)
                .simulateStateChange(this.gameState);
            if (stateChange.type === 'turn-passover') {
                this.buildingStructure = null;
                this.spawningUnit = null;
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
                    RED_SIDE_COMMAND_CENTER_LOC.y][
                    RED_SIDE_COMMAND_CENTER_LOC.x];
            }
            else {
                this.commandCenter = this.gameState.mapObjects[
                    BLUE_SIDE_COMMAND_CENTER_LOC.y][
                    BLUE_SIDE_COMMAND_CENTER_LOC.x];
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
                    this.inputManager.mouseState.tile
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

            this.tickCamera(window.innerWidth, window.innerHeight);
        }, INTERNAL_TICK_INTERVAL);
    }

    tickCamera(screenWidth, screenHeight) {
        const change = this.inputManager.mouseState.scrollDelta.y / 50;
        const oldScale = this.camera.scale;
        this.camera.scale += change;
        this.camera.scale = Math.max(Math.min(1.0, this.camera.scale), 0.3);
        const actualChange = Math.abs(oldScale - this.camera.scale);
        this.camera.position.x += (this.inputManager.mouseState.position.x - (screenWidth / 2)) * 2 * actualChange + this.camera.delta.x;
        this.camera.position.y += (this.inputManager.mouseState.position.y - (screenHeight / 2)) * 2 * actualChange + this.camera.delta.y;
        this.inputManager.mouseState.scrollDelta.x *= 0.7;
        this.inputManager.mouseState.scrollDelta.y *= 0.7;
        this.camera.delta.x *= 0.7;
        this.camera.delta.y *= 0.7;
        if (this.ui.currentScreen !== this.ui.Screen.GAME_SCREEN) {
            let d = Utils.distance(this.camera.position, movement[movementIndex]);
            if (d < 1) {
                movementIndex = (movementIndex + 1) % movement.length;
                d = Utils.distance(this.camera.position, movement[movementIndex]);
            }
            const a = new Tuple(movement[movementIndex].x - this.camera.position.x,
                movement[movementIndex].y - this.camera.position.y);

            this.camera.position.x += a.x / d * 1;
            this.camera.position.y += a.y / d * 1;
        }
    }

    sendStateChange(stateChange) {
        this.socket.emit('state-change', stateChange);
    }

    objectOnMySide(mapObject) {
        return mapObject.side === this.side;
    }

    handleOptionClicked(option) {
        if (this.side != this.gameState.currentTurn) {
            // Cannot Exercise Option If Not Your Turn
            this.pushAlertMessage('Wait for your turn!');
            return;
        }
        // Check for Gold Cost and Prereqs
        // TODO: Prereqs
        if (option.cost > this.getGold()) {
            this.pushAlertMessage('Not enough gold!');
            return;
        }
        // TODO: Use Constants
        // Parse command
        const parts = option.command.split('-');
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
                    getBaseObject(object.name).moverange,
                    (pos) => {
                        // It's blocked if it's not in the map, or occupied
                        return !withinMap(pos) || this.gameState.occupied[pos.y][pos.x];
                    });
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

    gameObjectUpEvent(button) {
        // If the mouse is released and a unit is selected, we want to perform
        // a movement state.
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
                                this.inputManager.mouseState.tile
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
        return false;
    }
};
