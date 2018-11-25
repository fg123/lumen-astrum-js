const $ = require('jquery-browserify');

const io = require('socket.io-client');
const UI = require('./ui');
const ResourceManager = require('./resource-manager');
const GraphicsManager = require('./graphics-manager');

const UiBackCanvas = require('./canvas/ui-back');
const UiCanvas = require('./canvas/ui');

const ClientState = require('./client-state');
const AnimationManager = require('../shared/animation-manager');
const InputManager = require('./input-manager');
const Camera = require('./camera');

const TIME_BETWEEN_FRAMES = 16;

$(document).ready(() => {
    const mapCanvas = $('canvas.map')[0];
    const mapOldCanvas = $('canvas.map-old')[0];
    const uiBackCanvas = $('canvas.ui-back')[0];
    const uiCanvas = $('canvas.ui')[0];

    console.log(mapCanvas);
    console.log(uiBackCanvas);

    const socket = io();
    const ui = new UI(socket);

    new ResourceManager((resourceManager) => {
        const inputManager = new InputManager(mapCanvas, ui, TIME_BETWEEN_FRAMES);
        const camera = new Camera(resourceManager, ui, inputManager);
        inputManager.initialize(camera);

        const animationManager = new AnimationManager();

        const clientState = new ClientState(socket, camera, inputManager, ui, resourceManager, animationManager);

        ui.registerGameCanvas(new GraphicsManager(
            mapOldCanvas,
            TIME_BETWEEN_FRAMES,
            ui,
            camera,
            clientState,
            animationManager,
            resourceManager,
            inputManager
        ));

        ui.registerGameCanvas(new UiBackCanvas(
            uiBackCanvas,
            resourceManager,
            clientState,
            ui
        ));

        ui.registerGameCanvas(new UiCanvas(
            uiCanvas,
            clientState,
            inputManager,
            ui,
            resourceManager,
            camera
        ));
    });
});
