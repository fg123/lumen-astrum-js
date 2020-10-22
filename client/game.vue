l<template>
    <div>
        <debug-box style="z-index: 5;" v-show="isInGame && isDebug" ref="debugBox" />
        <chat-box style="z-index: 4;" v-show="isInGame" v-bind:game="this" ref="chatbox"/>
        <canvas ref="ui" style="z-index: 3;" v-show="isInGame"></canvas>
        <canvas ref="ui-back" style="z-index: 2;" v-show="isInGame"></canvas>
        <canvas ref="map" style="z-index: 1;"></canvas>
    </div>
</template>

<script>
const { ChatMessageStateChange } = require('../shared/state-change.js');
const Constants = require('../shared/constants');

module.exports = {
    props: {
        root: Object
    },
    computed: {
        isInGame() {
            return this.root.currentScreen === this.root.Screen.GAME;
        },
        isDebug() {
            return !Constants.IS_PRODUCTION;
        }
    },
    components: {
        chatBox: require('./chat-box.vue'),
        debugBox: require('./debug-box.vue')
    },
    methods: {
        sendChat(message) {
            this.clientState.sendStateChange(
                ChatMessageStateChange.create(
                    this.clientState.player,
                    message
                )
            );
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

        const mapCanvas = this.$refs.map;
        const uiBackCanvas = this.$refs['ui-back'];
        const uiCanvas = this.$refs.ui;
        const debugBox = this.$refs.debugBox;

        const chatbox = this.$refs.chatbox;

        const ui = this.root;

        new ResourceManager((resourceManager) => {
            const inputManager = new InputManager(uiCanvas, ui, TIME_BETWEEN_FRAMES,
                () => chatbox.isFocused(),
                () => {
                    return chatbox.isMouseOverChatBox() || debugBox.isMouseOverDebugBox();
                });
            const camera = new Camera(resourceManager, ui, inputManager);
            inputManager.initialize(camera);        
        
            /* The global animation manager should not block pipeline */
            const animationManager = new AnimationManager(false);

            const clientState = new ClientState(this.root.socket, chatbox, camera, inputManager, ui, resourceManager, animationManager);
            camera.initializeClientState(clientState);
            this.clientState = clientState;
            const mapCanvasObj = new MapCanvas(
                mapCanvas,
                TIME_BETWEEN_FRAMES,
                ui,
                camera,
                clientState,
                animationManager,
                resourceManager,
                inputManager
            );
            
            debugBox.initialize(ui.socket, inputManager, mapCanvasObj, clientState);

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
