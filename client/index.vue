<template>
    <div>
        <div class="overlay" v-if="currentScreen !== Screen.GAME">
            <component v-bind:is="currentScreen" v-bind:root="this"></component>
        </div>
        <game v-bind:root="this"/>
    </div>
</template>

<script>
const game = require('./game.vue');
const io = require('socket.io-client');

const Screen = {
    WELCOME: 'welcome',
    LOGIN: 'login',
    GAME: 'game',
    CLIENT_MAIN: 'clientMain'
};

module.exports = {
    data() {
        return {
            Screen,
            currentScreen: Screen.WELCOME,
            socket: io(),
            user: undefined
        };
    },
    mounted() {

    },
    methods: {
        goToLogin() {
            this.currentScreen = Screen.LOGIN;
        },
        goToGame() {
            this.currentScreen = Screen.GAME;
        },
        login(username, password, callback) {
            this.socket.emit('login', username, password, callback);
        },
        loginSuccess(data) {
            this.currentScreen = Screen.CLIENT_MAIN;
            this.user = data;
        },
        leaveQueue(callback) {
            this.socket.emit('leave-queue', callback);
        },
        joinQueue(type, callback) {
            this.socket.emit('join-queue', type, callback);
        }
    },
    components: {
        game: game,
        welcome: require('./welcome.vue'),
        login: require('./login.vue'),
        clientMain: require('./client-main.vue')
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
