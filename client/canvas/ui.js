/* Dynamic Parts of the UI */
const { Resource } = require('../resources');
const Utils = require('../utils');

module.exports = class UICanvas {
    constructor(canvas, state, inputManager, ui, resourceManager) {
        this.canvas = canvas;
        this.state = state;
        this.inputManager = inputManager;

        this.ui = ui;
        this.context = canvas.getContext('2d');
        this.context.font = 'bold 14px Asap';     
        
        this.cursorResource = resourceManager.get(Resource.CURSOR);
        const tick = () => {
            this.redraw();
            window.requestAnimationFrame(tick);
        };
        tick();
    }

    redraw() {
        if (this.ui.currentScreen === this.ui.Screen.GAME) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            this.canvas.width = screenWidth;
            this.canvas.height = screenHeight;

            if (this.state.cursorMessage) {
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
            this.context.drawImage(this.cursorResource, this.inputManager.mouseState.position.x - this.cursorResource.width / 2,
                this.inputManager.mouseState.position.y - this.cursorResource.height / 2);
        }
    }
};
