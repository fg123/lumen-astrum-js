const { Tuple, getSurrounding } = require('../shared/coordinates');
const { Resource, tiles } = require('./resources');
const { getBaseObject, structureList, unitList, units, structures } = require('../shared/data');
const { Structure } = require('../shared/map-objects');
const { map, withinMap } = require('../shared/map');
const PathFinder = require('../shared/path-finder');

const Utils = require('./utils');

const DRAW_PADDING = 2;
const FPS_FILTER_STRENGTH = 20;
const UNITS_BOTTOM_RIGHT_STATS = ['Health:', 'Shield:', 'Attack Damage:', 'Move Range:', 'Attack Range:', 'Sight Range'];
const STRUCTURS_BOTTOM_RIGHT_STATS = ['Health:', 'Shield:'];
const SMALL_ALERT_SHOW_TIME = 2 * 1000;

const LEFT_MOUSE_BUTTON = 1;

module.exports = class GraphicsManager {
    constructor(canvas, targetInterval, ui, camera, state, resourceManager, inputManager) {
        this.inputManager = inputManager;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.ui = ui;
        this.camera = camera;
        this.state = state;
        this.resourceManager = resourceManager;

        /* Variables used during drawing */
        this.drawContext = {
            topLeftVisible: Tuple.ZERO,
            bottomRightVisible: Tuple.ZERO,
            screenWidth: 0,
            screenHeight: 0
        };

        this.fps = {
            frameTime: 0,
            lastLoop: new Date(),
            thisLoop: 0
        };

        /* Start Graphics Loop */
        this.graphicsLoop = setInterval(() => {
            this.drawContext.screenWidth = window.innerWidth;
            this.drawContext.screenHeight = window.innerHeight;
            const thisFrameTime = (this.fps.thisLoop = new Date()) - this.fps.lastLoop;
            this.fps.frameTime += (thisFrameTime - this.fps.frameTime) / FPS_FILTER_STRENGTH;
            this.fps.lastLoop = this.fps.thisLoop;
            this.draw();
        }, targetInterval);
    }

    draw() {
        this.context.canvas.width = this.drawContext.screenWidth;
        this.context.canvas.height = this.drawContext.screenHeight;
        this.drawContext.topLeftVisible = this.camera.toWorldCoord(Tuple.ZERO).toTileCoord();
        this.drawContext.bottomRightVisible = this.camera.toWorldCoord(new Tuple(this.drawContext.screenWidth,
            this.drawContext.screenHeight)).toTileCoord();

        this.drawContext.topLeftVisible.x -= DRAW_PADDING;
        this.drawContext.topLeftVisible.y -= DRAW_PADDING;
        this.drawContext.bottomRightVisible.x += DRAW_PADDING;
        this.drawContext.bottomRightVisible.y += DRAW_PADDING;
        this.drawState(this.drawContext.screenWidth, this.drawContext.screenHeight);
        if (this.ui.currentScreen === this.ui.Screen.GAME_SCREEN) {
            this.drawUI(this.drawContext.screenWidth, this.drawContext.screenHeight);
        }
    }

    drawText(text, color, fontSize, x, y,
        align = 'left', fontStyle = '', maxWidth = 0,
        fontFamily = 'Roboto Slab') {
        this.context.font = fontStyle + ' ' + fontSize + 'px ' + fontFamily;
        this.context.fillStyle = color;
        this.context.textAlign = align;
        if (maxWidth === 0) {
            this.context.fillText(text, x, y);
            return;
        }
        const lineHeight = fontSize + 2;
        const words = text.split(' ');
        let line = '',
            i,
            test,
            metrics;
        for (i = 0; i < words.length; i++) {
            test = words[i];
            metrics = this.context.measureText(test);
            while (metrics.width > maxWidth) {
                // Determine how much of the word will fit
                test = test.substring(0, test.length - 1);
                metrics = this.context.measureText(test);
            }
            if (words[i] != test) {
                words.splice(i + 1, 0, words[i].substr(test.length));
                words[i] = test;
            }

            test = line + words[i] + ' ';
            metrics = this.context.measureText(test);

            if (metrics.width > maxWidth && i > 0) {
                this.context.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
            }
            else {
                line = test;
            }
        }
        this.context.fillText(line, x, y);
    }

    setFontSize(size) {
        this.context.font = 'bold ' + size + 'px Asap';
    }

    getIconClipStart(name) {
        if (structureList.includes(name)) {
            return new Tuple(48 * structureList.indexOf(name), 0);
        }
        else if (unitList.includes(name)) {
            return new Tuple(48 * unitList.indexOf(name), 48);
        }
        return Tuple.ZERO;
    }

    objectOnMySide(mapObject) {
        return mapObject.side === this.state.side;
    }

    drawImage(img, x, y, width = -1, height = -1, angle = 0) {
        if (width === -1) width = img.width;
        if (height === -1) height = img.height;
        this.context.translate(x, y);
        this.context.rotate(angle);
        this.context.drawImage(img, -width / 2, -height / 2, width, height);
        this.context.rotate(-angle);
        this.context.translate(-x, -y);
    }

    drawRectangle(color, x, y, width, height) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    drawUI(screenWidth, screenHeight) {
        if (this.state.bigMessage) {
            this.setFontSize(50);

            let measure = this.context.measureText(this.state.bigMessage);
            let width = measure.width + 100;
            let height = 70;
            this.drawRectangle('black', screenWidth / 2 - width / 2,
                this.drawContext.screenHeight / 4 - height / 2,
                width, height);
            this.context.textBaseline = 'middle';
            this.drawText(this.state.bigMessage, 'white', 50, screenWidth / 2, screenHeight / 4, 'center');
            this.context.textBaseline = 'alphabetic';
        }
        if (this.state.smallAlert.current) {
            // Show Small Message
            this.drawText(this.state.smallAlert.current, '#DE0000', 22, screenWidth / 2, screenHeight - 200, 'center', 'bold');
            if (Date.now() - this.state.smallAlert.lastShownTime > SMALL_ALERT_SHOW_TIME) {
                this.state.smallAlert.current = null;
            }
        }
        if (this.state.smallAlert.queue.length !== 0 && this.state.smallAlert.current === null) {
            this.state.smallAlert.current = this.state.smallAlert.queue.shift();
            this.state.smallAlert.lastShownTime = Date.now();
        }
        // Four Part UI
        const topRight = this.resourceManager.get(Resource.UI_TOP_RIGHT);
        const bottomRight = this.resourceManager.get(Resource.UI_BOTTOM_RIGHT);
        this.drawImage(topRight,
            screenWidth - topRight.width / 2,
            topRight.height / 2);
        this.drawImage(bottomRight,
            screenWidth - bottomRight.width / 2,
            screenHeight - bottomRight.height / 2);

        // Gold
        this.context.textBaseline = 'middle';
        this.drawText(this.state.getGold(),
            'white', 32, screenWidth - 185, screenHeight - 184, 'left', 'bold');
        this.context.textBaseline = 'alphabetic';

        // Turn Controls
        this.state.hoveringEndTurn = false;
        if (this.state.gameState.currentTurn === this.state.side) {
            // Show Timer
            this.drawText(this.state.turnTimer, 'black', 60, screenWidth - 180, 75, 'left', 'bold');
            // Show End Turn Button
            if (this.inputManager.mouseState.position.x > screenWidth - 365 &&
                this.inputManager.mouseState.position.x < screenWidth - 365 + 120 &&
                this.inputManager.mouseState.position.y > 0 && this.inputManager.mouseState.position.y < 48) {
                this.state.hoveringEndTurn = true;
                this.drawRectangle('rgba(164, 0, 0, 0.8)', screenWidth - 365, 0, 120, 48);
            }
            else {
                this.drawRectangle('rgba(164, 0, 0, 0.6)', screenWidth - 365, 0, 120, 48);
            }
            this.context.textBaseline = 'middle';
            this.drawText('End Turn', 'white', 20,  screenWidth - 365 + 60, 24, 'center', 'bold');
            this.context.textBaseline = 'alphabetic';
        }

        // Bottom Left Selected Info
        if (this.state.selectedObject) {
            const bottomLeft = this.resourceManager.get(Resource.UI_BOTTOM_LEFT);
            this.drawImage(bottomLeft, bottomLeft.width / 2,
                screenHeight - bottomLeft.height / 2);
            const clip = this.getIconClipStart(this.state.selectedObject.name);
            const baseObj = getBaseObject(this.state.selectedObject.name);

            this.context.drawImage(this.resourceManager.get(Resource.UI_ICONS),
                clip.x,
                clip.y, 48, 48, 64,
                screenHeight - bottomLeft.height + 61,
                48, 48);

            // Consider: unit vs structure, enemy vs mine, currently building vs not!
            let name = this.state.selectedObject.name;
            if (!this.objectOnMySide(this.state.selectedObject)) {
                name = 'Enemy ' + name;
            }
            this.drawText(name, 'black', 16, 88,
                screenHeight - bottomLeft.height + 43, 'center', 'bold');

            if (this.state.selectedObject.turnsUntilBuilt === 0) {
                const lineHeight = 16;
                const rightSide = [this.state.selectedObject.currentHealth + '/' + baseObj.health,
                    this.state.selectedObject.currentShield + '/' + baseObj.shield];
                const leftSide = this.state.selectedObject.name in units ? UNITS_BOTTOM_RIGHT_STATS : STRUCTURS_BOTTOM_RIGHT_STATS;
                leftSide.forEach((val, index) => {
                    this.drawText(val, 'black', 13, 10,
                        screenHeight - bottomLeft.height + 130 + index * lineHeight, 'left', 'bold');
                });
                if (this.state.selectedObject.name in units) {
                    // Could also use concat here but will create more garbage but will be speedier
                    Array.prototype.push.apply(rightSide, [baseObj.damage, this.state.selectedObject.moveRange + '/' + baseObj.moverange, baseObj.attackrange, baseObj.sightrange]);
                }
                rightSide.forEach((val, index) => {
                    this.drawText(val, 'black', 13, 176 - 10,
                        screenHeight - bottomLeft.height + 130 + index * lineHeight, 'right', 'bold');
                });
            }
            else {
                let t = this.state.selectedObject.turnsUntilBuilt;
                this.drawText('Constructing...(' + t + ' turn' + (t != 1 ? 's' : '') + ' left!)', 'black', 13, 88,
                    screenHeight - bottomLeft.height + 130, 'center', 'bold');
            }

            this.state.hoveredOption = null;
            if (this.objectOnMySide(this.state.selectedObject) && this.state.selectedObject.turnsUntilBuilt === 0) {
                for (let i = 0; i < baseObj.options.length; i++) {
                    const clipIcon = this.getIconClipStart(baseObj.options[i].icon.slice(1, -1));
                    const pos = new Tuple(176 + i * 48, screenHeight - 48);
                    this.context.drawImage(this.resourceManager.get(Resource.UI_ICONS),
                        clipIcon.x,
                        clipIcon.y, 48, 48, pos.x, pos.y,
                        48, 48);
                    // Test Mouse Over
                    if (this.inputManager.mouseState.position.x > pos.x &&
                        this.inputManager.mouseState.position.x < pos.x + 48 &&
                        this.inputManager.mouseState.position.y > pos.y &&
                        this.inputManager.mouseState.position.y < pos.y + 48 &&
                        !this.state.hoveredOption) {
                        // Show Dialog
                        const dialogPos = new Tuple(pos.x - 150 + 24, pos.y - 180);
                        const dialogSize = new Tuple(300, 100);
                        this.drawRectangle('rgba(0, 0, 0, 0.9)', dialogPos.x, dialogPos.y, dialogSize.x, dialogSize.y);
                        this.drawText(baseObj.options[i].title, 'white', 16, dialogPos.x + 5, dialogPos.y + 20, 'left', 'bold');
                        this.drawText('Ø' + baseObj.options[i].cost, 'white', 16, dialogPos.x + dialogSize.x - 5, dialogPos.y + 20, 'right', 'bold');
                        const descSrc = baseObj.options[i].description.slice(1, -1);
                        const desc = descSrc in structures ? structures[descSrc].description : units[descSrc].description;
                        this.drawText(desc, 'white', 16, dialogPos.x + 5, dialogPos.y + 40, 'left', '', dialogSize.x - 10);
                        this.state.hoveredOption = baseObj.options[i];
                    }
                }
            }
        }

        if (this.state.cursorMessage) {
            this.setFontSize(14);

            let measure = this.context.measureText(this.state.cursorMessage);
            let width = measure.width + 10;
            let height = 20;

            this.drawRectangle('black',
                this.inputManager.mouseState.position.x - (width / 2),
                this.inputManager.mouseState.position.y - 30,
                width, height);

            this.context.textBaseline = 'middle';
            this.drawText(this.state.cursorMessage, 'white', 14,
                this.inputManager.mouseState.position.x,
                this.inputManager.mouseState.position.y + height / 2 - 30, 'center');
            this.context.textBaseline = 'alphabetic';
        }

        this.drawImage(this.resourceManager.get(Resource.CURSOR),
            this.inputManager.mouseState.position.x,
            this.inputManager.mouseState.position.y, -1, -1, Utils.toRadians(-30));

        this.drawText(parseInt(1000 / this.fps.frameTime) + ' fps', 'white', 16, 10, 20, 'left', 'bold');
    }

    hasSelectedConstructionBuildingAndIsAllowed(x, y) {
        return this.state.selectedObject &&
            Structure.isConstructionBuilding(this.state.selectedObject.name) &&
            this.objectOnMySide(this.state.selectedObject) &&
            this.state.gameState.allowedBuilding[y][x] === this.state.side;
    }

    drawState(screenWidth, screenHeight) {
        const factor = 1 / this.camera.scale;
        const offsetX = ((screenWidth / 2) * factor);
        const offsetY = ((screenHeight / 2) * factor);
        this.context.save();
        this.context.scale(this.camera.scale, this.camera.scale);
        this.context.translate(-(this.camera.position.x - offsetX),
            -(this.camera.position.y - offsetY));
        this.drawMap();
        this.context.restore();
        this.context.globalCompositeOperation = 'destination-over';
        this.drawImage(this.resourceManager.get(Resource.BACKGROUND),
            screenWidth / 2, screenHeight / 2, screenWidth, screenHeight);
        this.context.globalCompositeOperation = 'source-over';
    }

    drawMap() {
        for (let y = Math.max(0, this.drawContext.topLeftVisible.y);
            y < Math.min(map.length, this.drawContext.bottomRightVisible.y); y++) {
            for (let x = Math.max(0, this.drawContext.topLeftVisible.x);
                x < Math.min(map[0].length, this.drawContext.bottomRightVisible.x); x++) {
                if (map[y][x].displayType != 0) {
                    let yOffset = 0;
                    if (x % 2 === 1) {
                        yOffset = 55;
                    }
                    this.context.globalCompositeOperation = 'destination-over';
                    // Overlays
                    // Drawn first because of Destination Over
                    if (this.hasSelectedConstructionBuildingAndIsAllowed(x, y)) {
                        this.drawImage(this.resourceManager.get(Resource.GREEN_OVERLAY),
                            (x * 96),
                            (y * 111) + yOffset);
                    }

                    this.drawImage(this.resourceManager.get(
                        tiles[map[y][x].displayType - 1]
                    ), (x * 96), (y * 111) + yOffset);

                    this.context.globalCompositeOperation = 'source-over';
                    if (this.ui.currentScreen === this.ui.Screen.GAME_SCREEN &&
                        this.state.gameState.mapObjects[y][x]) {
                        let selected = this.state.gameState.mapObjects[y][x] === this.state.selectedObject;
                        let mouseOver = false;
                        if (withinMap(this.inputManager.mouseState.tile)) {
                            let mouseOverCenter =
                                this.state.gameState.occupied[
                                    this.inputManager.mouseState.tile.y
                                ][this.inputManager.mouseState.tile.x];
                            if (mouseOverCenter) {
                                mouseOver = (x === mouseOverCenter.x && y === mouseOverCenter.y);
                            }
                        }
                        let name = this.state.gameState.mapObjects[y][x].name;
                        this.context.shadowBlur = 0;
                        if (selected && this.objectOnMySide(this.state.gameState.mapObjects[y][x])) {
                            this.context.shadowBlur = 10;
                            this.context.shadowColor = 'black';
                        }
                        else if (mouseOver && this.objectOnMySide(this.state.gameState.mapObjects[y][x])) {
                            this.context.shadowBlur = 10;
                            this.context.shadowColor = 'green';
                        }
                        else if (selected || mouseOver) {
                            this.context.shadowBlur = 10;
                            this.context.shadowColor = '#a40000';
                        }

                        if (this.state.gameState.mapObjects[y][x].turnsUntilBuilt === 0) {
                            if (name in structures) {
                                this.drawImage(structures[name].image, (x * 96), (y * 111) + yOffset);
                            }
                            else if (name in units) {
                                if (this.objectOnMySide(this.state.gameState.mapObjects[y][x])) {
                                    this.drawImage(this.resourceManager.get(Resource.GREEN_OVERLAY), (x * 96), (y * 111) + yOffset);
                                }
                                else {
                                    this.drawImage(this.resourceManager.get(Resource.RED_OVERLAY), (x * 96), (y * 111) + yOffset);
                                }
                                this.drawImage(units[name].image, (x * 96), (y * 111) + yOffset);
                            }
                        }
                        else {
                            if (this.state.gameState.mapObjects[y][x].width === 0) {
                                this.drawImage(this.resourceManager.get(Resource.WIDTH_0_BUILD), (x * 96), (y * 111) + yOffset);
                            }
                            else {
                                this.drawImage(this.resourceManager.get(Resource.WIDTH_1_BUILD), (x * 96), (y * 111) + yOffset);
                            }
                        }
                        this.context.shadowBlur = 0;
                    }
                }
            }
        }

        this.state.cursorMessage = '';
        if (this.state.buildingStructure) {
            let baseObj = getBaseObject(this.state.buildingStructure);
            let surrounding = getSurrounding(this.inputManager.mouseState.tile, baseObj.width);
            for (let i = 0; i < surrounding.length; i++) {
                if (withinMap(surrounding[i])) {
                    if (this.state.allowedToBuildOrSpawn) {
                        this.state.cursorMessage = 'Build ' + this.state.buildingStructure;
                    }
                    else {
                        this.state.cursorMessage = 'Cannot build there!';
                    }
                    this.drawImage(this.resourceManager.get(
                        this.state.allowedToBuildOrSpawn ?
                            Resource.GREEN_OVERLAY : Resource.RED_OVERLAY),
                    (surrounding[i].x * 96),
                    (surrounding[i].y * 111) + (surrounding[i].x % 2) * 55);
                }
            }
        }
        else if (this.state.spawningUnit) {
            if (withinMap(this.inputManager.mouseState.tile)) {
                if (this.state.allowedToBuildOrSpawn) {
                    this.state.cursorMessage = 'Spawn ' + this.state.spawningUnit;
                }
                else {
                    this.state.cursorMessage = 'Cannot spawn there!';
                }
                this.drawImage(this.resourceManager.get(
                    this.state.allowedToBuildOrSpawn ?
                        Resource.GREEN_OVERLAY : Resource.RED_OVERLAY),
                (this.inputManager.mouseState.tile.x * 96),
                (this.inputManager.mouseState.tile.y * 111) + (this.inputManager.mouseState.tile.x % 2) * 55);
            }

            let baseObj = getBaseObject(this.state.selectedObject.name);
            let surrounding = getSurrounding(this.state.selectedObject.position,
                baseObj.width + 1);
            for (let i = 0; i < surrounding.length; i++) {
                if (withinMap(surrounding[i]) &&
                    !this.state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                    map[surrounding[i].y][surrounding[i].x].displayType != 2) {
                    this.drawImage(this.resourceManager.get(Resource.YELLOW_OVERLAY),
                        (surrounding[i].x * 96),
                        (surrounding[i].y * 111) + (surrounding[i].x % 2) * 55);
                }
            }
        }

        this.state.canCurrentUnitMoveToPosition = false;
        if (this.state.selectedObject && this.state.selectedObject.isUnit &&
            this.objectOnMySide(this.state.selectedObject) &&
            this.state.selectedObject.turnsUntilBuilt === 0) {
            /* This value is used in the calculation below, but we calculate it
             * here since we're already doing a traversal of the unitmoverange
             * array */
            let isMouseOverOnUnitMoveRange = false;
            for (let i = 0; i < this.state.unitMoveRange.length; i++) {
                if (withinMap(this.state.unitMoveRange[i]) &&
                !this.state.gameState.occupied[this.state.unitMoveRange[i].y][this.state.unitMoveRange[i].x]) {
                    this.drawImage(this.resourceManager.get(Resource.GREEN_OVERLAY),
                        (this.state.unitMoveRange[i].x * 96),
                        (this.state.unitMoveRange[i].y * 111) + (this.state.unitMoveRange[i].x % 2) * 55);
                    if (this.inputManager.mouseState.tile.equals(this.state.unitMoveRange[i])) {
                        isMouseOverOnUnitMoveRange = true;
                    }
                }
            }
            /* Draw path if mouse is down and moved over somewhere */
            if (this.inputManager.mouseState.mouseDown[LEFT_MOUSE_BUTTON]) {
                /* Since most times this path is taken, it will be when the
                 * player clicks a unit, we shortcircuit so we don't have to run
                 * the expensive pathfinding algorithm */
                if (!this.inputManager.mouseState.tile.equals(this.state.selectedObject.position) &&
                isMouseOverOnUnitMoveRange) {

                    const path = PathFinder.findPath(this.state.gameState,
                        this.state.selectedObject.position, this.inputManager.mouseState.tile);
                    path.forEach(node => {
                        this.drawImage(this.resourceManager.get(Resource.YELLOW_OVERLAY),
                            (node.x * 96),
                            (node.y * 111) + (node.x % 2) * 55);
                    });
                    this.state.canCurrentUnitMoveToPosition = true;
                    this.state.cursorMessage = 'Move Here';
                } else {
                    this.state.cursorMessage = 'Can\'t move here!';
                }
            }
        }
    }
};
