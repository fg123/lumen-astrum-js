const $ = require('jquery-browserify');

const io = require('socket.io-client');
const UI = require('./ui');
const ResourceManager = require('./resource-manager');
const GraphicsManager = require('./graphics-manager');
const ClientState = require('./client-state');
const InputManager = require('./input-manager');
const Camera = require('./camera');

const TIME_BETWEEN_FRAMES = 16;

$(document).ready(() => {
    const canvas = $('canvas')[0];
    const socket = io();
    const ui = new UI(socket);

    new ResourceManager((resourceManager) => {
        const camera = new Camera();
        const inputManager = new InputManager(canvas, ui, camera, TIME_BETWEEN_FRAMES);

        const clientState = new ClientState(socket, camera, inputManager, ui, resourceManager);

        new GraphicsManager(
            canvas,
            TIME_BETWEEN_FRAMES,
            ui,
            camera,
            clientState,
            resourceManager,
            inputManager
        );
    });
});
