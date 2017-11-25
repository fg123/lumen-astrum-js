
var keyState = [];
var prevKeyState = [];

var mouseState = {
    position: createTuple(0, 0),
    scrollDelta: createTuple(0, 0),
    tile: createTuple(0, 0),
    mouseDown: [],
    mouseMove: []
};

$(document).ready(function () {
    $(document).keydown(function (e) {
        var code = e.keyCode || e.which;
        keyState[code] = true;
    });
    $(document).keyup(function (e) {
        var code = e.keyCode || e.which;
        keyState[code] = false;
    });
    $(document).mousedown(function (e) {
        mouseState.mouseDown.some(function (fn) {
            return fn(e.which);
        });
    });
    $(document).mousemove(function (e) {
        var rect = canvas.getBoundingClientRect();
        mouseState.position.x = e.clientX - rect.left;
        mouseState.position.y = e.clientY - rect.top;
        mouseState.mouseMove.some(function (fn) {
            return fn();
        });
    });
    $(document).mouseup(function (e) {
        // TODO To be Implemented
    });
    $(document).mousewheel(function (event) {
        mouseState.scrollDelta.x = event.deltaX;
        mouseState.scrollDelta.y = event.deltaY;
    });
});

function attachMouseDownObserver(fn) {
    mouseState.mouseDown.push(fn);
}

function attachMouseMoveObserver(fn) {
    mouseState.mouseMove.push(fn);
}
