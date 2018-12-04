<template>
   <dashboard-wrapper v-bind:user="user">
       <div class="bigTitle">
            {{ gameOver.winner === user.username ? "VICTORY" : "DEFEAT" }}
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
div.bigTitle {
    color: #FFF;
    font-size: 100px;
    font-family: "Montserrat";
    font-weight: bold;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
