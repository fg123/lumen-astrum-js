const Constants = require('../shared/constants');
const { getBaseObject } = require('../shared/data');
const {
    setupMap, maps
} = require('../shared/map');
const {
    StateChange,
    MoveUnitStateChange,
    ChatMessageStateChange,
    UnitAttackStateChange,
    ReaverDetonateStateChange,
    GuardianLockdownStateChange,
    SetUnitTargetStateChange,
    LaunchProbeStateChange,
    PhaseChangeStateChange
} = require('../shared/state-change');

const {
    PlaceUnitPendingAction,
    PlaceStructurePendingAction
} = require('./pending-actions');

const GameState = require('../shared/game-state');
const { getSurrounding } = require('../shared/coordinates');
const PathFinder = require('../shared/path-finder');
const {
    InPlaceSpriteAnimation,
    GenericInPlaceSpriteAnimation,
    MoveUnitAnimation,
    AttackProjectileAnimation,
    MuzzleFlashAnimation
} = require('./animation');
const { Resource } = require('./resources');
const { toDrawCoord } = require('./utils');

const KEY_ENTER = 13;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_ESCAPE = 27;
const KEY_SPACE = 32;
const KEY_G = 71;
const KEY_CTRL = 17;
const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 3;
const DIGIT_KEYS = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];

const INTERNAL_TICK_INTERVAL = 16;
const CAMERA_SPEED = 60;

module.exports = class ClientState {
    constructor(socket, chatbox, camera, inputManager, ui, resourceManager, animationManager) {
        this.ui = ui;
        this.socket = socket;
        this.chatbox = chatbox;
        this.camera = camera;
        this.inputManager = inputManager;
        this.resourceManager = resourceManager;
        this.globalAnimationManager = animationManager;

        this.gameStartListeners = [];
        this.defaultMap = setupMap(require('../shared/maps/redesign.js'));

        this.player = undefined;
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
        this.pendingAction = null;
        this.gameTimer = '';
        this.phaseText = '';
        this.topProgressBar = 0;
        this.cursorMessage = '';
        this.movementMode = false;
        this.justEnteredMovementMode = false;

        this.enemyOverlayMap = {};

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
            if (keyState[KEY_ENTER] && !prevKeyState[KEY_ENTER]) {
                this.chatbox.focus();
            }
            if (keyState[KEY_ESCAPE] && !prevKeyState[KEY_ESCAPE]) {
                if (this.pendingAction) {
                    this.pendingAction = null;
                }
                else if (this.selectedObject) {
                    this.selectedObject = null;
                }
            }
            for (let i = 0; i < DIGIT_KEYS.length; i++) {
                if (keyState[DIGIT_KEYS[i]] && !prevKeyState[DIGIT_KEYS[i]]) {
                    if (this.selectedObject &&
                            this.objectIsMine(this.selectedObject) &&
                            this.selectedObject.turnsUntilBuilt === 0 &&
                            !this.hasForfeited()) {
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
            this.movementMode = keyState[KEY_G] && this.selectedObject && 
                this.objectIsMine(this.selectedObject);
            if (this.movementMode && !prevKeyState[KEY_G]) {
                // Just entering movement mode
                this.justEnteredMovementMode = true;
            }
        });

        inputManager.attachMouseDownObserver((button) => {
            return this.gameUIClickEvent(button);
        });

        inputManager.attachMouseDownObserver((button) => {
            if (this.movementMode) {
                console.log('Desired Move Event');
                this.potentialDesiredMoveEvent();
            }
            else {
                console.log('Click event');
                return this.gameObjectClickEvent(button);
            }
        });

        inputManager.attachMouseUpObserver((button) => {
            // if (button === LEFT_MOUSE_BUTTON) {
            //     this.potentialMoveUnitEvent();
            // }
        });

        socket.on('login-success', (username) => {
            this.player = username;
        });

        socket.on('disconnect', () => {
	        alert('Server disconnected.');
            window.location.reload(); 
        });

        socket.on('state-change', (stateChange) => {
            console.log(stateChange);
            const change = StateChange.deserialize(stateChange);

            if (change instanceof PhaseChangeStateChange) {
                this.pendingAction = null;
                /* Spawn Animations for buildings being constructed */
                const animationSpawner = mapObject => {
                    if (mapObject.turnsUntilBuilt === 1) {
                        /* About to turn, let's start an animation. */
                        if (mapObject.width === 1) {
                            mapObject.animationManager.addAnimation(
                                new InPlaceSpriteAnimation(
                                    this.resourceManager.get(Resource.WIDTH_1_BUILD_ANIM),
                                    10,
                                    2
                                )
                            );
                        }
                        else if (mapObject.width === 0) {
                            mapObject.animationManager.addAnimation(
                                new InPlaceSpriteAnimation(
                                    this.resourceManager.get(Resource.WIDTH_0_BUILD_ANIM),
                                    6,
                                    2
                                )
                            );
                        }
                    }
                };
                this.gameState.structures.forEach(animationSpawner);
                this.gameState.units.forEach(animationSpawner);
            }
            else if (change instanceof LaunchProbeStateChange) {
                this.globalAnimationManager.addAnimation(
                    new GenericInPlaceSpriteAnimation(
                        toDrawCoord(change.data.posTo),
                        this.resourceManager.get(Resource.PROBE_ANIM),
                        5,
                        20
                    )
                );
            }
            else if (change instanceof MoveUnitStateChange) {
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
                        new MoveUnitAnimation(unit, path, 10, () => {
                            if (currentlySelected && !this.selectedObject) {
                                this.selectObject(unit);
                            }
                        })
                    );
                }
            }
            else if (change instanceof UnitAttackStateChange) {
                const unit = this.gameState.mapObjects[
                    change.data.posFrom.y][change.data.posFrom.x];
                this.globalAnimationManager.addAnimation(
                    new AttackProjectileAnimation(
                        this.resourceManager,
                        unit,
                        change.data.posFrom,
                        change.data.posTo
                    )
                );
                const splashRange = change.getSplashRange(this.gameState);
                const surrounding = getSurrounding(change.data.posTo, splashRange);
                for (let i = 0; i < surrounding.length; i++) {
                    if (!surrounding[i].equals(change.data.posTo)) {
                        this.globalAnimationManager.addAnimation(
                            new AttackProjectileAnimation(
                                this.resourceManager,
                                unit,
                                change.data.posTo,
                                surrounding[i]
                            )
                        );
                    }
                }

                const attacker = this.gameState.mapObjects[change.data.posFrom.y][change.data.posFrom.x];
                if (attacker && attacker.isUnit && attacker.custom && attacker.custom.muzzle) {
                    this.globalAnimationManager.addAnimation(
                        new MuzzleFlashAnimation(
                            this.resourceManager,
                            attacker
                        )
                    );
                }
            }
            else if (change instanceof ReaverDetonateStateChange) {
                const surrounding = getSurrounding(change.data.posFrom, 1);
                for (let i = 0; i < surrounding.length; i++) {
                    if (!surrounding[i].equals(change.data.posFrom)) {
                        this.globalAnimationManager.addAnimation(
                            new AttackProjectileAnimation(
                                this.resourceManager,
                                unit,
                                change.data.posFrom,
                                surrounding[i]
                            )
                        );
                    }
                }
            }
            else if (change instanceof ChatMessageStateChange) {
                /* For some reason, the vue component can't watch a nested property
                 * that's not properly defined as a prop, so we have to manually
                 * push changes over. */
                const fakeState = {
                    chatMessages: [],
                    forfeit(player) {}
                };
                change._simulateStateChange(fakeState);
                const message = fakeState.chatMessages[0];
                if (this.player === message.author) {
                    message.color = Constants.BLUE_CHAT_COLOR;
                }
                else if (message.author === undefined) {
                    message.color = Constants.YELLOW_CHAT_COLOR;
                }
                else {
                    message.color = Constants.RED_CHAT_COLOR;
                }
                chatbox.addMessage(message);
            }
            /* Trust Server */
            change.simulateStateChange(this.gameState);
            if (change instanceof GuardianLockdownStateChange) {
                /* Reselect to show updated range */
                this.selectObject(this.selectedObject);
            }
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
        socket.on('game-over', (gameOver) => {
            this.ui.goToGameOver(gameOver);
        });
        socket.on('game-start', (gameStartTime, players, mapName) => {
            console.log(players);
            this.ui.goToGame();
            this.chatbox.clearChat();
            const player = this.player;
            const index = players.indexOf(player);
            if (index === -1) {
                console.error(`Cannot start game, can't find ${player} in ${players}`);
                return;
            }
            // TODO: CHANGE IF MORE THAN 4 PEOPLE
            const overlays = [Resource.RED_OVERLAY, Resource.PINK_OVERLAY, Resource.PURPLE_OVERLAY];
            this.enemyOverlayMap[player] = this.resourceManager.get(Resource.GREEN_OVERLAY);
            let j = 0;
            for (let i = 0; i < players.length; i++) {
                if (players[i] !== player) {
                    console.log(players[i], j, overlays[j]);
                    this.enemyOverlayMap[players[i]] = this.resourceManager.get(overlays[j++]);
                }
            }
            
            const gameMap = setupMap(maps[mapName]);
            const commandCenterLocation = gameMap.commandCenterLocations[index];
            this.gameState = new GameState(gameStartTime, players, gameMap);
            this.gameState.clientState = this;

            // New Map
            this.camera.updateMinimapCache();

            this.commandCenter = this.gameState.mapObjects[
                commandCenterLocation.y][
                commandCenterLocation.x];
            this.camera.position = toDrawCoord(commandCenterLocation);
        
            const interval = setInterval(() => {
                const seconds = parseInt(Constants.TIME_IN_SECONDS_BEFORE_GAME_START - (Date.now() - this.gameState.gameStartTime) / 1000);
                if (seconds <= 0) {
                    clearInterval(interval);
                    this.bigMessage = '';
                    return;
                }
                this.bigMessage = 'Game starting in ' + seconds + ' seconds';
            }, 1000);
            this.gameStartListeners.forEach(x => x());
        });

        this.internalTick = setInterval(() => {
            /* This just sets up some internal checks as the game goes on for
             * UI purposes */
            if (this.gameState) {
                if (this.gameState.phase === Constants.PHASE_ACTION) {
                    this.phaseText = 'ACTION';
                    const max = (Constants.ACTION_MAX_TIME * 1000);
                    
                    const current = max - (Date.now() - this.gameState.phaseStartTime);

                    let diff = current;
                    // Diff in Millis
                    diff = Math.max(0, Math.ceil(diff / 1000));
                    // Diff in Seconds
                    this.gameTimer = ('0' + (diff)).slice(-2);
                    this.topProgressBar = Math.max(0, current / max);
                }
                else if (this.gameState.phase === Constants.PHASE_PLANNING) {
                    this.phaseText = 'PLANNING';
                    const max = (Constants.PLANNING_TIME * 1000);
                    
                    const current = max - (Date.now() - this.gameState.phaseStartTime);

                    let diff = current;
                    // Diff in Millis
                    diff = Math.max(0, Math.ceil(diff / 1000));
                    // Diff in Seconds
                    this.gameTimer = ('0' + (diff)).slice(-2);
                    this.topProgressBar = Math.max(0, current / max);
                }
                else {
                    this.phaseText = '...';
                    this.gameTimer = '00';
                    this.topProgressBar = 1.0;
                }
            }
            else {
                this.phaseText = '...';
                this.gameTimer = '00';
                this.topProgressBar = 1.0;
            }
        }, INTERNAL_TICK_INTERVAL);
    }

    getMap() {
        if (this.gameState) {
            return this.gameState.gameMap;
        }
        return this.defaultMap;
    }

    getHarvesterGoldValues() {
        const gem = getBaseObject('Gem Harvester');
        const ether = getBaseObject('Ether Harvester');
        return { gem: gem.custom.value, ether: ether.custom.value };
    }

    getHarvesterCount() {
        if (!this.gameState) return { ether: 0, gem: 0 };

        const result = { ether: 0, gem: 0};
        for (let i = 0; i < this.gameState.structures.length; i++) {
            const structure = this.gameState.structures[i];
            if (structure.name === 'Ether Harvester' &&
                this.gameState.isAllowedBuilding(structure.position.x,
                    structure.position.y, this.player)) {
                result.ether += 1;
            }
            else if (structure.name === 'Gem Harvester' &&
                structure.owner === this.player) {
                result.gem += 1;
            }
        }
        return result;
    }

    getEnemyOverlay(player) {
        if (player === undefined) {
            // Neutral
            return this.resourceManager.get(Resource.BLUE_OVERLAY);
        }
        return this.enemyOverlayMap[player];
    }

    addNeutralChat(message) {
        this.chatbox.addMessage({
            author: undefined,
            content: message,
            color: 'yellow'
        });
    }

    addGameStartListener(fn) {
        this.gameStartListeners.push(fn);
    }

    sendStateChange(stateChange) {
        this.socket.emit('state-change', stateChange);
    }

    objectIsMine(mapObject) {
        return mapObject.owner === this.player;
    }

    handleOptionClicked(option) {
        // Parse command
        const parts = option.command.split('-');

        // Check for Gold Cost and Prereqs
        if (option.cost > this.getGold()) {
            this.pushAlertMessage('Not enough gold!');
            return;
        }
        if (!this.gameState.isTierSatisfied(parts[1], this.player)) {
            this.pushAlertMessage('Requires tier support building!');
            return;
        }

        if (!this.gameState.arePrereqsSatisfied(option, this.player)) {
            let message = 'Missing some of: ' + option.prereq.join(', ') + '!';
            if (option.prereq.length === 1) {
                message = 'Missing a ' + option.prereq[0] + '!';
            }
            this.pushAlertMessage(message);
            return;
        }

        switch (parts[0]) {
        case 'spawn':
            this.pendingAction = new PlaceUnitPendingAction(parts[1]);
            break;
        case 'build':
            this.pendingAction = new PlaceStructurePendingAction(parts[1]);
            break;
        case 'custom':
            // Dispatch Custom Function Call
            this.customActionDispatch(parts[1], option);
            break;
        }
        return;
    }

    hasForfeited() {
        return this.gameState.hasPlayerForfeited(this.player);
    }

    customActionDispatch(name, option) {
        switch (name) {
        case 'detonateReaver': {
            const change = ReaverDetonateStateChange.create(this.player, this.selectedObject.position);
            if (change.verifyStateChange(this.gameState)) {
                this.sendStateChange(change);
            }
            break;
        }
        case 'guardianLockdown': {
            const change = GuardianLockdownStateChange.create(this.player, this.selectedObject.position);
            if (change.verifyStateChange(this.gameState)) {
                this.sendStateChange(change);
            }
            break;
        }
        }
        return;
    }

    potentialDesiredMoveEvent() {
        if (this.selectedObject && this.selectedObject.isUnit &&
            this.objectIsMine(this.selectedObject) &&
            this.selectedObject.turnsUntilBuilt === 0) {
            
            if (this.inputManager.mouseState.tile &&
                this.getMap().withinMap(this.inputManager.mouseState.tile)) {
                let points = this.selectedObject.targetPoints.slice();
                if (this.justEnteredMovementMode) {
                    points = [];
                    this.justEnteredMovementMode = false;
                }

                points.push(this.inputManager.mouseState.tile);
                this.sendStateChange(SetUnitTargetStateChange.create(
                    this.player,
                    this.selectedObject.position,
                    points
                ));
            }
        }
    }

    getGold() {
        return this.gameState.players[this.player].gold;
    }

    pushAlertMessage(message) {
        console.log('Pushed Alert Message');
        this.smallAlert.queue.push(message);
    }

    selectObject(object) {
        this.hoveredOption = null;
        this.pendingAction = null;
        this.selectedObject = object;
        if (object && object.isUnit) {
            this.unitMoveRange = this.gameState.getUnitMovementTiles(object.position);
            this.unitAttackRange = this.gameState.getUnitAttackTiles(object.position);
        }
    }

    gameUIClickEvent() {
        if (this.ui.currentScreen !== this.ui.Screen.GAME) return false;
        if (this.hoveredOption) {
            this.handleOptionClicked(this.hoveredOption);
            return true;
        }
        return false;
    }

    getHoveredObjectOrNull() {
        if (this.getMap().withinMap(this.inputManager.mouseState.tile)) {
            let obj = null;
            let occupiedPoint = this.gameState.occupied[
                this.inputManager.mouseState.tile.y][this.inputManager.mouseState.tile.x];
            // Check that it's actually occupied by an object
            if (occupiedPoint && occupiedPoint !== true) {
                obj = this.gameState.mapObjects[occupiedPoint.y][occupiedPoint.x];
            }
            if (obj && obj.isUnit && obj.isStealthed(this.player, this.gameState)) {
                return null;
            }
            if (obj && !this.gameState.isVisible(obj.position.x, obj.position.y, this.player)) {
                return null;
            }
            return obj;
        }
        return null;
    }

    gameObjectClickEvent(button) {
        if (this.ui.currentScreen !== this.ui.Screen.GAME) return false;
        if (button === LEFT_MOUSE_BUTTON && this.getMap().withinMap(this.inputManager.mouseState.tile)) {
            if (this.pendingAction) {
                const result = this.pendingAction.onClick(this);
                this.pendingAction = null;
                if (result) {
                    return true;
                }
            }

            let obj = this.getHoveredObjectOrNull();
            this.selectObject(obj);
            return false;
        }
        return false;
    }
};
