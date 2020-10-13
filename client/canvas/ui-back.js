const { Resource } = require('../resources');

module.exports = class UIBackCanvas {
    constructor(canvas, resourceManager, state, ui) {
        this.resourceManager = resourceManager;
        this.ui = ui;
        this.state = state;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.redraw();

        window.addEventListener('resize', () => {
            this.redraw();
        });
    }

    redraw() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        const topRight = this.resourceManager.get(Resource.UI_TOP_RIGHT);
        const bottomRight = this.resourceManager.get(Resource.UI_BOTTOM_RIGHT);
        const top = this.resourceManager.get(Resource.UI_TOP);
        this.context.drawImage(topRight,
            screenWidth - topRight.width,
            0);
        this.context.drawImage(top,
            (screenWidth - top.width) / 2,
        0);
        this.context.drawImage(bottomRight,
            screenWidth - bottomRight.width,
            screenHeight - bottomRight.height);
    }
};
