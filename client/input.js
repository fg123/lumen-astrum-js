
var keyState = [];
var mouseState = { position: createTuple(0, 0), scrollDelta: createTuple(0, 0), tile: createTuple(0, 0) };

$(document).ready(function () {

    $(document).keydown(function (e) {
        var code = e.keyCode || e.which;
        keyState[code] = 1;
    });
    $(document).keyup(function (e) {
        var code = e.keyCode || e.which;
        keyState[code] = 0;
    });
    $(document).mousedown(function (e) {

    });
    $(document).mousemove(function (e) {
        var rect = canvas.getBoundingClientRect();
        mouseState.position.x = e.clientX - rect.left;
        mouseState.position.y = e.clientY - rect.top;
    });
    $(document).mouseup(function (e) {

    });
    $(document).mousewheel(function (event) {
        mouseState.scrollDelta.x = event.deltaX;
        mouseState.scrollDelta.y = event.deltaY;
    });
});
