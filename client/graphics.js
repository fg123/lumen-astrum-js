var canvas, context;

const FPS_FILTER_STRENGTH = 20;
const DRAW_PADDING = 3;
const UNITS_BOTTOM_RIGHT_STATS = ["Health:", "Shield:", "Attack Damage:", "Move Range:", "Attack Range:", "Sight Range"];
const STRUCTURS_BOTTOM_RIGHT_STATS = ["Health:", "Shield:"];
const SMALL_ALERT_SHOW_TIME = 2 * 1000;

var frameTime = 0, lastLoop = new Date(), thisLoop;

var topLeftVisible = zeroTuple;
var bottomRightVisible = zeroTuple;

var deferArr = [];
loadResources(deferArr);

canvas = $("canvas")[0];
context = canvas.getContext("2d");

// LOL Not sure if this spread operator is even allowed zzz
$.when(...deferArr).then(function () {
    console.log("Resources loaded!");
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

function getIconClipStart(name) {
    if (structureList.includes(name)) {
        return createTuple(48 * structureList.indexOf(name), 0);
    }
    else if (unitList.includes(name)) {
        return createTuple(48 * unitList.indexOf(name), 48);
    }
    return zeroTuple;
}

function drawImage(img, x, y, width = -1, height = -1, angle = 0) {
    if (width === -1) width = img.width;
    if (height === -1) height = img.height;
    context.translate(x, y);
    context.rotate(angle);
    context.drawImage(img, -width / 2, -height / 2, width, height);
    context.rotate(-angle);
    context.translate(-x, -y);
}

function drawRectangle(color, x, y, width, height) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawMap() {
    for (let y = Math.max(0, topLeftVisible.y); y < Math.min(map.length, bottomRightVisible.y); y++) {
        for (let x = Math.max(0, topLeftVisible.x); x < Math.min(map[0].length, bottomRightVisible.x); x++) {
            if (map[y][x].displayType != 0) {
                let yOffset = 0;
                if (x % 2 == 1) {
                    yOffset = 55;
                }
                context.globalCompositeOperation = "destination-over";
                // Overlays
                // Drawn first because of Destination Over
                if (state.selectedObject &&
                    isConstructionBuilding(state.selectedObject.name) &&
                    objectOnMySide(state.selectedObject) &&
                    state.gameState.allowedBuilding[y][x]) {
                    drawImage(resources[RESOURCE_YELLOW_OVERLAY],
                        (x * 96),
                        (y * 111) + yOffset);
                }

                drawImage(resources[tiles[map[y][x].displayType - 1]], (x * 96), (y * 111) + yOffset);


                context.globalCompositeOperation = "source-over";
                let currPos = createTuple(x, y);
                if (currentScreen == GAME_SCREEN && state.gameState.mapObjects[y][x]) {
                    let width = state.gameState.mapObjects[y][x].width;
                    let selected = state.gameState.mapObjects[y][x] == state.selectedObject;
                    let mouseOver = false;
                    if (withinMap(mouseState.tile)) {
                        let mouseOverCenter = state.gameState.occupied[mouseState.tile.y][mouseState.tile.x];
                        if (mouseOverCenter) {
                            mouseOver = (x == mouseOverCenter.x && y == mouseOverCenter.y);
                        }
                    }
                    let name = state.gameState.mapObjects[y][x].name;
                    context.shadowBlur = 0;
                    if (selected && objectOnMySide(state.gameState.mapObjects[y][x])) {
                        context.shadowBlur = 25;
                        context.shadowColor = "black";
                    }
                    else if (mouseOver && objectOnMySide(state.gameState.mapObjects[y][x])) {
                        context.shadowBlur = 25;
                        context.shadowColor = "green";
                    }
                    else if (selected || mouseOver) {
                        context.shadowBlur = 25;
                        context.shadowColor = "#a40000";
                    }
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
    if (state.buildingStructure) {
        let baseObj = getBaseObject(state.buildingStructure);
        let surrounding = getSurrounding(mouseState.tile, baseObj.width);
        for (let i = 0; i < surrounding.length; i++) {
            if (withinMap(surrounding[i])) {
                drawImage(resources[state.allowedToBuildOrSpawn ? RESOURCE_GREEN_OVERLAY : RESOURCE_RED_OVERLAY],
                    (surrounding[i].x * 96),
                    (surrounding[i].y * 111) + (surrounding[i].x % 2) * 55);
            }
        }
    }
    else if (state.spawningUnit) {
        if (withinMap(mouseState.tile)) {
            drawImage(resources[state.allowedToBuildOrSpawn ? RESOURCE_GREEN_OVERLAY : RESOURCE_RED_OVERLAY],
                (mouseState.tile.x * 96),
                (mouseState.tile.y * 111) + (mouseState.tile.x % 2) * 55);
        }

        let baseObj = getBaseObject(state.selectedObject.name);
        let surrounding = getSurrounding(state.selectedObject.position,
            baseObj.width + 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (withinMap(surrounding[i]) &&
                !state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                map[surrounding[i].y][surrounding[i].x].displayType != 2) {
                    drawImage(resources[RESOURCE_YELLOW_OVERLAY],
                        (surrounding[i].x * 96),
                        (surrounding[i].y * 111) + (surrounding[i].x % 2) * 55);
            }
        }
    }
}

function setFontSize(size) {
    context.font = "bold " + size + "px Asap";
}

function drawText(text, color, fontSize, x, y, align = "left", fontStyle = "", maxWidth = 0, fontFamily = "Asap") {
    context.font = fontStyle + " " + fontSize + "px " + fontFamily;
    context.fillStyle = color;
    context.textAlign = align;
    if (maxWidth == 0) {
        context.fillText(text, x, y);
    }
    else {
        var lineHeight = fontSize + 2;
        var words = text.split(' '),
            line = '',
            lineCount = 0,
            i,
            test,
            metrics;
        for (i = 0; i < words.length; i++) {
            test = words[i];
            metrics = context.measureText(test);
            while (metrics.width > maxWidth) {
                // Determine how much of the word will fit
                test = test.substring(0, test.length - 1);
                metrics = context.measureText(test);
            }
            if (words[i] != test) {
                words.splice(i + 1, 0, words[i].substr(test.length));
                words[i] = test;
            }

            test = line + words[i] + ' ';
            metrics = context.measureText(test);

            if (metrics.width > maxWidth && i > 0) {
                context.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
                lineCount++;
            }
            else {
                line = test;
            }
        }
        context.fillText(line, x, y);
    }
}

function objectOnMySide(mapObject) {
    return mapObject.side == state.side;
}

function drawUI() {
    if (state.bigMessage != "") {
        setFontSize(50);

        var measure = context.measureText(state.bigMessage);
        var width = measure.width + 30;
        var height = 70;
        drawRectangle("black", screenWidth / 2 - width / 2, screenHeight / 4 - height / 2,
            width, height);
        context.textBaseline = "middle";
        drawText(state.bigMessage, "white", 50, screenWidth / 2, screenHeight / 4, "center");
        context.textBaseline = "alphabetic";
    }
    if (state.smallAlert.current) {
        // Show Small Message
        drawText(state.smallAlert.current, "#DE0000", 22, screenWidth / 2, screenHeight - 200, "center", "bold");
        if (Date.now() - state.smallAlert.lastShownTime > SMALL_ALERT_SHOW_TIME) {
            state.smallAlert.current = null;
        }
    }
    if (state.smallAlert.queue.length !== 0 && state.smallAlert.current == null) {
        state.smallAlert.current = state.smallAlert.queue.shift();
        state.smallAlert.lastShownTime = Date.now();
    }
    // Four Part UI
    drawImage(resources[RESOURCE_UI_TOP_RIGHT],
        screenWidth - resources[RESOURCE_UI_TOP_RIGHT].width / 2,
        resources[RESOURCE_UI_TOP_RIGHT].height / 2);
    drawImage(resources[RESOURCE_UI_BOTTOM_RIGHT],
        screenWidth - resources[RESOURCE_UI_BOTTOM_RIGHT].width / 2,
        screenHeight - resources[RESOURCE_UI_BOTTOM_RIGHT].height / 2);

    // Turn Controls
    state.hoveringEndTurn = false;
    if (state.gameState.currentTurn == state.side) {
        // Show Timer
        drawText(state.turnTimer, "black", 60, screenWidth - 180, 75, "left", "bold");
        // Show End Turn Button
        if (mouseState.position.x > screenWidth - 365 &&
            mouseState.position.x < screenWidth - 365 + 120 &&
            mouseState.position.y > 0 && mouseState.position.y < 48) {
            state.hoveringEndTurn = true;
            drawRectangle("rgba(164, 0, 0, 0.8)", screenWidth - 365, 0, 120, 48);
        }
        else {
            drawRectangle("rgba(164, 0, 0, 0.6)", screenWidth - 365, 0, 120, 48);
        }
        context.textBaseline = "middle";
        drawText("End Turn", "white", 20,  screenWidth - 365 + 60, 24, "center", "bold");
        context.textBaseline = "alphabetic";
    }

    // Bottom Left Selected Info
    if (state.selectedObject) {
        drawImage(resources[RESOURCE_UI_BOTTOM_LEFT],
            resources[RESOURCE_UI_BOTTOM_LEFT].width / 2,
            screenHeight - resources[RESOURCE_UI_BOTTOM_LEFT].height / 2);
        var clip = getIconClipStart(state.selectedObject.name);
        var baseObj = getBaseObject(state.selectedObject.name);

        context.drawImage(resources[RESOURCE_UI_ICONS],
            clip.x,
            clip.y, 48, 48, 64,
            screenHeight - resources[RESOURCE_UI_BOTTOM_LEFT].height + 61,
            48, 48);
        var name = state.selectedObject.name;
        if (!objectOnMySide(state.selectedObject)) {
            name = "Enemy " + name;
        }
        drawText(name, "black", 16, 88,
            screenHeight - resources[RESOURCE_UI_BOTTOM_LEFT].height + 43, "center", "bold");

        var lineHeight = 16;
        var rightSide = [state.selectedObject.currentHealth + "/" + baseObj.health,
            state.selectedObject.currentShield + "/" + baseObj.shield];
        var leftSide = state.selectedObject.name in units ? UNITS_BOTTOM_RIGHT_STATS : STRUCTURS_BOTTOM_RIGHT_STATS;
        leftSide.forEach(function (val, index) {
            drawText(val, "black", 13, 10,
                screenHeight - resources[RESOURCE_UI_BOTTOM_LEFT].height + 130 + index * lineHeight, "left", "bold");
        });
        if (state.selectedObject.name in units) {
            // Could also use concat here but will create more garbage but will be speedier
            Array.prototype.push.apply(rightSide, [baseObj.damage, baseObj.moverange, baseObj.attackrange, baseObj.sightrange]);
        }
        rightSide.forEach(function (val, index) {
            drawText(val, "black", 13, 176 - 10,
                screenHeight - resources[RESOURCE_UI_BOTTOM_LEFT].height + 130 + index * lineHeight, "right", "bold");
        });
        state.hoveredOption = null;
        if (objectOnMySide(state.selectedObject)) {
            for (var i = 0; i < baseObj.options.length; i++) {
                var clipIcon = getIconClipStart(baseObj.options[i].icon.slice(1, -1));
                var pos = createTuple(176 + i * 48, screenHeight - 48);
                context.drawImage(resources[RESOURCE_UI_ICONS],
                    clipIcon.x,
                    clipIcon.y, 48, 48, pos.x, pos.y,
                    48, 48);
                // Test Mouse Over
                if (mouseState.position.x > pos.x && mouseState.position.x < pos.x + 48 &&
                    mouseState.position.y > pos.y && mouseState.position.y < pos.y + 48 &&
                    !state.hoveredOption) {
                    // Show Dialog
                    var dialogPos = createTuple(pos.x - 150 + 24, pos.y - 180);
                    var dialogSize = createTuple(300, 100);
                    drawRectangle("rgba(0, 0, 0, 0.9)", dialogPos.x, dialogPos.y, dialogSize.x, dialogSize.y);
                    drawText(baseObj.options[i].title, "white", 16, dialogPos.x + 5, dialogPos.y + 20, "left", "bold");
                    drawText("Ø" + baseObj.options[i].cost, "white", 16, dialogPos.x + dialogSize.x - 5, dialogPos.y + 20, "right", "bold");
                    var descSrc = baseObj.options[i].description.slice(1, -1);
                    var desc = descSrc in structures ? structures[descSrc].description : units[descSrc].description;
                    drawText(desc, "white", 16, dialogPos.x + 5, dialogPos.y + 40, "left", "", dialogSize.x - 10);
                    state.hoveredOption = baseObj.options[i];
                }
            }
        }
    }
    drawImage(resources[RESOURCE_CURSOR],
        mouseState.position.x,
        mouseState.position.y, -1, -1, toRadians(-30));

    drawText(parseInt(1000 / frameTime) + " fps", "white", 16, 10, 20, "left", "bold");
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
    var thisFrameTime = (thisLoop = new Date()) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / FPS_FILTER_STRENGTH;
    lastLoop = thisLoop;
}

function draw() {
    context.canvas.width = screenWidth;
    context.canvas.height = screenHeight;
    topLeftVisible = toTileCoord(toWorldCoord(zeroTuple));
    bottomRightVisible = toTileCoord(toWorldCoord(createTuple(screenWidth, screenHeight)));
    topLeftVisible.x -= DRAW_PADDING;

    topLeftVisible.y -= DRAW_PADDING;

    bottomRightVisible.x += DRAW_PADDING;

    bottomRightVisible.y += DRAW_PADDING;

    drawState();
    if (currentScreen == GAME_SCREEN) {
        drawUI();
    }
}