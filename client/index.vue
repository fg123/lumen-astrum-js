<template>
    <div>
        <div class="overlay" v-if="currentScreen !== Screen.GAME">
            <component v-bind:is="currentScreen" v-bind:root="this"></component>
        </div>
        <game v-bind:root="this" ref="game"/>
    </div>
</template>

<script>
const game = require('./game.vue');
const io = require('socket.io-client');

const Screen = {
    WELCOME: 'welcome',
    LOGIN: 'login',
    GAME: 'game',
    CLIENT_MAIN: 'clientMain',
    POST_GAME: 'postGame',
    SERVER_ADMIN: 'serverAdmin',
    IN_QUEUE: 'inQueue'
};

module.exports = {
    data() {
        return {
            Screen,
            currentScreen: Screen.WELCOME,
            socket: io(),
            user: undefined,
            lastGameOver: undefined,
            currentQueue: undefined
        };
    },
    mounted() {
        this.socket.on('changed-username', (newUsername) => {
            this.user.username = newUsername;
        });
        this.socket.on('alert-error', (alert) => {
            window.alert(alert);
        });
        this.socket.on('update-elo', (elo) => {
            this.user.elo = elo;
        });
    },
    methods: {
        getClientState() {
            return this.$refs.game.clientState;
        },
        goToLogin() {
            this.currentScreen = Screen.LOGIN;
        },
        goToGameOver(gameOver) {
            this.currentScreen = Screen.POST_GAME;
            this.lastGameOver = gameOver;
        },
        goToGame() {
            this.currentScreen = Screen.GAME;
        },
        goToClientMain() {
            this.currentScreen = Screen.CLIENT_MAIN;
            this.lastGameOver = undefined;
        },
        goToQueue() {
            this.currentScreen = Screen.IN_QUEUE;
        },
        goToServerAdmin() {
            if (this.user.isAdmin) {
                this.currentScreen = Screen.SERVER_ADMIN;
            }
        },
        login(username, password, callback) {
            this.socket.emit('login', username, password, callback);
        },
        glogin(id_token, callback) {
            this.socket.emit('glogin', id_token, callback);
        },
        loginSuccess(data) {
            this.user = data;
            this.goToClientMain();
        },
        leaveQueue(callback) {
            this.socket.emit('leave-queue', () => {
                callback();
                this.currentQueue = undefined;
            });
        },
        joinQueue(queue, callback) {
            console.log(queue);
            this.socket.emit('join-queue', queue.key, () => {
                callback();
                this.currentQueue = queue;
            });
        }
    },
    components: {
        game: game,
        welcome: require('./welcome.vue'),
        login: require('./login.vue'),
        clientMain: require('./client-main.vue'),
        postGame: require('./post-game.vue'),
        serverAdmin: require('./server-admin.vue'),
        inQueue: require('./in-queue.vue')
    }
};
</script>

<style>
div.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

div.overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
}

input {
    width: 100%;
    padding: 10px;
    margin: 5px;
    border: 2px solid black;
    outline: none;
    font-weight: bold;
}
</style>
