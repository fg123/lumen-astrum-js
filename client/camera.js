const { Tuple } = require('../shared/coordinates');
const { map } = require('../shared/map');
const Utils = require('./utils');
const { tiles, Resource } = require('./resources');
const Constants = require('../shared/constants');

/* The camera manages the minimap rectangle as well as itself. */

const MINIMAP_DISPLAY_SIZE = new Tuple(256, 144);

const LEFT_MOUSE_BUTTON = 1;

const INTERNAL_TICK_INTERVAL = 16;

module.exports = class Camera {
    constructor(resourceManager, ui, inputManager) {
        this.resourceManager = resourceManager;
        this.ui = ui;
        this.inputManager = inputManager;
        this.state = undefined;

        this._position = new Tuple(0, 0);
        this.delta = new Tuple(0, 0);
        this.scale = 1;

        this.fowCanvasTick = 0;

        /* This allows map drawing operations to only iterate through visible
         * map tiles */
        this.topLeftVisible = new Tuple(0, 0);
        this.bottomRightVisible = new Tuple(0, 0);

        this.minimapRectPosition = new Tuple(0, 0);
        this.minimapRectSize = new Tuple(0, 0);

        /* Minimap Scaling is cached here */
        /* Each hexagon adds 3/4 width due to overlapping, with 1/4 added at
         * the end for the last hexagon */
        /* We also add 2 for extra padding */
        const entireMapWidth = Constants.MAP_TILE_DRAW_X_MULTIPLIER * (map.data[0].length + 2) + (Constants.MAP_TILE_DRAW_X_MULTIPLIER / 3);
        const entireMapHeight = Constants.MAP_TILE_DRAW_Y_MULTIPLIER * (map.data.length + 2);
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
        const img = this.resourceManager.get(tiles[0]);
        this.minimapZeroPoint = new Tuple(
            this.minimapOffsetToCenter.x +
                (img.width * this.minimapScaleFactor),
            this.minimapOffsetToCenter.y +
                (img.height * this.minimapScaleFactor));
        this.minimapCanvas = document.createElement('canvas');
        this.minimapCanvas.width = MINIMAP_DISPLAY_SIZE.x;
        this.minimapCanvas.height = MINIMAP_DISPLAY_SIZE.y;

        this.minimapFOWCanvas = document.createElement('canvas');
        this.minimapFOWCanvas.width = MINIMAP_DISPLAY_SIZE.x;
        this.minimapFOWCanvas.height = MINIMAP_DISPLAY_SIZE.y;

        const minimapContext = this.minimapCanvas.getContext('2d');
        for (let y = 0; y < map.data.length; y++) {
            for (let x = 0; x < map.data[0].length; x++) {
                if (map.data[y][x].displayType !== 0) {
                    const img = this.resourceManager.get(
                        tiles[map.data[y][x].displayType - 1]
                    );
                    const coord = Utils.toDrawCoord(x, y);
                    minimapContext.drawImage(
                        img,
                        (coord.x * this.minimapScaleFactor) + this.minimapZeroPoint.x,
                        coord.y * this.minimapScaleFactor + this.minimapZeroPoint.y,
                        img.width * this.minimapScaleFactor,
                        img.height * this.minimapScaleFactor
                    );
                }
            }
        }
        this.tick = window.setInterval(() => {
            this.tickCamera(window.innerWidth, window.innerHeight);
            this.updateMinimapFOW();
        }, INTERNAL_TICK_INTERVAL);
        this.position = new Tuple(500, 500);
        this.tickCamera(window.innerWidth, window.innerHeight);
    }

    updateMinimapFOW() {
        if (this.state === undefined) return;
        if (this.state.gameState === undefined) return;

        // Only update minimap stuff every 4 frames
        if (this.fowCanvasTick < 4) {
            this.fowCanvasTick += 1;
            return;
        }
        else {
            this.fowCanvasTick = 0;
        }
        const context = this.minimapFOWCanvas.getContext('2d');

        context.clearRect(0, 0, MINIMAP_DISPLAY_SIZE.x, MINIMAP_DISPLAY_SIZE.y);
        const FOWTexture = this.resourceManager.get(Resource.FOG_OF_WAR);

        for (let y = 0; y < map.data.length; y++) {
            for (let x = 0; x < map.data[0].length; x++) {
                if (map.data[y][x].displayType !== 0) {
                    let imageToDraw = undefined;
                    if (!this.state.gameState.isVisible(x, y, this.state.player)) {
                        imageToDraw = FOWTexture;
                    }
                    else if (this.state.gameState.isAllowedBuilding(x, y, this.state.player)) {
                        imageToDraw = this.resourceManager.get(Resource.BLUE_OVERLAY);
                    }
                    else if (this.state.gameState.isEnemyBuildingRange(x, y, this.state.player)) {
                        imageToDraw = this.resourceManager.get(Resource.RED_OVERLAY);
                    }
                    if (imageToDraw !== undefined) {
                        const coord = Utils.toDrawCoord(x, y);
                        context.drawImage(
                            imageToDraw,
                            (coord.x * this.minimapScaleFactor) + this.minimapZeroPoint.x,
                            coord.y * this.minimapScaleFactor + this.minimapZeroPoint.y,
                            imageToDraw.width * this.minimapScaleFactor,
                            imageToDraw.height * this.minimapScaleFactor
                        );
                    }
                }
            }
        }

    }
    initializeClientState(clientState) {
        this.state = clientState;
    }

    toCameraCoord(position) {
        return new Tuple(
            (position.x - this.position.x) * this.scale + window.innerWidth / 2,
            (position.y - this.position.y) * this.scale + window.innerHeight / 2
        );
    }

    toWorldCoord(position) {
        return new Tuple(
            (position.x - window.innerWidth / 2) / this.scale + this.position.x,
            (position.y - window.innerHeight / 2) / this.scale + this.position.y
        );
    }

    set position(newPosition) {
        const centerPointX = newPosition.x * this.minimapScaleFactor + this.minimapZeroPoint.x;
        const centerPointY = newPosition.y * this.minimapScaleFactor + this.minimapZeroPoint.y;
        this.minimapRectPosition.x = centerPointX - this.minimapRectSize.x / 2;
        this.minimapRectPosition.y = centerPointY - this.minimapRectSize.y / 2;
    }

    get position() {
        return this._position;
    }

    tickCamera(screenWidth, screenHeight) {
        if (this.ui.currentScreen !== this.ui.Screen.GAME) {
            let d = Utils.distance(this.position, map.movement[map.movementIndex]);
            if (d < 1) {
                map.movementIndex = (map.movementIndex + 1) % map.movement.length;
                d = Utils.distance(this.position, map.movement[map.movementIndex]);
            }
            const a = new Tuple(map.movement[map.movementIndex].x - this.position.x,
                map.movement[map.movementIndex].y - this.position.y);

            this._position.x += a.x / d * 1;
            this._position.y += a.y / d * 1;
            return;
        }

        this.delta.x *= 0.7;
        this.delta.y *= 0.7;

        const zeroPoint = this.minimapZeroPoint;
        if (this.inputManager.mouseState.position.x > screenWidth - MINIMAP_DISPLAY_SIZE.x - 10 &&
            this.inputManager.mouseState.position.x < screenWidth - 10 &&
            this.inputManager.mouseState.position.y > screenHeight - MINIMAP_DISPLAY_SIZE.y - 10 &&
            this.inputManager.mouseState.position.y < screenHeight - 10 &&
            this.inputManager.mouseState.mouseDown[LEFT_MOUSE_BUTTON]) {
            this.minimapRectPosition.x =
                this.inputManager.mouseState.position.x - (screenWidth - 266) - this.minimapRectSize.x / 2;
            this.minimapRectPosition.y =
                this.inputManager.mouseState.position.y - (screenHeight - 154) - this.minimapRectSize.y / 2;
        }
        this.minimapRectPosition.x += this.minimapScaleFactor * this.delta.x;
        this.minimapRectPosition.y += this.minimapScaleFactor * this.delta.y;

        const change = this.inputManager.mouseState.scrollDelta.y * -10;
        if (change !== 0) {
            let changeX = change;
            let changeY = change / (screenWidth / screenHeight);
            if (this.minimapRectSize.x + changeX > MINIMAP_DISPLAY_SIZE.x) {
                changeX = MINIMAP_DISPLAY_SIZE.x - this.minimapRectSize.x;
                changeY = changeX / (screenWidth / screenHeight);
            }
            if (this.minimapRectSize.y + changeY > MINIMAP_DISPLAY_SIZE.y) {
                changeY = MINIMAP_DISPLAY_SIZE.y - this.minimapRectSize.y;
                changeX = changeY * (screenWidth / screenHeight);
            }
            this.minimapRectSize.x += changeX;
            this.minimapRectSize.y += changeY;
            this.minimapRectPosition.x -= changeX / 2;
            this.minimapRectPosition.y -= changeY / 2;
        }
        this.inputManager.mouseState.scrollDelta.x *= 0.7;
        this.inputManager.mouseState.scrollDelta.y *= 0.7;

        if (this.minimapRectSize.x < screenWidth * this.minimapScaleFactor) {
            this.minimapRectPosition.x += (this.minimapRectSize.x - screenWidth * this.minimapScaleFactor) / 2;
            this.minimapRectSize.x = screenWidth * this.minimapScaleFactor;
        }

        if (this.minimapRectSize.y < screenHeight * this.minimapScaleFactor) {
            this.minimapRectPosition.y += (this.minimapRectSize.y - screenHeight * this.minimapScaleFactor) / 2;
            this.minimapRectSize.y = screenHeight * this.minimapScaleFactor;
        }

        const xConstraint = screenWidth * this.minimapScaleFactor / this.minimapRectSize.x;
        const yConstraint = screenHeight * this.minimapScaleFactor / this.minimapRectSize.y;
        this.scale = Math.max(xConstraint, yConstraint);
        this.minimapRectSize.x = screenWidth * this.minimapScaleFactor / this.scale;
        this.minimapRectSize.y = screenHeight * this.minimapScaleFactor / this.scale;

        if (this.minimapRectPosition.x < 0) {
            this.minimapRectPosition.x = 0;
        }

        if (this.minimapRectPosition.y < 0) {
            this.minimapRectPosition.y = 0;
        }

        if (this.minimapRectPosition.x + this.minimapRectSize.x > MINIMAP_DISPLAY_SIZE.x) {
            this.minimapRectPosition.x = MINIMAP_DISPLAY_SIZE.x - this.minimapRectSize.x;
        }

        if (this.minimapRectPosition.y + this.minimapRectSize.y > MINIMAP_DISPLAY_SIZE.y) {
            this.minimapRectPosition.y = MINIMAP_DISPLAY_SIZE.y - this.minimapRectSize.y;
        }

        this._position.x = (this.minimapRectPosition.x - zeroPoint.x + (this.minimapRectSize.x / 2)) / this.minimapScaleFactor;
        this._position.y = (this.minimapRectPosition.y - zeroPoint.y + (this.minimapRectSize.y / 2)) / this.minimapScaleFactor;

    }
};
