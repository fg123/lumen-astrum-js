const $ = require('jquery-browserify');
const { Tuple } = require('../shared/coordinates');
require('jquery-mousewheel')($);

module.exports = class InputManager {
    constructor(canvas, ui, inputPollingTime, isChatBoxFocused, isMouseOverChatBox) {
        this.canvas = canvas;
        this.ui = ui;
        this.mouseState =  {
            position: new Tuple(0, 0),
            scrollDelta: new Tuple(0, 0),
            tile: new Tuple(0, 0),
            mouseDownListeners: [],
            mouseMoveListeners: [],
            mouseUpListeners: [],

            mouseDown: []
        };
        this.isChatBoxFocused = isChatBoxFocused;
        this.isMouseOverChatBox = isMouseOverChatBox;
        this.keyState = [];
        this.prevKeyState = [];
        this.inputPollingListeners = [];

        this.inputPoller = setInterval(() => {
            this.inputPoll();
        }, inputPollingTime);
    }

    initialize(camera) {
        /* To capture into the closures */
        $(document).keydown((e) => {
            if (this.isChatBoxFocused()) {
                return;
            }
            const code = e.keyCode || e.which;
            this.keyState[code] = true;
        });
        $(document).keyup((e) => {
            if (this.isChatBoxFocused()) {
                return;
            }
            const code = e.keyCode || e.which;
            this.keyState[code] = false;
        });
        $(document).mousedown((e) => {
            if (this.isMouseOverChatBox() || this.isChatBoxFocused()) {
                return;
            }
            this.mouseState.mouseDownListeners.some((fn) => {
                return fn(e.which);
            });
            this.mouseState.mouseDown[e.which] = true;
        });
        $(document).mousemove((e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseState.position.x = e.clientX - rect.left;
            this.mouseState.position.y = e.clientY - rect.top;
            this.mouseState.mouseMoveListeners.some((fn) => {
                return fn();
            });
            this.mouseState.tile =
                camera.toWorldCoord(this.mouseState.position).toTileCoord();
        });
        $(document).mouseup((e) => {
            this.mouseState.mouseUpListeners.some((fn) => {
                return fn(e.which);
            });
            this.mouseState.mouseDown[e.which] = false;
        });
        $(document).mousewheel((event) => {
            if (this.isMouseOverChatBox() || this.isChatBoxFocused()) {
                return;
            }
            this.mouseState.scrollDelta.x = event.deltaX;
            this.mouseState.scrollDelta.y = event.deltaY;
        });
    }

    attachMouseDownObserver(fn) {
        this.mouseState.mouseDownListeners.push(fn);
    }

    attachMouseMoveObserver(fn) {
        this.mouseState.mouseMoveListeners.push(fn);
    }

    attachMouseUpObserver(fn) {
        this.mouseState.mouseUpListeners.push(fn);
    }

    attachInputPollingListener(listener) {
        this.inputPollingListeners.push(listener);
    }

    inputPoll() {
        if (this.ui.currentScreen != this.ui.Screen.GAME) return;
        this.inputPollingListeners.some((fn) => {
            return fn(this.keyState, this.prevKeyState);
        });
        this.prevKeyState = this.keyState.slice(0);
    }
};
