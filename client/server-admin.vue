<template>
    <dashboard-wrapper v-bind:user="user" v-bind:root="root">
        <div class="serverAdminWrapper"> 
            <h1>Server Status</h1>
            <button @click="update()">Update</button>
            <button @click="root.goToClientMain()">Go Back</button>
            <h3>Connected Users</h3>
            <table class="displayTable">
                <tr>
                    <th>Username</th>
                    <th>Is Admin</th>
                    <th>Socket ID</th>
                </tr>
                <tr v-for="(user, index) in connectedUsers" :key="index">
                    <td>{{ user.username }}</td>
                    <td>{{ user.isAdmin }}</td>
                    <td>{{ user.socketId }}</td>
                </tr>
            </table>
            <h3>Games</h3>
            <table class="displayTable">
                <tr>
                    <th>Start Time</th>
                    <th>Map Name</th>
                    <th>Players</th>
                </tr>
                <tr v-for="(game, index) in games" :key="index">
                    <td>{{ new Date(game.gameStartTime) }}</td>
                    <td>{{ game.mapName }}</td>
                    <td>{{ game.players }}</td>
                </tr>
            </table>
        </div>
    </dashboard-wrapper>
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
            connectedUsers: [],
            games: []
        };
    },
    components: {
        gradientButton: require('./gradient-button.vue'),
        dashboardWrapper: require('./dashboard-wrapper.vue')
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            this.root.socket.emit('admin/server-status', (users, games) => {
                console.log(users);
                console.log(games);
                this.connectedUsers = users;
                this.games = games;
            });
        }
    }
};
</script>

<style>
div.serverAdminWrapper {
    background: #fff;
    margin-top: 100px;
    padding: 10px;
    height: calc(100% - 100px);
}
.displayTable {
    font-size: 13px;
    font-family: 'Roboto Mono';
    border-collapse: collapse;
}
.displayTable td, .displayTable th {
    border: 1px solid black;
    padding: 5px;
}
</style>
