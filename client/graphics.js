var canvas, context;

var fpsFilterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var topLeftVisible = createTuple(0, 0);
var bottomRightVisible = createTuple(0, 0);
var drawPadding = 3;


canvas = $("canvas")[0];
context = canvas.getContext("2d");
var deferArr = [];
loadResources(deferArr);
// LOL Not sure if this spread operator is even allowed zzz
$.when(...deferArr).then(function () {
    console.log("Resources loaded!");
    console.log(deferArr);
    // Start Graphics Loop When All Resources Loaded
    startGraphicsLoop();
    //draw();
});

var graphicsLoop;
function startGraphicsLoop() {
    if (!graphicsLoop) {
        graphicsLoop = setInterval(draw, TIME_BETWEEN_FRAMES);
    }
}

function stopGraphicsLoop() {
    if (graphicsLoop) {
        clearInterval(graphicsLoop);
        graphicsLoop = undefined;
    }
}

function drawImage(img, x, y, width = -1, height = -1, angle = 0) {
    if (width === -1) width = img.width;
    if (height === -1) height = img.height;

    var drawPos = createTuple(x, y);
    context.translate(drawPos.x, drawPos.y);
    context.rotate(angle);
    context.drawImage(img, -width / 2, -height / 2, width, height);
    context.rotate(-angle);
    context.translate(-drawPos.x, -drawPos.y);
}

function drawRectangle(color, x, y, width, height) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawMap() {
    for (var y = Math.max(0, topLeftVisible.y); y < Math.min(map.length, bottomRightVisible.y); y++) {
        for (var x = Math.max(0, topLeftVisible.x); x < Math.min(map[0].length, bottomRightVisible.x); x++) {
            if (map[y][x].displayType != 0) {
                var yOffset = 0;
                if (x % 2 == 1) {
                    yOffset = 55;
                }
                context.globalCompositeOperation = "destination-over";
                drawImage(resources[tiles[map[y][x].displayType - 1]], (x * 96), (y * 111) + yOffset);
                context.globalCompositeOperation = "source-over";
                if (mouseState.tile.x == x && mouseState.tile.y == y && map[y][x].displayType != 5) {
                    drawImage(resources[RESOURCE_YELLOW_OVERLAY], (x * 96), (y * 111) + yOffset);
                }
                if (currentScreen == GAME_SCREEN && state.gameState.mapObjects[y][x]) {
                    var name = state.gameState.mapObjects[y][x].name;
                    context.shadowBlur = 10;
                    if (name in structures) {
                        drawImage(structures[name].image, (x * 96), (y * 111) + yOffset);
                    }
                    else if (name in units) {
                        drawImage(units[name].image, (x * 96), (y * 111) + yOffset);
                    }
                    context.shadowBlur = 0;
                }
            }
        }
    }
    var mousePosWorld = toWorldCoord(mouseState.position);
    //drawImage(resources[RESOURCE_BLUE_OVERLAY], state.camera.position.x, state.camera.position.y);
}

function setFontSize(size) {
    context.font = "bold " + size + "px Montserrat";
}

function drawUI() {
    if (state.bigMessage != "") {
        setFontSize(50);
        context.textAlign = "center";
        context.textBaseline = "middle";
        var measure = context.measureText(state.bigMessage);
        var width = measure.width + 30;
        var height = 70;
        drawRectangle("black", screenWidth / 2 - width / 2, screenHeight / 4 - height / 2,
            width, height);
        context.fillStyle = "white";
        context.fillText(state.bigMessage, screenWidth / 2, screenHeight / 4);
    }
    drawImage(resources[RESOURCE_UI_TOP_RIGHT],
        screenWidth - resources[RESOURCE_UI_TOP_RIGHT].width / 2,
        resources[RESOURCE_UI_TOP_RIGHT].height / 2);
    drawImage(resources[RESOURCE_UI_BOTTOM_LEFT],
        resources[RESOURCE_UI_BOTTOM_LEFT].width / 2,
        screenHeight - resources[RESOURCE_UI_BOTTOM_LEFT].height / 2);
    drawImage(resources[RESOURCE_UI_BOTTOM_RIGHT],
        screenWidth - resources[RESOURCE_UI_BOTTOM_RIGHT].width / 2,
        screenHeight - resources[RESOURCE_UI_BOTTOM_RIGHT].height / 2);
    drawImage(resources[RESOURCE_CURSOR],
        mouseState.position.x,
        mouseState.position.y, -1, -1, toRadians(-30));

    setFontSize(16);
    context.fillStyle = "white";
    context.textAlign = "left";
    context.fillText(parseInt(1000 / frameTime) + " fps", 10, 20);
}

function drawState() {
    var factor = 1 / state.camera.scale;
    var offsetX = ((screenWidth / 2) * factor);
    var offsetY = ((screenHeight / 2) * factor);
    context.save();
    context.scale(state.camera.scale, state.camera.scale);
    context.translate(-(state.camera.position.x - offsetX),
                      -(state.camera.position.y - offsetY));
    drawMap();
    context.restore();
    context.globalCompositeOperation = "destination-over";
    drawImage(resources[RESOURCE_BACKGROUND], screenWidth / 2, screenHeight / 2, screenWidth, screenHeight);
    context.globalCompositeOperation = "source-over";
    var thisFrameTime = (thisLoop = new Date) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / fpsFilterStrength;
    lastLoop = thisLoop;
}

function draw() {
    context.canvas.width = screenWidth;
    context.canvas.height = screenHeight;
    topLeftVisible = toTileCoord(toWorldCoord(createTuple(0, 0)));
    bottomRightVisible = toTileCoord(toWorldCoord(createTuple(screenWidth, screenHeight)));
    topLeftVisible.x -= drawPadding;
    topLeftVisible.y -= drawPadding;
    bottomRightVisible.x += drawPadding;
    bottomRightVisible.y += drawPadding;
    drawState();
    if (currentScreen == GAME_SCREEN) {
        drawUI();
    }
}