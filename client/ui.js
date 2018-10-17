const $ = require('jquery-browserify');
const Screen = {
    WELCOME: 'welcome',
    LOGIN: 'login',
    GAME: 'game',
    MAIN: 'clientMain'
};

module.exports = class UI {
    constructor(socket) {
        this.Screen = Screen;
        this.loadScreen(Screen.WELCOME);
        $('.play.button').click(() => {
            this.loadScreen(Screen.LOGIN);
        });

        $('.login.button').click(() => {
            socket.emit('login',
                $('.loginForm .username').val(),
                $('.loginForm .password').val()
            );
        });
        socket.on('login-success', (user) => {
            this.loadScreen(Screen.MAIN);
            $('.usernameDisplay').text(user.username + ' (' + user.elo + ')');
        });
        socket.on('login-failed', () => {
            $('.errorMessage').show();
        });

        $('.leaveQueue.button').click(() => {
            socket.emit('leave-queue');
        });
        socket.on('left-queue', () => {
            $('.inQueue').hide();
            $('.notInQueue').show();
            this.stopQueueTimer();
        });

        $('.rankedJoin.button').click(() => {
            socket.emit('join-queue', 'ranked');
        });
        $('.unrankedJoin.button').click(() => {
            socket.emit('join-queue', 'unranked');
        });
        socket.on('joined-queue', () => {
            $('.inQueue').show();
            $('.notInQueue').hide();
            this.startQueueTimer();
        });

        this.queueTimerBegin = 0;
        this.queueTimer = undefined;
    }

    hideScreen(screen) {
        if (screen !== this.currentScreen) {
            $('.overlay.' + screen).fadeOut();
        }
    }

    showScreen(screen) {
        $('.overlay.' + screen).fadeIn();
    }

    loadScreen(screen) {
        this.currentScreen = screen;
        this.hideScreen(Screen.WELCOME);
        this.hideScreen(Screen.LOGIN);
        this.hideScreen(Screen.GAME);
        this.hideScreen(Screen.MAIN);
        this.showScreen(screen);
    }

    startQueueTimer() {
        if (!this.queueTimer) {
            this.queueTimerBegin = Date.now();
            this.queueTimerTick();
            this.queueTimer = setInterval(() => { this.queueTimerTick(); }, 1000);
        }
    }

    queueTimerTick() {
        const time = new Date(Date.now() - this.queueTimerBegin);
        $('.queueTimer').text(('0' + time.getMinutes()).slice(-2) + ':' + ('0' + (time.getSeconds() + 1)).slice(-2));
    }

    stopQueueTimer() {
        if (this.queueTimer) {
            clearInterval(this.queueTimer);
            this.queueTimer = undefined;
        }
    }
};
