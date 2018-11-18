/* Controls the "map" canvas */

module.exports = class MapCanvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        window.addEventListener('resize', () => {
            this.resize();
        });

        this.animate = () => {
            this.drawState(window.innerWidth, window.innerHeight);
            window.requestAnimationFrame(this.animate);
        };
        window.requestAnimationFrame(this.animate);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    redraw() {
        if (this.ui.currentScreen === this.ui.Screen.GAME) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            this.canvas.width = screenWidth;
            this.canvas.height = screenHeight;
            const topRight = this.resourceManager.get(Resource.UI_TOP_RIGHT);
            const bottomRight = this.resourceManager.get(Resource.UI_BOTTOM_RIGHT);
        }
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
    }
};
