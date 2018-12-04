l<template>
    <div>
        <canvas ref="ui" style="z-index: 3;" v-show="isInGame"></canvas>
        <canvas ref="ui-back" style="z-index: 2;" v-show="isInGame"></canvas>
        <canvas ref="map" style="z-index: 1;"></canvas>
    </div>
</template>

<script>
module.exports = {
    props: {
        root: Object
    },
    computed: {
        isInGame() {
            return this.root.currentScreen === this.root.Screen.GAME;
        }
    },
    mounted() {
        const ResourceManager = require('./resource-manager');

        const MapCanvas = require('./canvas/map');
        const UiBackCanvas = require('./canvas/ui-back');
        const UiCanvas = require('./canvas/ui');

        const ClientState = require('./client-state');
        const AnimationManager = require('../shared/animation-manager');
        const InputManager = require('./input-manager');
        const Camera = require('./camera');

        const TIME_BETWEEN_FRAMES = 16;

        console.log(this.$refs);
        const mapCanvas = this.$refs.map;
        const uiBackCanvas = this.$refs['ui-back'];
        const uiCanvas = this.$refs.ui;

        const ui = this.root;
        new ResourceManager((resourceManager) => {
            const inputManager = new InputManager(mapCanvas, ui, TIME_BETWEEN_FRAMES);
            const camera = new Camera(resourceManager, ui, inputManager);
            inputManager.initialize(camera);

            const animationManager = new AnimationManager();

            const clientState = new ClientState(this.root.socket, camera, inputManager, ui, resourceManager, animationManager);
            new MapCanvas(
                mapCanvas,
                TIME_BETWEEN_FRAMES,
                ui,
                camera,
                clientState,
                animationManager,
                resourceManager,
                inputManager
            );

            new UiBackCanvas(
                uiBackCanvas,
                resourceManager,
                clientState,
                ui
            );

            new UiCanvas(
                uiCanvas,
                clientState,
                inputManager,
                ui,
                resourceManager,
                camera
            );
        });
    }
};
</script>
