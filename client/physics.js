const TIME_BETWEEN_FRAMES = 16;
var DELTA_TIME = 1000 / TIME_BETWEEN_FRAMES;
var PREV_TIME = Date.now();

var movement = [createTuple(500, 500), createTuple(2250, 1320), createTuple(4092, 296), createTuple(4733, 2323), createTuple(2000, 2387)];
var movementIndex = 0;

var screenWidth = 0;
var screenHeight = 0;

var mouseDown = false;
var mouseDownLocation;
var mouseLocation;

function checkInput() {
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
    mouseState.tile = toTileCoord(toWorldCoord(mouseState.position));
}

function update() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    var now = Date.now();
    DELTA_TIME = 1000 / (now - PREV_TIME);
    if (currentScreen == GAME_SCREEN) {
        checkInput();
    }

    var change = mouseState.scrollDelta.y / 50;
    var oldScale = state.camera.scale;
    state.camera.scale += change;
    state.camera.scale = Math.max(Math.min(1.0, state.camera.scale), 0.3);
    var actualChange = Math.abs(oldScale - state.camera.scale);
    state.camera.position.x += (mouseState.position.x - (screenWidth / 2)) * 2 * actualChange + state.camera.delta.x;
    state.camera.position.y += (mouseState.position.y - (screenHeight / 2)) * 2 * actualChange + state.camera.delta.y;
    mouseState.scrollDelta.x *= 0.9;
    mouseState.scrollDelta.y *= 0.9;
    state.camera.delta.x *= 0.9;
    state.camera.delta.y *= 0.9;
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
    //console.log(state.camera.position);
    PREV_TIME = now;
}
    startPhysicsLoop();
   // update();


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