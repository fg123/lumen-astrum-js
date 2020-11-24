<template>
    <div class="inQueue">
        <div style="margin-bottom: 25px; font-size: 50px"><b>{{ this.root.currentQueue.name }}</b></div>
        <div class="loader"></div>
        <div style="margin-bottom: 25px;"><b>Looking for a match... ({{ queueTimerText }})</b></div>
        <div class="button leaveQueue medium" @click="leaveQueue">Leave Queue</div>
    </div>
</template>

<script>
const Constants = require('../shared/constants');
const axios = require('axios');
const queues = require('../shared/queues');

module.exports = {
    name: 'client-main',
    props: {
        root: Object,
    },
    data() {
        return {
            user: this.root.user,
            queueTimerBegin: undefined,
            queueTimer: undefined,
            queueTimerText: '',
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
        this.queueTimerBegin = Date.now();
        this.queueTimer = setInterval(() => {
            this.tickTimer();
        }, 1000);
        this.tickTimer();
    },
    methods: {
        leaveQueue() {
            this.root.leaveQueue(() => {
                this.inQueue = false;
                clearInterval(this.queueTimer);
                this.queueTimer = undefined;
                this.root.goToClientMain();
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

div.inQueue {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #FFF;
}

div.entry {
    font-size: 13px;
    font-family: 'Roboto Mono';
}
</style>
