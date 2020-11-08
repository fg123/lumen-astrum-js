<template>
   <dashboard-wrapper v-bind:user="user">
       <div class="centered">
            <div class="bigText">
                {{ gameOver.winners.indexOf(user.username) >= 0 ? "VICTORY" : "DEFEAT" }}
            </div>
            <gradient-button medium @click="backToLobby">Back to Menu</gradient-button>
       </div>
   </dashboard-wrapper>
</template>


<script>
module.exports = {
    name: 'post-game',
    props: {
        root: Object
    },
    data() {
        return {
            user: this.root.user,
            gameOver: this.root.lastGameOver
        };
    },
    components: {
        dashboardWrapper: require('./dashboard-wrapper.vue'),
        gradientButton: require('./gradient-button.vue')
    },
    methods: {
        backToLobby() {
            this.root.goToClientMain();
        }
    }
};
</script>

<style>
div.centered {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

div.bigText {
    color: #FFF;
    font-size: 100px;
    font-family: "Patua One";
}
</style>
