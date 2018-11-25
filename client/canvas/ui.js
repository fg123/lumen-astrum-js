/* Dynamic Parts of the UI */
const { Resource } = require('../resources');

module.exports = class UICanvas {
    constructor(canvas, state, inputManager, ui, resourceManager, camera) {
        this.canvas = canvas;
        this.state = state;
        this.inputManager = inputManager;
        this.camera = camera;

        this.ui = ui;
        this.context = canvas.getContext('2d');

        this.cursorResource = resourceManager.get(Resource.CURSOR);
        const tick = () => {
            this.redraw();
            window.requestAnimationFrame(tick);
        };
        tick();

        this.lastCursorMessage = '';
        this.lastCursorMessageCanvas = undefined;

        this.lastGold = 0;
        this.lastGoldCanvas = undefined;

        this.endTurnCanvas = document.createElement('canvas');
        this.cacheTextToCanvas('End Turn', 'white', 'bold 20px Roboto Slab', this.endTurnCanvas);
    }

    cacheTextToCanvas(text, color, font, canvas) {
        const context = canvas.getContext('2d');
        context.font = font;
        const measure = context.measureText(text);
        canvas.width = measure.width;
        canvas.height = parseInt(font.replace(/\D/g,''));
        context.font = font;
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text,
            canvas.width / 2,
            canvas.height / 2);
    }

    redrawCursorMessageCanvas() {
        this.lastCursorMessageCanvas = document.createElement('canvas');
        const context = this.lastCursorMessageCanvas.getContext('2d');

        context.font = 'bold 14px Asap';
        const measure = context.measureText(this.state.cursorMessage);
        const width = measure.width + 8;
        const height = 20;
        this.lastCursorMessageCanvas.width = width;
        this.lastCursorMessageCanvas.height = height;
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        context.fillStyle = 'white';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.font = 'bold 14px Asap';
        context.fillText(this.state.cursorMessage,
            width / 2,
            height / 2
        );
        this.lastCursorMessage = this.state.cursorMessage;
    }

    redraw() {
        if (this.ui.currentScreen === this.ui.Screen.GAME) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            this.canvas.width = screenWidth;
            this.canvas.height = screenHeight;

            if (this.state.cursorMessage) {
                if (this.state.cursorMessage !== this.lastCursorMessage) {
                    // Not Cached
                    this.redrawCursorMessageCanvas();
                }
                this.context.drawImage(this.lastCursorMessageCanvas,
                    this.inputManager.mouseState.position.x,
                    this.inputManager.mouseState.position.y - 30);
            }
            this.drawGoldAndTurnControls(screenWidth, screenHeight);
            this.drawMinimap(screenWidth, screenHeight);
            this.context.drawImage(this.cursorResource, this.inputManager.mouseState.position.x - this.cursorResource.width / 2,
                this.inputManager.mouseState.position.y - this.cursorResource.height / 2);
        }
    }

    drawGoldAndTurnControls(screenWidth, screenHeight) {
        // Gold
        this.context.textBaseline = 'middle';
        this.context.fillStyle = 'white';
        this.context.font = 'bold 32px Roboto Slab';
        this.context.fillText(this.state.getGold(), screenWidth - 185, screenHeight - 184);
        this.context.textBaseline = 'alphabetic';

        // Turn Controls
        this.state.hoveringEndTurn = false;
        if (this.state.gameState.currentTurn === this.state.side) {
            // Show Timer
            this.context.fillStyle = 'black';
            this.context.font = 'bold 60px Roboto Slab';
            this.context.fillText(this.state.turnTimer, screenWidth - 180, 75);
            // Show End Turn Button
            if (this.inputManager.mouseState.position.x > screenWidth - 365 &&
                this.inputManager.mouseState.position.x < screenWidth - 365 + 120 &&
                this.inputManager.mouseState.position.y > 0 && this.inputManager.mouseState.position.y < 48) {
                this.state.hoveringEndTurn = true;
                this.context.fillStyle = 'rgba(164, 0, 0, 0.8)';
            }
            else {
                this.context.fillStyle = 'rgba(164, 0, 0, 0.6)';
            }
            this.context.fillRect(screenWidth - 365, 0, 120, 48);
            this.context.drawImage(this.endTurnCanvas, screenWidth - 305 - (this.endTurnCanvas.width / 2),
                24 - (this.endTurnCanvas.height / 2));
        }
    }

    drawMinimap(screenWidth, screenHeight) {
        /* We grab a default tile to cache the calculation */
        this.context.drawImage(this.camera.minimapCanvas, screenWidth - 266, screenHeight - 154);
        this.context.strokeStyle = 'white';
        this.context.lineWidth = '1.5';
        this.context.rect(screenWidth - 266 + this.camera.minimapRectPosition.x,
            screenHeight - 154 + this.camera.minimapRectPosition.y,
            this.camera.minimapRectSize.x, this.camera.minimapRectSize.y);
        this.context.stroke();
    }
};
