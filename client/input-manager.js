const $ = require('jquery-browserify');
const { Tuple } = require('../shared/coordinates');
require('jquery-mousewheel')($);

module.exports = class InputManager {
    constructor(canvas, ui, camera, inputPollingTime) {
        this.ui = ui;
        this.mouseState =  {
            position: new Tuple(0, 0),
            scrollDelta: new Tuple(0, 0),
            tile: new Tuple(0, 0),
            mouseDown: [],
            mouseMove: []
        };
        this.keyState = [];
        this.prevKeyState = [];
        this.inputPollingListeners = [];

        /* To capture into the closures */
        $(document).keydown((e) => {
            const code = e.keyCode || e.which;
            this.keyState[code] = true;
        });
        $(document).keyup((e) => {
            const code = e.keyCode || e.which;
            this.keyState[code] = false;
        });
        $(document).mousedown((e) => {
            this.mouseState.mouseDown.some((fn) => {
                return fn(e.which);
            });
        });
        $(document).mousemove((e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseState.position.x = e.clientX - rect.left;
            this.mouseState.position.y = e.clientY - rect.top;
            this.mouseState.mouseMove.some((fn) => {
                return fn();
            });
            this.mouseState.tile =
                camera.toWorldCoord(this.mouseState.position).toTileCoord();
        });
        $(document).mouseup(() => {
            // TODO To be Implemented
        });
        $(document).mousewheel((event) => {
            this.mouseState.scrollDelta.x = event.deltaX;
            this.mouseState.scrollDelta.y = event.deltaY;
        });

        this.inputPoller = setInterval(() => {
            this.inputPoll();
        }, inputPollingTime);
    }

    attachMouseDownObserver(fn) {
        this.mouseState.mouseDown.push(fn);
    }

    attachMouseMoveObserver(fn) {
        this.mouseState.mouseMove.push(fn);
    }

    attachInputPollingListener(listener) {
        this.inputPollingListeners.push(listener);
    }

    inputPoll() {
        if (this.ui.currentScreen != this.ui.Screen.GAME_SCREEN) return;
        this.inputPollingListeners.some((fn) => {
            return fn(this.keyState, this.prevKeyState);
        });
        this.prevKeyState = this.keyState.slice(0);
    }
};
