<template>
    <div class="wrapper">
        <div class="topLeft">
            <logo style="width: 400px" />
        </div>
        <div class="joinGameDialog">
            <div class="notInQueue" v-if="!inQueue">
                <gradient-button medium style="display: block; margin-bottom: 20px" @click="joinQueue('ranked')">Join Ranked Queue</gradient-button>
                <gradient-button medium style="display: block" @click="joinQueue('unranked')">Join Unranked Queue</gradient-button>
            </div>
        </div>
        <div class="inQueue" v-if="inQueue">
            <div class="loader"></div>
            <div style="margin-bottom: 25px;"><b>Looking for a match... ({{ queueTimerText }})</b></div>
            <div class="button leaveQueue medium" @click="leaveQueue">Leave Queue</div>
        </div>
        <div class="topRight" style="top: 10px">
            <div class="usernameDisplay">{{ this.user.username }} ({{ this.user.elo }})</div>
        </div>
    </div>
</template>

<script>
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
            queueTimerText: ''
        };
    },
    components: {
        gradientButton: require('./gradient-button.vue'),
        logo: require('./logo.vue')
    },
    mounted() {
        if (!this.user) {
            alert('User not logged in!');
        }
    },
    methods: {
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
div.wrapper {
    padding: 100px;
    width: 100%;
    height: 100%;
}

div.wrapper > * {
    padding: inherit;
}

div.topLeft {
    position: absolute;
    top: 0;
    left: 0;
}

div.topRight {
    position: absolute;
    top: 0;
    right: 0;
}

div.usernameDisplay {
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
}
</style>
