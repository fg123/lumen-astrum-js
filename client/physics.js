const TIME_BETWEEN_FRAMES = 16;
var DELTA_TIME = 1000 / TIME_BETWEEN_FRAMES;
var PREV_TIME = Date.now();

var movement = [createTuple(500, 500), createTuple(2250, 1320), createTuple(4092, 296), createTuple(4733, 2323), createTuple(2000, 2387)];
var movementIndex = 0;

var screenWidth = 0;
var screenHeight = 0;

var mouseDownLocation;
var mouseLocation;

function checkInput() {
    if (currentScreen != GAME_SCREEN) return;
    if (keyState[KEY_A]) {
        state.camera.delta.x = -35;
    }
    if (keyState[KEY_D]) {
        state.camera.delta.x = 35;
    }
    if (keyState[KEY_W]) {
        state.camera.delta.y = -35;
    }
    if (keyState[KEY_S]) {
        state.camera.delta.y = 35;
    }
    if (keyState[KEY_ESCAPE] && !prevKeyState[KEY_ESCAPE]) {
        if (state.buildingStructure || state.spawningUnit) {
            state.buildingStructure = null;
            state.spawningUnit = null;
        }
        else if (state.selectedObject) {
            state.selectedObject = null;
        }
    }
    for (var i = 0; i < DIGIT_KEYS.length; i++) {
        if (keyState[DIGIT_KEYS[i]] && !prevKeyState[DIGIT_KEYS[i]]) {
            if (state.selectedObject) {
                var baseObj = getBaseObject(state.selectedObject.name);
                if (i < baseObj.options.length) {
                    handleOptionClicked(baseObj.options[i]);
                }
            }
        }
    }
    if (keyState[KEY_SPACE]) {
        selectObject(state.commandCenter);
    }
    prevKeyState = keyState.slice(0);
}

function handleOptionClicked(option) {
    if (state.side != state.gameState.currentTurn) {
        // Cannot Exercise Option If Not Your Turn
        pushAlertMessage("Wait for your turn!");
        return;
    }
    // Check for Gold Cost and Prereqs
    // TODO: Prereqs
    if (option.cost > getGold()) {
        pushAlertMessage("Not enough gold!");
        return;
    }
    // TODO: Use Constants
    // Parse command
    var parts = option.command.split("-");
    switch (parts[0]) {
        case "spawn":
            state.spawningUnit = parts[1];
            state.buildingStructure = null;
            break;
        case "build":
            state.buildingStructure = parts[1];
            state.spawningUnit = null;
            break;
    }
    return;
}

function gameUIClickEvent(button) {
    if (currentScreen != GAME_SCREEN) return false;
    if (state.hoveredOption) {
        handleOptionClicked(state.hoveredOption);
        return true;
    }
    if (state.hoveringEndTurn) {
        sendStateChange(createStateChange(state.side, "turn-passover", {
            isUserInitiated: true
        }));
        return true;
    }
    return false;
}

function gameObjectClickEvent(button) {
    if (currentScreen != GAME_SCREEN) return false;
    if (button == LEFT_MOUSE_BUTTON && withinMap(mouseState.tile)) {
        // Could be a Placement
        if (state.buildingStructure || state.spawningUnit) {
            if (state.allowedToBuildOrSpawn) {
                if (state.buildingStructure) {
                    sendStateChange(createStateChange(state.side, "build-structure", {
                        name: state.buildingStructure,
                        position: mouseState.tile
                    }));
                }
                else {
                    sendStateChange(createStateChange(state.side, "spawn-unit", {
                        name: state.spawningUnit,
                        position: mouseState.tile,
                        from: state.selectedObject
                    }));
                }
                state.buildingStructure = null;
                state.spawningUnit = null;
                return true;
            }
            return false;
        }
        else {
            let obj = null;
            let occupiedPoint = state.gameState.occupied[mouseState.tile.y][mouseState.tile.x];
            // Check that it's actually occupied by an object
            if (occupiedPoint && occupiedPoint !== true) {
                obj = state.gameState.mapObjects[occupiedPoint.y][occupiedPoint.x];
            }
            selectObject(obj);
            return true;
        }
    }
    return false;
}

function checkLegalityOfBuildOrSpawn() {
    // TODO Add Checking for Units and Add Checking for Building Range
    if (state.buildingStructure) {
        state.allowedToBuildOrSpawn = canBuildStructureAt(state.gameState, state.buildingStructure, mouseState.tile);
    }
    else if (state.spawningUnit) {
        state.allowedToBuildOrSpawn = canSpawnUnitAt(state.gameState, state.selectedObject, mouseState.tile);
    }
}
function calculateTurnTimeRemainingIfTurn() {
    if (state.gameState.currentTurn == state.side) {
        let diff = state.gameState.turnEndTime - Date.now();
        // Diff in Millis
        diff = Math.ceil(diff / 1000);
        // Diff in Seconds
        state.turnTimer = ("0" + Math.floor(diff / 60)).slice(-2) + ":" + ("0" + (diff % 60)).slice(-2);
    }
    else {
        state.turnTimer = "00:00";
    }
}
function update() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    var now = Date.now();
    DELTA_TIME = 1000 / (now - PREV_TIME);

    mouseState.tile = toTileCoord(toWorldCoord(mouseState.position));

    checkInput();
    checkLegalityOfBuildOrSpawn();
    calculateTurnTimeRemainingIfTurn();

    var change = mouseState.scrollDelta.y / 50;
    var oldScale = state.camera.scale;
    state.camera.scale += change;
    state.camera.scale = Math.max(Math.min(1.0, state.camera.scale), 0.3);
    var actualChange = Math.abs(oldScale - state.camera.scale);
    state.camera.position.x += (mouseState.position.x - (screenWidth / 2)) * 2 * actualChange + state.camera.delta.x;
    state.camera.position.y += (mouseState.position.y - (screenHeight / 2)) * 2 * actualChange + state.camera.delta.y;
    mouseState.scrollDelta.x *= 0.7;
    mouseState.scrollDelta.y *= 0.7;
    state.camera.delta.x *= 0.7;
    state.camera.delta.y *= 0.7;
    if (currentScreen != GAME_SCREEN) {
        var d = distance(state.camera.position, movement[movementIndex]);
        if (d < 1) {
            movementIndex = (movementIndex + 1) % movement.length;
            d = distance(state.camera.position, movement[movementIndex]);
        }
        var a = createTuple(movement[movementIndex].x - state.camera.position.x,
            movement[movementIndex].y - state.camera.position.y);

        state.camera.position.x += a.x / d * 1;
        state.camera.position.y += a.y / d * 1;
    }
    PREV_TIME = now;
}

startPhysicsLoop();

var physicsLoop;
function startPhysicsLoop() {
    if (!physicsLoop) {
        physicsLoop = setInterval(update, TIME_BETWEEN_FRAMES);
    }
}
function stopPhysicsLoop() {
    if (physicsLoop) {
        clearInterval(physicsLoop);
        physicsLoop = undefined;
    }
}