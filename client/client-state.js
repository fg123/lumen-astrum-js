const Constants = require('../shared/constants');
const { getBaseObject } = require('../shared/data');
const {
    map
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
    PlaceStructurePendingAction,
    HealUnitPendingAction,
    RepairStructurePendingAction,
    LaunchProbePendingAction
} = require('./pending-actions');

const GameState = require('../shared/game-state');
const { Tuple, getSurrounding } = require('../shared/coordinates');
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
                if (this.pendingAction) {
                    this.pendingAction = null;
                }
                else if (this.selectedObject) {
                    this.selectedObject = null;
                }
            }
            for (let i = 0; i < DIGIT_KEYS.length; i++) {
                if (keyState[DIGIT_KEYS[i]] && !prevKeyState[DIGIT_KEYS[i]]) {
                    if (this.selectedObject && this.objectIsMine(this.selectedObject)
                            && this.selectedObject.turnsUntilBuilt === 0) {
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
            console.log('State Change!');
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
                    chatMessages: []
                };
                change._simulateStateChange(fakeState);
                const message = fakeState.chatMessages[0];
                if (this.player === message.author) {
                    message.color = Constants.BLUE_CHAT_COLOR;
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
        socket.on('game-start', (gameStartTime, players) => {
            console.log(players);
            this.ui.goToGame();
            
            const player = this.player;
            const index = players.indexOf(player);
            if (index === -1) {
                console.error(`Cannot start game, can't find ${player} in ${players}`);
                return;
            }
            const commandCenterLocation = map.commandCenterLocations[index];
            this.gameState = new GameState(gameStartTime, players);
            this.gameState.clientState = this;

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
                    diff = Math.ceil(diff / 1000);
                    // Diff in Seconds
                    this.gameTimer = ('0' + (diff)).slice(-2);
                    this.topProgressBar = current / max;
                }
                else if (this.gameState.phase === Constants.PHASE_PLANNING) {
                    this.phaseText = 'PLANNING';
                    const max = (Constants.PLANNING_TIME * 1000);
                    
                    const current = max - (Date.now() - this.gameState.phaseStartTime);

                    let diff = current;
                    // Diff in Millis
                    diff = Math.ceil(diff / 1000);
                    // Diff in Seconds
                    this.gameTimer = ('0' + (diff)).slice(-2);
                    this.topProgressBar = current / max;
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

    customActionDispatch(name, option) {
        switch (name) {
        case 'healUnit': {
            if (this.selectedObject.attacksThisTurn === 0) {
                this.pushAlertMessage('Already healed this turn!');
                break;
            }
            this.pendingAction = new HealUnitPendingAction();
            break;
        }
        case 'repairStructure': {
            if (this.selectedObject.attacksThisTurn === 0) {
                this.pushAlertMessage('Already repaired this turn!');
                break;
            }
            this.pendingAction = new RepairStructurePendingAction();
            break;
        }
        case 'launchProbe': {
            if (option.cost > this.getGold()) {
                this.pushAlertMessage('Not enough gold!');
                return;
            }
            this.pendingAction = new LaunchProbePendingAction();
            break;
        }
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

    potentialMoveUnitEvent() {
        // Check if is unit:
        if (this.selectedObject && this.selectedObject.isUnit &&
            this.objectIsMind(this.selectedObject) &&
            this.selectedObject.turnsUntilBuilt === 0) {
            if (this.canCurrentUnitMoveToPosition) {
                this.sendStateChange(
                    MoveUnitStateChange.create(
                        this.player,
                        this.selectedObject.position,
                        this.inputManager.mouseState.tile));
                this.selectedObject.desiredPath = 
                    PathFinder.findPath(this.gameState, this.selectedObject.position,
                        this.inputManager.mouseState.tile);
                // TODO: add pathfinding here
            }
        }
    }

    potentialDesiredMoveEvent() {
        if (this.selectedObject && this.selectedObject.isUnit &&
            this.objectIsMine(this.selectedObject) &&
            this.selectedObject.turnsUntilBuilt === 0) {
            
            if (this.inputManager.mouseState.tile &&
                map.withinMap(this.inputManager.mouseState.tile)) {
                this.sendStateChange(SetUnitTargetStateChange.create(
                    this.player,
                    this.selectedObject.position,
                    this.inputManager.mouseState.tile
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
        if (map.withinMap(this.inputManager.mouseState.tile)) {
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
        if (button === LEFT_MOUSE_BUTTON && map.withinMap(this.inputManager.mouseState.tile)) {
            if (this.pendingAction) {
                const result = this.pendingAction.onClick(this);
                this.pendingAction = null;
                if (result) {
                    return true;
                }
            }

            let obj = this.getHoveredObjectOrNull();
            this.selectObject(obj);
            return true;
        }
        return false;
    }
};
