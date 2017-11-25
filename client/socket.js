var socket = io();

function login(username, password) {
    socket.emit("login", username, password);
}

function joinQueue(type) {
    socket.emit("join-queue", type);
}

function leaveQueue() {
    socket.emit("leave-queue");
}

function sendStateChange(stateChange) {
    socket.emit("state-change", stateChange);
}

socket.on("login-failed", function () {
    $(".errorMessage").show();
});

socket.on("joined-queue", function () {
    $(".inQueue").show();
    $(".notInQueue").hide();
    startQueueTimer();
});

socket.on("left-queue", function () {
    $(".inQueue").hide();
    $(".notInQueue").show();
    stopQueueTimer();
});

socket.on("login-success", function (user) {
    loadScreen(CLIENT_MAIN_SCREEN);
    $(".usernameDisplay").text(user.username + " (" + user.elo + ")");
});

socket.on("state-change", function (stateChange) {
    simulateState(state.gameState, stateChange);
    if (stateChange.type == "turn-passover") {
        state.buildingStructure = null;
        state.spawningUnit = null;
    }
});

socket.on("invalid-state-change", function () {
    // Should never happen since UI should prevent it, but if so...
    pushAlertMessage("Invalid action!");
});

socket.on("game-start", function (side, gameStartTime) {
    state.side = side;
    state.gameState = createGameState(gameStartTime);
    if (side == RED_SIDE) {
        state.commandCenter = state.gameState.mapObjects[RED_SIDE_COMMAND_CENTER_LOC.y]
            [RED_SIDE_COMMAND_CENTER_LOC.x];
    }
    else {
        state.commandCenter = state.gameState.mapObjects[BLUE_SIDE_COMMAND_CENTER_LOC.y]
            [BLUE_SIDE_COMMAND_CENTER_LOC.x];
    }
    loadScreen(GAME_SCREEN);
    var interval = setInterval(function () {
        var seconds = parseInt(10 - (Date.now() - state.gameState.gameStartTime) / 1000);
        state.bigMessage = "Game starting in " + seconds + " seconds";
        if (seconds == 0) {
            clearInterval(interval);
            state.bigMessage = "";
        }
    }, 1000);
});
