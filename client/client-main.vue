<template>
    <dashboard-wrapper v-bind:user="user" v-bind:root="root">
        <div class="clientWrapper">
            <div class="changelog">
                <h1 style="margin-top: 0px">Changelog</h1>
                <div class="entry" v-for="(entry, index) in changelog" :key="index">
                    {{ entry }}
                </div>
            </div>
            <div class="mapInfo">
                <div v-if="mouseOverQueue !== undefined">
                    <h1 style="margin-top: 0px">{{ mouseOverQueue.name }}</h1>
                    <div>
                        {{ mouseOverQueue.description }}
                    </div>
                    <div style="display: flex; flex-wrap: wrap; flex-direction: row; width: 100%;">
                        <div v-for="map in mouseOverQueue.maps" :key="map" style="flex: 1 0 0; max-width: 50%">
                            <h4>{{ maps[map].name ? maps[map].name : map }}</h4>
                            <img :src="maps[map].image" style="max-width: 100%; max-height: 100%;" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="joinGameDialog">
                <gradient-button 
                    v-for="queue in queues"
                    :key="queue.key"
                    style="display: block; margin-bottom: 20px"
                    medium
                    @click="joinQueue(queue)"
                    @mouseover="mouseOverQueue = queue;"
                    @mouseout="mouseOverQueue = undefined;">Play {{ queue.name }}</gradient-button>
            </div>
        </div>
        <div class="adminBtnWrapper">
            <gradient-button small style="display: block" v-if="user.isAdmin" @click="root.goToServerAdmin()">Server</gradient-button>
        </div>
        
        <div class="replays" v-if="!isProduction">
            <div style="margin-bottom: 5px; font-weight: bold">Dbg Replays</div>
            <div class="entry" v-for="(replay, index) in replayGames" :key="index">
                <button @click="loadReplay(replay)">{{ replay }}</button>
            </div>
        </div>
        
    </dashboard-wrapper>
</template>

<script>
const Constants = require('../shared/constants');
const axios = require('axios');
const queues = require('../shared/queues');
const { maps } = require('../shared/map');

module.exports = {
    name: 'client-main',
    props: {
        root: Object,
    },
    data() {
        return {
            user: this.root.user,
            changelog: [],
            isProduction: Constants.IS_PRODUCTION,
            replayGames: [],
            queues: queues,
            mouseOverQueue: undefined,
            maps: maps
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
        joinQueue(type) {
            this.root.joinQueue(type, () => {
                console.log('Joined Queue');
                this.root.goToQueue();
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

div.joinGameDialog {
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

div.changelog, div.mapInfo {
    color: #FFF;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
}

div.mapInfo {
    margin-right: 25px;
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
    padding-left: 25px;
    text-indent: -25px;
}

div.clientWrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding-top: 100px!important;
    padding-bottom: 100px!important;
    padding-left: 0px!important;
    padding-right: 0px!important;
}

</style>
