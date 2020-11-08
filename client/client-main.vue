<template>
    <dashboard-wrapper v-bind:user="user" v-bind:root="root">
        <div class="adminBtnWrapper">
            <gradient-button small style="display: block" v-if="user.isAdmin" @click="root.goToServerAdmin()">Server</gradient-button>
        </div>
        <div class="changelog" v-if="!inQueue">
            <div style="margin-bottom: 5px; font-weight: bold">Changelog</div>
            <div class="entry" v-for="(entry, index) in changelog" :key="index">
                {{ entry }}
            </div>
        </div>
        <div class="replays" v-if="!inQueue && !isProduction">
            <div style="margin-bottom: 5px; font-weight: bold">Dbg Replays</div>
            <div class="entry" v-for="(replay, index) in replayGames" :key="index">
                <button @click="loadReplay(replay)">{{ replay }}</button>
            </div>
        </div>
        <div class="joinGameDialog">
            <div class="notInQueue" v-if="!inQueue">
                <gradient-button medium style="display: block; margin-bottom: 20px" @click="joinQueue('2p')">Join 2 Player Queue</gradient-button>
                <gradient-button medium style="display: block; margin-bottom: 20px" @click="joinQueue('3p')">Join 3 Player Queue</gradient-button>
                <gradient-button medium style="display: block; margin-bottom: 20px" @click="joinQueue('4p')">Join 4 Player Queue</gradient-button>
                <gradient-button medium style="display: block" @click="joinQueue('2v2')">Join 2v2 Queue</gradient-button>
            </div>
        </div>
        <div class="inQueue" v-if="inQueue">
            <div class="loader"></div>
            <div style="margin-bottom: 25px;"><b>Looking for a match... ({{ queueTimerText }})</b></div>
            <div class="button leaveQueue medium" @click="leaveQueue">Leave Queue</div>
        </div>
    </dashboard-wrapper>
</template>

<script>
const Constants = require('../shared/constants');
const axios = require('axios');

module.exports = {
    name: 'client-main',
    props: {
        root: Object,
    },
    data() {
        return {
            user: this.root.user,
            inQueue: false,
            queueTimerBegin: undefined,
            queueTimer: undefined,
            queueTimerText: '',
            changelog: [],
            isProduction: Constants.IS_PRODUCTION,
            replayGames: [],
        };
    },
    components: {
        gradientButton: require('./gradient-button.vue'),
        dashboardWrapper: require('./dashboard-wrapper.vue')
    },
    mounted() {
        if (!this.user) {
            alert('User not logged in!');
        }
        this.root.socket.emit('changelog', (log) => {
            this.changelog = log;
        });
        if (!this.isProduction) {
            axios.get('/tools/list-replays').then((response) => {
                this.replayGames = response.data;
            }).catch((error) => {
                alert(error);
            });
        }
    },
    methods: {
        loadReplay(replay) {
            axios.get('/root/' + replay).then((response) => {
                this.root.getClientState().enterReplay(response.data);
            }).catch((error) => {
                alert(error);
            });
        },
        leaveQueue() {
            this.root.leaveQueue(() => {
                this.inQueue = false;
                clearInterval(this.queueTimer);
                this.queueTimer = undefined;
            });
        },
        joinQueue(type) {
            this.root.joinQueue(type, () => {
                console.log('Joined Queue');
                this.inQueue = true;
                this.queueTimerBegin = Date.now();
                this.queueTimer = setInterval(() => {
                    this.tickTimer();
                }, 1000);
                this.tickTimer();
            });
        },
        tickTimer() {
            const time = new Date(Date.now() - this.queueTimerBegin);
            this.queueTimerText = ('0' + time.getMinutes()).slice(-2) + ':' + ('0' + (time.getSeconds() + 1)).slice(-2);
        }
    }
};
</script>

<style>
div.adminBtnWrapper {
    position: absolute;
    bottom: 5px;
    right: 5px;
}

div.inQueue {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

div.inQueue {
    color: #FFF;
}

div.joinGameDialog {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    text-align: right;
}
div.changelog {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    color: #FFF;
    max-width: 50%;
    overflow: auto;
}
div.replays {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    color: #FFF;
    max-width: 50%;
    overflow: auto;
}
div.entry {
    font-size: 13px;
    font-family: 'Roboto Mono';
}
</style>
