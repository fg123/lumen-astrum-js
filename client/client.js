const WELCOME_SCREEN = "welcome";
const LOGIN_SCREEN = "login";
const GAME_SCREEN = "game";
const CLIENT_MAIN_SCREEN = "clientMain";

var currentScreen;
var queueTimerBegin = 0;
var queueTimer = undefined;

$(document).ready(function () {
    loadScreen(WELCOME_SCREEN);
    $(".play.button").click(function () {
        loadScreen(LOGIN_SCREEN);
    });
    $(".login.button").click(function () {
        login($(".loginForm .username").val(),
            $(".loginForm .password").val());
    });
    $(".leaveQueue.button").click(function () {
        leaveQueue();
    });
    $(".rankedJoin.button").click(function () {
        joinQueue("ranked");
    });
    $(".unrankedJoin.button").click(function () {
        joinQueue("unranked");
    });
});

function queueTimerTick() {
    var time = new Date(Date.now() - queueTimerBegin);
    $(".queueTimer").text(('0' + time.getMinutes()).slice(-2) + ':' + ('0' + (time.getSeconds() + 1)).slice(-2));
}

function stopQueueTimer() {
    if (queueTimer) {
        clearInterval(queueTimer);
        queueTimer = undefined;
    }
}

function startQueueTimer() {
    if (!queueTimer) {
        queueTimerBegin = Date.now();
        queueTimerTick();
        queueTimer = setInterval(queueTimerTick, 1000);
    }
}

function loadScreen(screen) {
    currentScreen = screen;
    hideScreen(WELCOME_SCREEN);
    hideScreen(LOGIN_SCREEN);
    hideScreen(GAME_SCREEN);
    hideScreen(CLIENT_MAIN_SCREEN);
    showScreen(screen);
}

function hideScreen(screen) {
    if (screen != currentScreen) {
        $(".overlay." + screen).fadeOut();
    }
}

function showScreen(screen) {
    $(".overlay." + screen).fadeIn();
}