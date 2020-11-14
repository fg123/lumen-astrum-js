const { Tuple, getSurrounding } = require('../../shared/coordinates');
const { Resource, tiles } = require('../resources');
const { getBaseObject, structureList, unitList, units, structures } = require('../../shared/data');
const { Structure } = require('../../shared/map-objects');
const { map } = require('../../shared/map');
const { UnitAttackStateChange } = require('../../shared/state-change');
const { toDrawCoord, roundToNearest, toRectanglePerimeter } = require('../utils');
const PathFinder = require('../../shared/path-finder');
const Constants = require('../../shared/constants');

const DRAW_PADDING = 3;
const FPS_FILTER_STRENGTH = 20;
const UNITS_BOTTOM_RIGHT_STATS = ['Health:', 'Attack Damage:', 'Attack Speed:', 'Move Range:', 'Attack Range:', 'Sight Range'];
const STRUCTURS_BOTTOM_RIGHT_STATS = ['Health:'];
const SMALL_ALERT_SHOW_TIME = 2 * 1000;

const LEFT_MOUSE_BUTTON = 1;

module.exports = class MapCanvas {
    constructor(canvas, targetInterval, ui, camera, state, animationManager, resourceManager, inputManager) {
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

        this.postDrawHooks = [];
        /* Start Graphics Loop */
        const tick = () => {
            this.drawContext.screenWidth = window.innerWidth;
            this.drawContext.screenHeight = window.innerHeight;
            const thisFrameTime = (this.fps.thisLoop = Date.now()) - this.fps.lastLoop;
            this.fps.frameTime += (thisFrameTime - this.fps.frameTime) / FPS_FILTER_STRENGTH;
            this.fps.lastLoop = this.fps.thisLoop;
            this.state.cursorMessage = '';
            this.draw();
            window.requestAnimationFrame(tick);
        };
        tick();

        /* Start Animation Tick Loop */
        window.setInterval(() => {
            if (this.state.gameState) {
                if (this.animationManager) {
                    this.animationManager.tick();
                }
                this.state.gameState.units.forEach(u => {
                    if (u.animationManager.hasAnimation()) {
                        u.animationManager.tick();
                    }
                });
                this.state.gameState.structures.forEach(s => {
                    if (s.animationManager.hasAnimation()) {
                        s.animationManager.tick();
                    }
                });
            }
        }, 1000 / 60);

        // Base Animatino Tick Loop
        window.setInterval(() => {
            if (this.state.gameState) {
                this.state.gameState.units.forEach(u => {
                    if (u.baseAnimation) {
                        u.baseAnimation.tick(this.resourceManager);
                    }
                });
                // this.state.gameState.structures.forEach(s => {
                //     if (s.baseAnimation) {
                //         s.baseAnimation.tick();
                //     }
                // });
            }
        }, 1000 / 60);
    }

    draw() {
        this.canvas.width = this.drawContext.screenWidth;
        this.canvas.height = this.drawContext.screenHeight;
        this.drawContext.topLeftVisible = this.camera.toWorldCoord(Tuple.ZERO).toTileCoord();
        this.drawContext.bottomRightVisible = this.camera.toWorldCoord(new Tuple(this.drawContext.screenWidth,
            this.drawContext.screenHeight)).toTileCoord();

        this.drawContext.topLeftVisible.x -= DRAW_PADDING;
        this.drawContext.topLeftVisible.y -= DRAW_PADDING;
        this.drawContext.bottomRightVisible.x += DRAW_PADDING;
        this.drawContext.bottomRightVisible.y += DRAW_PADDING;
        this.drawState(this.drawContext.screenWidth, this.drawContext.screenHeight);
        if (this.ui.currentScreen === this.ui.Screen.GAME) {
            this.drawUI(this.drawContext.screenWidth, this.drawContext.screenHeight);
        }
    }

    interpolateTowards(current, desired) {
        return current + 0.3 * (desired - current);
    }

    drawHealthAndShieldBar(x, y, mapObject) {
        const totalWidth = 104;
        const start = x - (totalWidth / 2);
        /* Draw black background */
        this.drawRectangle('black', start, y, totalWidth, 16);
        
        // Tick / transition health
        if (!mapObject.clientHealth) {
            mapObject.clientHealth = mapObject.currentHealth;
        }
        const desiredHealth = mapObject.currentHealth;
        const currentHealth = mapObject.clientHealth;
        mapObject.clientHealth = this.interpolateTowards(currentHealth, desiredHealth);

        /* Draw Health Bars (100px x 5px each) */
        const maxHealth = mapObject.maxHealth;
        const healthPercent = currentHealth / maxHealth;
        let healthColor = 'red';
        if (this.objectIsMyTeam(mapObject)) {
            healthColor = this.objectIsMine(mapObject) ? 'green' : 'green';
        }
        else if (this.objectIsNeutral(mapObject)) {
            healthColor = 'dodgerblue';
        }
        this.drawRectangle(healthColor, start + 2, y + 2, healthPercent * 100, 6);

        let smallTickIncrement = (maxHealth > 10000 ? 1000 : (maxHealth > 2000 ? 500 : 100));
        let ten = smallTickIncrement;
        while (ten < maxHealth) {
            const height = ten % 1000 === 0 ? 6 : 3;
            const width = 1;
            this.drawRectangle('black', start + 2 + ((ten / maxHealth) * 100), y + 2, width, height);
            ten += smallTickIncrement;
        }
        
        // Use shield to show how much longer stun is. &and also out of combat
        if (mapObject.modifiers && mapObject.isUnit) {
            const shieldPercent = mapObject.getStunnedTime(this.state.gameState) / mapObject.getStunnedTotalTime();
            this.drawRectangle('blue', start + 2, y + 9, shieldPercent * 100, 5);
            
        }
        if (!Constants.IS_PRODUCTION && mapObject.isUnit) {
            if (mapObject.outOfCombatTime > this.state.gameState.getGameTime()) {
                const shieldPercent = (mapObject.outOfCombatTime - this.state.gameState.getGameTime()) / (Constants.OUT_OF_COMBAT_TIME * 1000);
                this.drawRectangle('purple', start + 2, y + 9, shieldPercent * 100, 5);
            }
        }
        
    }

    drawText(text, color, fontSize, x, y,
        align = 'left', fontStyle = '', maxWidth = 0,
        fontFamily = 'Prompt') {
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

    objectIsMine(mapObject) {
        return mapObject.owner === this.state.player;
    }

    objectIsMyTeam(mapObject) {
        return this.state.gameState.isTeammate(mapObject.owner, this.state.player);
    }

    objectIsNeutral(mapObject) {
        return mapObject.owner === undefined;
    }

    drawImage(img, x, y, width = -1, height = -1, angle = 0) {
        if (width === -1) width = img.width;
        if (height === -1) height = img.height;
        if (angle === 0) {
            this.context.drawImage(img, x - width / 2, y - height / 2);
        }
        else {
            this.context.translate(x, y);
            this.context.rotate(angle);
            this.context.drawImage(img, -width / 2, -height / 2, width, height);
            this.context.rotate(-angle);
            this.context.translate(-x, -y);
        }
    }

    drawRectangle(color, x, y, width, height) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    drawUI(screenWidth, screenHeight) {
        const gameMap = this.state.getMap();
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

        // Bottom Left Selected Info
        if (this.state.selectedObject) {
            const selectedObject = this.state.selectedObject;
            const bottomLeft = this.resourceManager.get(Resource.UI_BOTTOM_LEFT);
            this.drawImage(bottomLeft, bottomLeft.width / 2,
                screenHeight - bottomLeft.height / 2);
            const baseObj = getBaseObject(selectedObject.name);

            this.context.drawImage(this.resourceManager.get(selectedObject.icon),
                64, screenHeight - bottomLeft.height + 61);

            // Consider: unit vs structure, enemy vs mine, currently building vs not!
            let name = selectedObject.name;

            this.drawText(name, 'black', 16, 88,
                screenHeight - bottomLeft.height + 43, 'center', 'bold');

            if (selectedObject.turnsUntilBuilt === 0) {
                const lineHeight = 16;
                const rightSide = [{
                    text: selectedObject.currentHealth + '/' + selectedObject.maxHealth,
                    color: selectedObject.maxHealth === selectedObject.maxBaseHealth ?
                        'black' : Constants.BLUE_CHAT_COLOR
                }];
                const leftSide = selectedObject.isUnit ? UNITS_BOTTOM_RIGHT_STATS : STRUCTURS_BOTTOM_RIGHT_STATS;
                leftSide.forEach((val, index) => {
                    this.drawText(val, 'black', 13, 10,
                        screenHeight - bottomLeft.height + 130 + index * lineHeight, 'left', 'bold');
                });
                if (selectedObject.isUnit) {
                    // Could also use concat here but will create more garbage but will be speedier
                    Array.prototype.push.apply(rightSide, [
                        {
                            text: `${selectedObject.attackDamage}`,
                            color: selectedObject.attackDamage === selectedObject.baseAttackDamage ?
                                'black' : Constants.BLUE_CHAT_COLOR
                        },
                        {
                            text: `${selectedObject.attackSpeed.toFixed(2)}`,
                            color: selectedObject.attackSpeed === selectedObject.baseAttackSpeed ?
                                'black' : Constants.BLUE_CHAT_COLOR
                        },
                        {
                            text: selectedObject.moveRange + '/' + selectedObject.maxMoveRange,
                            color: selectedObject.maxMoveRange === selectedObject.maxBaseMoveRange ?
                                'black' : Constants.BLUE_CHAT_COLOR
                        },
                        selectedObject.attackRange, selectedObject.sightRange]);
                }
                rightSide.forEach((val, index) => {
                    if (typeof val === 'object') {
                        this.drawText(val.text, val.color, 13, 176 - 10,
                            screenHeight - bottomLeft.height + 130 + index * lineHeight, 'right', 'bold');
                    } else {
                        this.drawText(val, 'black', 13, 176 - 10,
                            screenHeight - bottomLeft.height + 130 + index * lineHeight, 'right', 'bold');
                    }
                });
            }
            else {
                let t = selectedObject.turnsUntilBuilt;
                this.drawText('Constructing...(' + t + ' turn' + (t != 1 ? 's' : '') + ' left!)', 'black', 13, 88,
                    screenHeight - bottomLeft.height + 130, 'center', 'bold');
            }

            /* Draw Modifiers */
            if (selectedObject.modifiers) {
                const modifierWithCount = {};
                const modifiers = Object.values(selectedObject.modifiers);
                for (let i = 0; i < modifiers.length; i++) {
                    const modifier = modifiers[i];
                    if (modifierWithCount[modifier.getDisplayName()] === undefined) {
                        modifierWithCount[modifier.getDisplayName()] = {
                            count: 0,
                            modifier: modifiers[i],
                        };
                    }
                    modifierWithCount[modifier.getDisplayName()].count += 1;
                }

                const modifierDisplays = Object.keys(modifierWithCount);
                for (let i = 0; i < modifierDisplays.length; i++) {
                    const modifier = modifierWithCount[modifierDisplays[i]].modifier;
                    const timeRemaining = modifier.getTimeRemaining(this.state.gameState);

                    const pos = new Tuple(176, screenHeight - 195 + (i * 24));
                    this.context.drawImage(
                        this.resourceManager.get(Resource.UI_ICONS),
                        modifier.getIconIndex() * 24, 144, 24, 24,
                        pos.x, pos.y,
                        24, 24);
                    this.drawText(
                        `x${modifierWithCount[modifierDisplays[i]].count}`,
                        'white', 16, pos.x + 26, pos.y + 15
                    );
                    if (modifier.duration) {
                        // Show duration indicator
                        this.context.strokeStyle = "white";
                        this.context.lineWidth = 2;
                        this.context.beginPath();
                        this.context.moveTo(pos.x + 12, pos.y);
                        this.context.lineTo(pos.x + 12, pos.y + 12);

                        const perimeter = toRectanglePerimeter({
                            width: 24,
                            height: 24
                        }, ((2 * Math.PI) * ((timeRemaining / modifier.duration))) + Math.PI / 2);
                        this.context.lineTo(pos.x + perimeter.x, pos.y + perimeter.y);
                        this.context.stroke();
                    }
                    // Test Mouse Over
                    if (this.inputManager.mouseState.position.x > pos.x &&
                        this.inputManager.mouseState.position.x < pos.x + 24 &&
                        this.inputManager.mouseState.position.y > pos.y &&
                        this.inputManager.mouseState.position.y < pos.y + 24) {
                        // Show Dialog
                        const dialogPos = new Tuple(pos.x + 50, pos.y);
                        const dialogSize = new Tuple(300, 100);
                        this.drawRectangle('rgba(0, 0, 0, 0.9)', dialogPos.x, dialogPos.y, dialogSize.x, dialogSize.y);
                        this.drawText(modifier.getDisplayName(), 'white', 16, dialogPos.x + 5, dialogPos.y + 20, 'left', 'bold');
                        if (modifier.duration) {
                            this.drawText(Math.round(timeRemaining / 1000) + 's left', Constants.YELLOW_CHAT_COLOR, 16, dialogPos.x + dialogSize.x - 5, dialogPos.y + 20, 'right', 'bold');
                        }

                        // Set Description
                        this.drawText(modifier.getDescription(this.state.gameState), 'white', 16, dialogPos.x + 5, dialogPos.y + 40, 'left', '', dialogSize.x - 10);
                    }
                }
            }

            this.state.hoveredOption = null;
            /* Draw Options */
            if (this.objectIsMine(this.state.selectedObject) &&
                this.state.selectedObject.turnsUntilBuilt === 0 &&
                !this.state.hasForfeited()) {
                for (let i = 0; i < baseObj.options.length; i++) {
                    const optionIcon = baseObj.options[i].icon;
                   
                    const pos = new Tuple(176 + i * 48, screenHeight - 48);
                    this.context.drawImage(
                        this.resourceManager.get(optionIcon), pos.x, pos.y);
                    /* Draw Hotkey */
                    const hotkeyPos = new Tuple(176 + i * 48 + 5, screenHeight - 48 - 18);
                    const clip = new Tuple(
                        0,
                        /* Clip y is 0 if satisfied, 18 if not */
                        this.state.gameState.arePrereqsSatisfied(baseObj.options[i],
                            this.state.player) ? 0 : 18
                    );
                    this.context.drawImage(
                        this.resourceManager.get(Resource.TIER_ICONS),
                        clip.x, clip.y, 38, 18,
                        hotkeyPos.x, hotkeyPos.y, 38, 18
                    );
                    this.drawText(i + 1, 'black', 14, hotkeyPos.x + 19, hotkeyPos.y + 16, 'center', 'bold');

                    // Test Mouse Over
                    if (this.inputManager.mouseState.position.x > pos.x &&
                        this.inputManager.mouseState.position.x < pos.x + 48 &&
                        this.inputManager.mouseState.position.y > pos.y &&
                        this.inputManager.mouseState.position.y < pos.y + 48 &&
                        !this.state.hoveredOption) {
                        // Show Dialog
                        const dialogPos = new Tuple(pos.x - 150 + 24, pos.y - 125);
                        const dialogSize = new Tuple(300, 100);
                        this.drawRectangle('rgba(0, 0, 0, 0.9)', dialogPos.x, dialogPos.y, dialogSize.x, dialogSize.y);
                        this.drawText(baseObj.options[i].title, 'white', 16, dialogPos.x + 5, dialogPos.y + 20, 'left', 'bold');
                        this.drawText('Ø' + baseObj.options[i].cost, Constants.YELLOW_CHAT_COLOR, 16, dialogPos.x + dialogSize.x - 5, dialogPos.y + 20, 'right', 'bold');

                        // Set Description
                        let desc = baseObj.options[i].description;
                        if (desc[0] === '{') {
                            // Pull from Unit / Structure source
                            const descSrc = desc.slice(1, -1);
                            desc = descSrc in structures ? structures[descSrc].description : units[descSrc].description;
                        }
                        this.drawText(desc, 'white', 16, dialogPos.x + 5, dialogPos.y + 40, 'left', '', dialogSize.x - 10);
                        this.state.hoveredOption = baseObj.options[i];
                    }
                }
            }
        }

        this.drawText(parseInt(1000 / this.fps.frameTime) + ' fps', 'white', 16, 10, 20, 'left', 'bold');
        if (!Constants.IS_PRODUCTION) {
            this.drawText('Camera: (' + this.camera.position.x.toFixed(2) + ', ' +
                this.camera.position.y.toFixed(2) + ', ' + this.camera.scale.toFixed(2) + ')', 'white', 16, 10,
            40, 'left', 'bold');
            this.drawText('Minimap Rect: (' + this.camera.minimapRectPosition.x.toFixed(2) + ', ' +
                this.camera.minimapRectPosition.y.toFixed(2) + ', ' +
                this.camera.minimapRectSize.x.toFixed(2) + ', ' +
                this.camera.minimapRectSize.y.toFixed(2) + ')', 'white', 16, 10,
            60, 'left', 'bold');
            const hover = this.inputManager.mouseState.tile;
            if (gameMap.withinMap(hover)) {
                const tile = gameMap.data[hover.y][hover.x];
                this.drawText(`Hover: (${hover.x}, ${hover.y})`, 'white', 16, 10, 80, 'left', 'bold');
                this.drawText(`   displayType: ${tile.displayType}`, 'white', 16, 10, 100, 'left', 'bold');
                this.drawText(`   isHighGround: ${tile.isHighGround}`, 'white', 16, 10, 120, 'left', 'bold');
                this.drawText(`   highGroundGroup: ${tile.highGroundGroup}`, 'white', 16, 10, 140, 'left', 'bold');
                this.drawText(`   jungleDist: ${tile.jungleDist}`, 'white', 16, 10, 160, 'left', 'bold');
            }
        }
    }

    hasSelectedConstructionBuildingAndIsAllowed(x, y) {
        // For Redesign, building range is the territorial range
        /*this.state.selectedObject &&
            Structure.isConstructionBuilding(this.state.selectedObject.name) &&
            this.objectIsMine(this.state.selectedObject) && */
        return this.state.gameState && this.state.gameState.isAllowedBuilding(x, y, this.state.player);
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
        for (let i = 0; i < this.postDrawHooks.length; i++) {   
            this.postDrawHooks[i](this.context);
        }
        this.context.restore();
    }

    drawGlobalAnimations() {
        /* Global Animations don't have a default position, it is assumed they
         * will handle their own positions */
        this.animationManager.draw(this, this.state, Tuple.ZERO);
    }

    calculateRotation(position) {
        const input = this.camera.toWorldCoord(this.inputManager.mouseState.position);
        const result = Math.atan2(input.y - position.y, input.x - position.x) + (Math.PI / 2);
        return result; // roundToNearest(result, Math.PI / 3);
    }

    drawArrow(from, to, headLength, thickness, color) {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const angle = Math.atan2(dy, dx);
        this.context.strokeStyle = color;
        this.context.lineWidth = thickness;
        this.context.beginPath();
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.moveTo(to.x, to.y);
        this.context.lineTo(to.x - headLength * Math.cos(angle - Math.PI / 6),
            to.y - headLength * Math.sin(angle - Math.PI / 6));
        this.context.moveTo(to.x, to.y);
        this.context.lineTo(to.x - headLength * Math.cos(angle + Math.PI / 6),
            to.y - headLength * Math.sin(angle + Math.PI / 6));
        this.context.stroke();
    }

    drawMap() {
        const gameMap = this.state.getMap();
        const healthbarsToDraw = [];
        const desiredPathsToDraw = [];
        for (let y = Math.max(0, this.drawContext.topLeftVisible.y);
            y < Math.min(gameMap.data.length, this.drawContext.bottomRightVisible.y); y++) {
            for (let x = Math.max(0, this.drawContext.topLeftVisible.x);
                x < Math.min(gameMap.data[0].length, this.drawContext.bottomRightVisible.x); x++) {
                this.context.globalAlpha = 1;
                if (gameMap.data[y][x].displayType !== 0) {
                    const drawCoord = toDrawCoord(x, y);
                    if (this.ui.currentScreen !== this.ui.Screen.GAME ||
                        this.state.gameState.isVisible(x, y, this.state.player)) {
                        this.context.globalCompositeOperation = 'destination-over';
                        // Overlays
                        // Drawn first because of Destination Over
                        if (this.hasSelectedConstructionBuildingAndIsAllowed(x, y)) {
                            this.drawImage(this.resourceManager.get(Resource.BLUE_OVERLAY),
                                drawCoord.x, drawCoord.y);
                        } else if (this.state.gameState) {
                            const isEnemyBuildingRange = this.state.gameState.isEnemyBuildingRange(x, y, this.state.player);
                            if (isEnemyBuildingRange) {
                                this.drawImage(this.state.getEnemyOverlay(isEnemyBuildingRange),
                                    drawCoord.x, drawCoord.y);
                            }
                        }

                        this.drawImage(this.resourceManager.get(
                            tiles[gameMap.data[y][x].displayType - 1]
                        ), drawCoord.x, drawCoord.y);

                        this.context.globalCompositeOperation = 'source-over';
                    }
                    else {
                        this.drawImage(this.resourceManager.get(
                            tiles[gameMap.data[y][x].displayType - 1]
                        ), drawCoord.x, drawCoord.y);
                        this.drawImage(this.resourceManager.get(Resource.FOG_OF_WAR),
                            drawCoord.x, drawCoord.y);
                    }
                    if (this.ui.currentScreen === this.ui.Screen.GAME &&
                        this.state.gameState.mapObjects[y][x] && 
                        this.state.gameState.mapObjects[y][x].currentHealth > 0) {
                        const mapObject = this.state.gameState.mapObjects[y][x];
                        const animationManager =
                            mapObject.animationManager;

                        let actualDrawnPosition = drawCoord;

                        /* Hide whatever portion should not be visible */
                        let allVisible = true;
                        let anyVisible = false;
                        const surrounding = getSurrounding(mapObject.position, mapObject.width);
                        if (mapObject.owner === undefined) {
                            anyVisible = true;
                        }
                        
                        for (let i = 0; i < surrounding.length; i++) {
                            /* Every node here must be withinMap for mapObject
                            * to have been constructed */
                            if (!this.state.gameState.isVisible(
                                surrounding[i].x,
                                surrounding[i].y,
                                this.state.player
                            )) {
                                allVisible = false;
                            } else {
                                anyVisible = true;
                            }
                        }

                        const unitStealthed = mapObject.isUnit &&
                            mapObject.isStealthed(this.state.player,
                                this.state.gameState);
                        if (unitStealthed) {
                            allVisible = false;
                            this.context.globalAlpha = 0.5;
                        }

                        // Desired Rotation
                        const desiredRotation = mapObject.rotation;
                        if (!mapObject.clientRotation) {
                            mapObject.clientRotation = mapObject.rotation;
                        }
                        const currentRotation = mapObject.clientRotation;
                        mapObject.clientRotation = this.interpolateTowards(currentRotation, desiredRotation);

                        if (animationManager.hasAnimation()) {
                            // Draw any animations in the animation stack
                            const possiblePositionChange =
                                animationManager.draw(this, this.state, actualDrawnPosition);
                            if (possiblePositionChange) {
                                /* No animation drew! */
                                if (anyVisible) {
                                    this.drawImage(this.resourceManager.get(mapObject.texture),
                                        possiblePositionChange.x, possiblePositionChange.y,
                                        -1, -1, currentRotation);
                                }
                                actualDrawnPosition = possiblePositionChange;
                            }
                        }
                        else if (anyVisible) {
                            if (mapObject.turnsUntilBuilt === 0) {
                                if (mapObject.isStructure) {
                                    // Draw Structure
                                    this.drawImage(this.resourceManager.get(mapObject.texture), drawCoord.x, drawCoord.y);
                                }
                                else if (mapObject.isUnit) {
                                    // Draw Unit
                                    if (this.objectIsMine(mapObject)) {
                                        this.drawImage(this.resourceManager.get(Resource.GREEN_OVERLAY), drawCoord.x, drawCoord.y);
                                    }
                                    else {
                                        this.drawImage(this.state.getEnemyOverlay(mapObject.owner), drawCoord.x, drawCoord.y);
                                    }
                                    if (mapObject.baseAnimation) {
                                        this.context.translate(drawCoord.x, drawCoord.y);
                                        this.context.rotate(currentRotation);                                        
                                        mapObject.baseAnimation.draw(this.resourceManager, this.context);
                                        this.context.rotate(-currentRotation);
                                        this.context.translate(-drawCoord.x, -drawCoord.y);
                                        
                                    }
                                    else {
                                        this.drawImage(this.resourceManager.get(mapObject.texture), drawCoord.x, drawCoord.y,
                                            -1, -1, currentRotation);
                                    }
                                }
                            }
                            else {
                                if (mapObject.width === 0) {
                                    this.drawImage(this.resourceManager.get(Resource.WIDTH_0_BUILD), drawCoord.x, drawCoord.y);
                                    this.drawText(mapObject.turnsUntilBuilt, 'black', 48, drawCoord.x, drawCoord.y + 15, 'center', 'bold');
                                }
                                else {
                                    this.drawImage(this.resourceManager.get(Resource.WIDTH_1_BUILD), drawCoord.x, drawCoord.y);
                                    this.drawText(mapObject.turnsUntilBuilt, 'black', 48, drawCoord.x, drawCoord.y + 15, 'center', 'bold');
                                }
                            }
                            // this.context.shadowBlur = 0;
                        }
                        
                        if (mapObject.isUnit && mapObject.turnsUntilBuilt === 0 &&
                            this.state.gameState.isTeammate(mapObject.owner, this.state.player)) {
                            // Draw Unit desired path
                            let lastDrawn = toDrawCoord(mapObject.position);
                            for (let i = 0; i < mapObject.targetPoints.length; i++) {
                                desiredPathsToDraw.push({
                                    from: lastDrawn,
                                    to: toDrawCoord(mapObject.targetPoints[i]),
                                    color: mapObject.owner === this.state.player ? 'green' : 'green'
                                });
                                lastDrawn = toDrawCoord(mapObject.targetPoints[i]);
                            }
                        }
                        // Now we hide any bits of a building that isn't supposed to be
                        // showing
                        for (let i = 0; i < surrounding.length; i++) {
                            if (!this.state.gameState.isVisible(
                                surrounding[i].x,
                                surrounding[i].y,
                                this.state.player
                            )) {
                                const drawnCoord = toDrawCoord(surrounding[i]);
                                if (mapObject.owner !== undefined) {
                                    this.drawImage(this.resourceManager.get(
                                        tiles[gameMap.data[surrounding[i].y][surrounding[i].x].displayType - 1]
                                    ), drawnCoord.x, drawnCoord.y);
                                }
                                this.drawImage(this.resourceManager.get(Resource.FOG_OF_WAR),
                                    drawnCoord.x, drawnCoord.y);
                            }
                        }

                        if (allVisible) {
                            healthbarsToDraw.push({
                                x: actualDrawnPosition.x,
                                y: actualDrawnPosition.y - 24 -
                                    ((mapObject.width + 0.5) * Constants.MAP_TILE_DRAW_Y_MULTIPLIER),
                                mapObject
                            });
                        }
                    }
                }
            }
        }
        
        if (this.state.gameState) {
            const outposts = this.state.gameState.players[this.state.player].deploymentOutpostCache;
            for (let i = 0; i < outposts.length; i++) {
                const surrounding = getSurrounding(outposts[i].position, 1);
                for (let j = 0; j < surrounding.length; j++) {
                    const coord = toDrawCoord(surrounding[j].x, surrounding[j].y);
                    if (!this.state.gameState.isOccupied(surrounding[j].x, surrounding[j].y) &&
                        this.state.gameState.isAllowedBuilding(surrounding[j].x, surrounding[j].y, this.state.player)) {
                        this.drawImage(this.resourceManager.get(Resource.GREEN_OVERLAY),
                            coord.x, coord.y);
                    }
                }
            }
            this.drawGlobalAnimations();
        }

        if (this.state.pendingAction) {
            this.state.pendingAction.onTick(this.state, this);
        }

        this.state.canCurrentUnitMoveToPosition = false;
        this.state.canCurrentUnitAttackPosition = false;
        if (this.state.selectedObject && this.state.selectedObject.isUnit &&
            this.objectIsMine(this.state.selectedObject) &&
            this.state.selectedObject.turnsUntilBuilt === 0) {
            /* This value is used in the calculation below, but we calculate it
             * here since we're already doing a traversal of the unitmoverange
             * array */
            if (this.state.gameState.phase === Constants.PHASE_PLANNING) {
                if (this.state.movementMode) {
                    let isMouseOverOnUnitMoveRange = false;
                    for (let i = 0; i < this.state.unitMoveRange.length; i++) {
                        if (gameMap.withinMap(this.state.unitMoveRange[i]) &&
                        !this.state.gameState.occupied[this.state.unitMoveRange[i].y][this.state.unitMoveRange[i].x]) {
                            const drawnCoord = toDrawCoord(this.state.unitMoveRange[i]);
                            this.drawImage(this.resourceManager.get(Resource.GREEN_OVERLAY),
                                drawnCoord.x, drawnCoord.y);
                            if (this.inputManager.mouseState.tile.equals(this.state.unitMoveRange[i])) {
                                isMouseOverOnUnitMoveRange = true;
                            }
                        }
                    }
                    /* Since most times this path is taken, it will be when the
                    * player clicks a unit, we shortcircuit so we don't have to run
                    * the expensive pathfinding algorithm */
                    // if (!this.inputManager.mouseState.tile.equals(
                    //     this.state.selectedObject.position
                    // ) && isMouseOverOnUnitMoveRange) {
                    //     // const path = PathFinder.findPath(this.state.gameState,
                    //     //     this.state.selectedObject.position, this.inputManager.mouseState.tile);
                    //     // path.forEach(node => {
                    //     //     const drawn = toDrawCoord(node);
                    //     //     this.drawImage(this.resourceManager.get(Resource.YELLOW_OVERLAY),
                    //     //         drawn.x, drawn.y);
                    //     // });
                    //     this.state.canCurrentUnitMoveToPosition = true;
                    //     this.state.cursorMessage = 'Move Here';
                    // } else {
                    const targetPoints = this.state.selectedObject.targetPoints;
                    let lastTarget = this.state.selectedObject.position;
                    if (targetPoints.length > 0 && !this.state.justEnteredMovementMode) {
                        lastTarget = targetPoints[targetPoints.length - 1];
                    }
                    const mousePoint = toDrawCoord(this.inputManager.mouseState.tile);
                    this.drawArrow(toDrawCoord(lastTarget), mousePoint, 15, 3, 'green')
                    this.state.cursorMessage = 'Set Target Here';
                    // }
                }
            }
        }
        // Since we have limited movement range, let's draw points towards
        //   where we want to go based on movement range
        for (let j = 0; j < desiredPathsToDraw.length; j++) {
            const obj = desiredPathsToDraw[j];
            if (!(obj.from.x === obj.to.x && obj.from.y === obj.to.y)) {
                this.drawArrow(obj.from, obj.to, 15, 3, obj.color);
            }
        }
        
        healthbarsToDraw.forEach(healthbar => {
            this.drawHealthAndShieldBar(
                healthbar.x,
                healthbar.y,
                healthbar.mapObject
            );
        });
    }
};
