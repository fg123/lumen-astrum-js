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
    if (stateChange.type == "turn-passover") {
        if (stateChange.data.from == "server") {
            state.currentTurn = "red";
        }
        state.lastTurnTime = stateChange.data.timestamp;
    }
    simulateState(state.gameState, stateChange);
});

socket.on("game-start", function (side, gameStartTime) {
    state.side = side;
    state.gameState = createGameState(gameStartTime);
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
