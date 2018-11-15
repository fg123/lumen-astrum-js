const { Tuple, getSurrounding } = require('../shared/coordinates');
const { Resource, tiles } = require('./resources');
const { getBaseObject, structureList, unitList, units, structures } = require('../shared/data');
const { Structure } = require('../shared/map-objects');
const { map, withinMap } = require('../shared/map');
const { UnitAttackStateChange } = require('../shared/state-change');
const PathFinder = require('../shared/path-finder');

const Utils = require('./utils');

const DRAW_PADDING = 3;
const FPS_FILTER_STRENGTH = 20;
const UNITS_BOTTOM_RIGHT_STATS = ['Health:', 'Shield:', 'Attack Damage:', 'Move Range:', 'Attack Range:', 'Sight Range'];
const STRUCTURS_BOTTOM_RIGHT_STATS = ['Health:', 'Shield:'];
const SMALL_ALERT_SHOW_TIME = 2 * 1000;

const LEFT_MOUSE_BUTTON = 1;

const MINIMAP_DISPLAY_SIZE = new Tuple(256, 144);

module.exports = class GraphicsManager {
    constructor(canvas, targetInterval, ui, camera, state, animationManager, resourceManager, inputManager) {
        console.log(map);
        this.inputManager = inputManager;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.ui = ui;
        this.camera = camera;
        this.state = state;
        this.resourceManager = resourceManager;
        this.animationManager = animationManager;

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

        /* Minimap Scaling is cached here */
        /* Each hexagon adds 3/4 width due to overlapping, with 1/4 added at
         * the end for the last hexagon */
        /* We also add 2 for extra padding */
        const entireMapWidth = 96 * (map.data[0].length + 2) + 32;
        const entireMapHeight = 111 * (map.data.length + 2);
        const widthScaleFactor = MINIMAP_DISPLAY_SIZE.x / entireMapWidth;
        const heightScaleFactor = MINIMAP_DISPLAY_SIZE.y / entireMapHeight;

        /* Constrained to the tighter one */
        this.minimapScaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

        /* We want to center minimap, either horizontally or vertically */
        if (widthScaleFactor < heightScaleFactor) {
            this.minimapOffsetToCenter = new Tuple(0,
                (MINIMAP_DISPLAY_SIZE.y - (
                    entireMapHeight * this.minimapScaleFactor)) / 2);
        }
        else {
            this.minimapOffsetToCenter = new Tuple(
                (MINIMAP_DISPLAY_SIZE.x - (
                    entireMapWidth * this.minimapScaleFactor)) / 2, 0);
        }
        this.minimapCanvas = document.createElement('canvas');
        this.minimapCanvas.width = MINIMAP_DISPLAY_SIZE.x;
        this.minimapCanvas.height = MINIMAP_DISPLAY_SIZE.y;
        const minimapContext = this.minimapCanvas.getContext('2d');
        const img = this.resourceManager.get(tiles[0]);
        this.minimapZeroPoint = new Tuple(
            this.minimapOffsetToCenter.x +
                (img.width * this.minimapScaleFactor),
            this.minimapOffsetToCenter.y +
                (img.height * this.minimapScaleFactor));
        for (let y = 0; y < map.data.length; y++) {
            for (let x = 0; x < map.data[0].length; x++) {
                if (map.data[y][x].displayType !== 0) {
                    const img = this.resourceManager.get(
                        tiles[map.data[y][x].displayType - 1]
                    );
                    minimapContext.drawImage(
                        img,
                        (x * 96 * this.minimapScaleFactor) + this.minimapZeroPoint.x,
                        ((y * 111) + ((x % 2) * 55)) * this.minimapScaleFactor + this.minimapZeroPoint.y,
                        img.width * this.minimapScaleFactor,
                        img.height * this.minimapScaleFactor
                    );
                }
            }
        }

        /* Start Graphics Loop */
        const tick = () => {
            this.drawContext.screenWidth = window.innerWidth;
            this.drawContext.screenHeight = window.innerHeight;
            this.tickCamera();
            const thisFrameTime = (this.fps.thisLoop = Date.now()) - this.fps.lastLoop;
            this.fps.frameTime += (thisFrameTime - this.fps.frameTime) / FPS_FILTER_STRENGTH;
            this.fps.lastLoop = this.fps.thisLoop;
            this.draw();
            window.requestAnimationFrame(tick);
        };
        window.requestAnimationFrame(tick);
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

    drawHealthAndShieldBar(x, y, mapObject) {
        const totalWidth = 104;
        const start = x - (totalWidth / 2);
        /* Draw black background */
        this.drawRectangle('black', start, y, totalWidth, 16);
        /* Draw Health and Shield Bars (100px x 5px each) */
        const healthPercent = mapObject.currentHealth / mapObject.maxHealth;
        this.drawRectangle('green', start + 2, y + 2, healthPercent * 100, 5);
        const shieldPercent = mapObject.currentShield / mapObject.maxShield;
        this.drawRectangle('blue', start + 2, y + 9, shieldPercent * 100, 5);
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
        this.drawMinimap(screenWidth, screenHeight);

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
            const selectedObject = this.state.selectedObject;
            const bottomLeft = this.resourceManager.get(Resource.UI_BOTTOM_LEFT);
            this.drawImage(bottomLeft, bottomLeft.width / 2,
                screenHeight - bottomLeft.height / 2);
            const clip = this.getIconClipStart(selectedObject.name);
            const baseObj = getBaseObject(selectedObject.name);

            this.context.drawImage(this.resourceManager.get(Resource.UI_ICONS),
                clip.x,
                clip.y, 48, 48, 64,
                screenHeight - bottomLeft.height + 61,
                48, 48);

            // Consider: unit vs structure, enemy vs mine, currently building vs not!
            let name = selectedObject.name;
            if (!this.objectOnMySide(selectedObject)) {
                name = 'Enemy ' + name;
            }
            this.drawText(name, 'black', 16, 88,
                screenHeight - bottomLeft.height + 43, 'center', 'bold');

            if (selectedObject.turnsUntilBuilt === 0) {
                const lineHeight = 16;
                const rightSide = [selectedObject.currentHealth + '/' + selectedObject.maxHealth,
                    selectedObject.currentShield + '/' + selectedObject.maxShield];
                const leftSide = selectedObject.isUnit ? UNITS_BOTTOM_RIGHT_STATS : STRUCTURS_BOTTOM_RIGHT_STATS;
                leftSide.forEach((val, index) => {
                    this.drawText(val, 'black', 13, 10,
                        screenHeight - bottomLeft.height + 130 + index * lineHeight, 'left', 'bold');
                });
                if (selectedObject.isUnit) {
                    // Could also use concat here but will create more garbage but will be speedier
                    Array.prototype.push.apply(rightSide, [
                        selectedObject.attackDamage,
                        selectedObject.moveRange + '/' + selectedObject.maxMoveRange,
                        selectedObject.attackRange, selectedObject.sightRange]);
                }
                rightSide.forEach((val, index) => {
                    this.drawText(val, 'black', 13, 176 - 10,
                        screenHeight - bottomLeft.height + 130 + index * lineHeight, 'right', 'bold');
                });
            }
            else {
                let t = selectedObject.turnsUntilBuilt;
                this.drawText('Constructing...(' + t + ' turn' + (t != 1 ? 's' : '') + ' left!)', 'black', 13, 88,
                    screenHeight - bottomLeft.height + 130, 'center', 'bold');
            }

            this.state.hoveredOption = null;
            /* Draw Options */
            if (this.objectOnMySide(this.state.selectedObject) &&
                this.state.selectedObject.turnsUntilBuilt === 0) {
                for (let i = 0; i < baseObj.options.length; i++) {
                    const optionIcon = baseObj.options[i].icon.slice(1, -1);
                    const clipIcon = this.getIconClipStart(optionIcon);
                    const pos = new Tuple(176 + i * 48, screenHeight - 48);
                    this.context.drawImage(
                        this.resourceManager.get(Resource.UI_ICONS),
                        clipIcon.x,
                        clipIcon.y, 48, 48, pos.x, pos.y,
                        48, 48);
                    if (baseObj.options[i].type === 'Unit') {
                        /* Check for Tier Requirement */
                        /* For Units, the optionIcon is the name */
                        const baseObj = getBaseObject(optionIcon);
                        const pos = new Tuple(176 + i * 48 + 5, screenHeight - 48 - 18);
                        const clip = new Tuple(
                            /* Clip x is based on the tier 1 - 4 */
                            (baseObj.tier - 1) * 38,
                            /* Clip y is 0 if satisfied, 18 if not */
                            // 0
                            this.state.gameState.isTierSatisfied(optionIcon,
                                this.state.side) ? 0 : 18
                        );
                        this.context.drawImage(
                            this.resourceManager.get(Resource.TIER_ICONS),
                            clip.x, clip.y, 38, 18,
                            pos.x, pos.y, 38, 18
                        );
                    }
                    // Test Mouse Over
                    if (this.inputManager.mouseState.position.x > pos.x &&
                        this.inputManager.mouseState.position.x < pos.x + 48 &&
                        this.inputManager.mouseState.position.y > pos.y &&
                        this.inputManager.mouseState.position.y < pos.y + 48 &&
                        !this.state.hoveredOption) {
                        // Show Dialog
                        const dialogPos = new Tuple(pos.x - 150 + 24, pos.y - 120);
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
        this.drawText('Camera: (' + this.camera.position.x.toFixed(2) + ', ' +
            this.camera.position.y.toFixed(2) + ', ' + this.camera.scale.toFixed(2) + ')', 'white', 15, 10,
        36, 'left', 'bold');
    }

    hasSelectedConstructionBuildingAndIsAllowed(x, y) {
        return this.state.selectedObject &&
            Structure.isConstructionBuilding(this.state.selectedObject.name) &&
            this.objectOnMySide(this.state.selectedObject) &&
            this.state.gameState.isAllowedBuilding(x, y, this.state.side);
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

    drawGlobalAnimations() {
        /* Global Animations don't have a default position, it is assumed they
         * will handle their own positions */
        this.animationManager.draw(this, Tuple.ZERO);
        this.animationManager.tick();
    }

    tickCamera() {
        this.camera.delta.x *= 0.7;
        this.camera.delta.y *= 0.7;
        if (this.ui.currentScreen !== this.ui.Screen.GAME_SCREEN) {
            let d = Utils.distance(this.camera.position, map.movement[map.movementIndex]);
            if (d < 1) {
                map.movementIndex = (map.movementIndex + 1) % map.movement.length;
                d = Utils.distance(this.camera.position, map.movement[map.movementIndex]);
            }
            const a = new Tuple(map.movement[map.movementIndex].x - this.camera.position.x,
                map.movement[map.movementIndex].y - this.camera.position.y);

            this.camera.position.x += a.x / d * 1;
            this.camera.position.y += a.y / d * 1;
        }
    }

    drawMinimap(screenWidth, screenHeight) {
        /* We grab a default tile to cache the calculation */
        this.context.drawImage(this.minimapCanvas, screenWidth - 266, screenHeight - 154);

        const zeroPoint = new Tuple(screenWidth - 266 + this.minimapZeroPoint.x,
            screenHeight - 154 + this.minimapZeroPoint.y);
        /* Draw Rectangle */
        let centerPointX, centerPointY, rectWidth, rectHeight, left, top;
        const calculate = () => {
            centerPointX = this.camera.position.x * this.minimapScaleFactor;
            centerPointY = this.camera.position.y * this.minimapScaleFactor;
            rectWidth = screenWidth * this.minimapScaleFactor / this.camera.scale;
            rectHeight = screenHeight * this.minimapScaleFactor / this.camera.scale;
            left = zeroPoint.x + centerPointX - rectWidth / 2;
            top = zeroPoint.y + centerPointY - rectHeight / 2;
        };

        const inverse = () => {
            this.camera.position.x = (left - zeroPoint.x + (rectWidth / 2)) / this.minimapScaleFactor;
            this.camera.position.y = (top - zeroPoint.y + (rectHeight / 2)) / this.minimapScaleFactor;
            const xConstraint = screenWidth * this.minimapScaleFactor / rectWidth;
            const yConstraint = screenHeight * this.minimapScaleFactor / rectHeight;
            this.camera.scale = Math.max(xConstraint, yConstraint);
        };
        calculate();
        if (this.inputManager.mouseState.position.x > screenWidth - MINIMAP_DISPLAY_SIZE.x - 10 &&
            this.inputManager.mouseState.position.x < screenWidth - 10 &&
            this.inputManager.mouseState.position.y > screenHeight - MINIMAP_DISPLAY_SIZE.y - 10 &&
            this.inputManager.mouseState.position.y < screenHeight - 10 &&
            this.inputManager.mouseState.mouseDown[LEFT_MOUSE_BUTTON]) {
            left = this.inputManager.mouseState.position.x - rectWidth / 2;
            top = this.inputManager.mouseState.position.y - rectHeight / 2;
        }
        left += this.minimapScaleFactor * this.camera.delta.x;
        top += this.minimapScaleFactor * this.camera.delta.y;

        const change = this.inputManager.mouseState.scrollDelta.y * -6;
        if (change !== 0) {
            rectWidth += change;
            rectHeight += change;
            left -= change / 2;
            top -= change / 2;
        }
        this.inputManager.mouseState.scrollDelta.x *= 0.7;
        this.inputManager.mouseState.scrollDelta.y *= 0.7;

        if (rectWidth > MINIMAP_DISPLAY_SIZE.x) {
            rectWidth = MINIMAP_DISPLAY_SIZE.x;
        }

        if (rectWidth < screenWidth * this.minimapScaleFactor) {
            rectWidth = screenWidth * this.minimapScaleFactor;
            left += change / 2;
        }

        if (rectHeight > MINIMAP_DISPLAY_SIZE.y) {
            rectHeight = MINIMAP_DISPLAY_SIZE.y;
        }

        if (rectHeight < screenHeight * this.minimapScaleFactor) {
            rectHeight = screenHeight * this.minimapScaleFactor;
            top += change / 2;
        }

        if (left < screenWidth - MINIMAP_DISPLAY_SIZE.x - 10) {
            left = screenWidth - MINIMAP_DISPLAY_SIZE.x - 10;
        }

        if (top < screenHeight - MINIMAP_DISPLAY_SIZE.y - 10) {
            top = screenHeight - MINIMAP_DISPLAY_SIZE.y - 10;
        }

        if (left + rectWidth > screenWidth - 10) {
            left = screenWidth - 10 - rectWidth;
        }

        if (top + rectHeight > screenHeight - 10) {
            top = screenHeight - 10 - rectHeight;
        }
        inverse();
        calculate();
        this.context.strokeStyle = 'white';
        this.context.lineWidth = '1.5';
        this.context.rect(left, top, rectWidth, rectHeight);
        this.context.stroke();
    }

    drawMap() {
        for (let y = Math.max(0, this.drawContext.topLeftVisible.y);
            y < Math.min(map.data.length, this.drawContext.bottomRightVisible.y); y++) {
            for (let x = Math.max(0, this.drawContext.topLeftVisible.x);
                x < Math.min(map.data[0].length, this.drawContext.bottomRightVisible.x); x++) {
                if (map.data[y][x].displayType != 0) {
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
                        tiles[map.data[y][x].displayType - 1]
                    ), (x * 96), (y * 111) + yOffset);

                    this.context.globalCompositeOperation = 'source-over';
                    if (this.ui.currentScreen === this.ui.Screen.GAME_SCREEN) {
                        if (!this.state.gameState.isVisible(x, y, this.state.side)) {
                            this.drawImage(this.resourceManager.get(Resource.FOG_OF_WAR),
                                (x * 96),
                                (y * 111) + yOffset);
                        }
                    }
                    if (this.ui.currentScreen === this.ui.Screen.GAME_SCREEN &&
                        this.state.gameState.mapObjects[y][x]) {
                        const mapObject = this.state.gameState.mapObjects[y][x];
                        const animationManager =
                            mapObject.animationManager;

                        let name = mapObject.name;
                        let actualDrawnPosition = new Tuple(
                            (x * 96), (y * 111) + yOffset
                        );
                        if (animationManager.hasAnimation()) {
                            const possiblePositionChange =
                                animationManager.draw(this, actualDrawnPosition);
                            if (possiblePositionChange) {
                                /* No animation drew! */
                                if (name in structures) {
                                    this.drawImage(structures[name].image,
                                        possiblePositionChange.x, possiblePositionChange.y);
                                }
                                else if (name in units) {
                                    this.drawImage(units[name].image,
                                        possiblePositionChange.x, possiblePositionChange.y);
                                }
                                actualDrawnPosition = possiblePositionChange;
                            }
                            animationManager.tick();
                        }
                        else {
                            let selected = mapObject === this.state.selectedObject;
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
                            // this.context.shadowBlur = 0;
                            // if (selected && this.objectOnMySide(this.state.gameState.mapObjects[y][x])) {
                            //     this.context.shadowBlur = 10;
                            //     this.context.shadowColor = 'black';
                            // }
                            // else if (mouseOver && this.objectOnMySide(this.state.gameState.mapObjects[y][x])) {
                            //     this.context.shadowBlur = 10;
                            //     this.context.shadowColor = 'green';
                            // }
                            // else if (selected || mouseOver) {
                            //     this.context.shadowBlur = 10;
                            //     this.context.shadowColor = '#a40000';
                            // }

                            if (mapObject.turnsUntilBuilt === 0) {
                                if (name in structures) {
                                    this.drawImage(structures[name].image, (x * 96), (y * 111) + yOffset);
                                }
                                else if (name in units) {
                                    if (this.objectOnMySide(mapObject)) {
                                        this.drawImage(this.resourceManager.get(Resource.GREEN_OVERLAY), (x * 96), (y * 111) + yOffset);
                                    }
                                    else {
                                        this.drawImage(this.resourceManager.get(Resource.RED_OVERLAY), (x * 96), (y * 111) + yOffset);
                                    }
                                    this.drawImage(units[name].image, (x * 96), (y * 111) + yOffset);
                                }
                            }
                            else {
                                if (mapObject.width === 0) {
                                    this.drawImage(this.resourceManager.get(Resource.WIDTH_0_BUILD), (x * 96), (y * 111) + yOffset);
                                }
                                else {
                                    this.drawImage(this.resourceManager.get(Resource.WIDTH_1_BUILD), (x * 96), (y * 111) + yOffset);
                                }
                            }
                            // this.context.shadowBlur = 0;
                        }

                        /* Hide whatever portion should not be visible */
                        let allVisible = true;
                        const surrounding = getSurrounding(mapObject.position, mapObject.width);
                        for (let i = 0; i < surrounding.length; i++) {
                            /* Every node here must be withinMap for mapObject
                             * to have been constructed */
                            if (!this.state.gameState.isVisible(
                                surrounding[i].x,
                                surrounding[i].y,
                                this.state.side
                            )) {
                                this.drawImage(this.resourceManager.get(Resource.FOG_OF_WAR),
                                    (surrounding[i].x * 96),
                                    (surrounding[i].y * 111) + ((surrounding[i].x % 2) * 55));
                                allVisible = false;
                            }
                        }
                        if (allVisible) {
                            this.drawHealthAndShieldBar(
                                actualDrawnPosition.x,
                                actualDrawnPosition.y - 24 - ((mapObject.width + 0.5) * 111),
                                mapObject
                            );
                        }
                    }
                }
            }
        }

        this.drawGlobalAnimations();

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
                    map.data[surrounding[i].y][surrounding[i].x].displayType != 2) {
                    this.drawImage(this.resourceManager.get(Resource.YELLOW_OVERLAY),
                        (surrounding[i].x * 96),
                        (surrounding[i].y * 111) + (surrounding[i].x % 2) * 55);
                }
            }
        }

        this.state.canCurrentUnitMoveToPosition = false;
        this.state.canCurrentUnitAttackPosition = false;
        if (this.state.selectedObject && this.state.selectedObject.isUnit &&
            this.objectOnMySide(this.state.selectedObject) &&
            this.state.selectedObject.turnsUntilBuilt === 0) {
            /* This value is used in the calculation below, but we calculate it
             * here since we're already doing a traversal of the unitmoverange
             * array */
            if (this.state.isMyTurn()) {
                if (this.inputManager.mouseState.mouseDown[LEFT_MOUSE_BUTTON]) {
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
                    /* Since most times this path is taken, it will be when the
                    * player clicks a unit, we shortcircuit so we don't have to run
                    * the expensive pathfinding algorithm */
                    if (!this.inputManager.mouseState.tile.equals(
                        this.state.selectedObject.position
                    ) && isMouseOverOnUnitMoveRange) {
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
                else {
                    let isMouseOverAttackRange = false;
                    for (let i = 0; i < this.state.unitAttackRange.length; i++) {
                        if (withinMap(this.state.unitAttackRange[i]) &&
                        !this.state.gameState.occupied[this.state.unitAttackRange[i].y][this.state.unitAttackRange[i].x]) {
                            this.drawImage(this.resourceManager.get(Resource.RED_OVERLAY),
                                (this.state.unitAttackRange[i].x * 96),
                                (this.state.unitAttackRange[i].y * 111) + (this.state.unitAttackRange[i].x % 2) * 55);
                        }
                        if (this.inputManager.mouseState.tile.equals(this.state.unitAttackRange[i])) {
                            isMouseOverAttackRange = true;
                        }
                    }
                    if (isMouseOverAttackRange) {
                        this.state.canCurrentUnitAttackPosition = UnitAttackStateChange.create(
                            this.state.side,
                            this.state.selectedObject.position,
                            this.inputManager.mouseState.tile
                        ).verifyStateChange(this.state.gameState);
                        if (this.state.canCurrentUnitAttackPosition) {
                            this.state.cursorMessage = `Attack for ${this.state.selectedObject.attackDamage} Damage`;
                        }
                        if (this.state.selectedObject.attacksThisTurn === 0) {
                            this.state.cursorMessage = 'Already attacked!';
                        }
                    }
                }
            }
        }
    }
};
