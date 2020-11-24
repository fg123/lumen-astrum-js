<template>
    <div class="wrapper">
        <div class="topLeft">
            <logo style="width: 400px" />
        </div>
        <div class="topRight" style="top: 10px">
            <div class="profilePictureWrapper">
                <img :src="this.user.picture" class="profilePicture"/>
            </div>
            <div class="usernameDisplay">
                <clickToEdit :value="this.user.username" :onValueChanged="onUsernameChange"></clickToEdit>
                <gradient-button>{{ this.user.elo }} ELO</gradient-button>
                <gradient-button @click="logout">Logout</gradient-button>
            </div>
            
        </div>
        <slot />
    </div>
</template>

<script>
const Vue = require('vue');

module.exports = {
    name: 'dashboard-wrapper',
    props: {
        user: Object,
        root: Object
    },
    components: {
        logo: require('./logo.vue'),
        gradientButton: require('./gradient-button.vue'),
        clickToEdit: require('./click-to-edit.vue')
    },
    methods: {
        goBackHome() {
            window.location.reload();
        },
        onUsernameChange(oldValue, newValue) {
            this.root.socket.emit('change-username', newValue);
        },
        logout() {
            Vue.GoogleAuth.then(auth2 => {
                if (auth2.isSignedIn.get()) {
                    auth2.signOut().then(() => {
                        this.goBackHome();
                    });
                }
                else {
                    this.goBackHome();
                }
            });
        }
    }
};
</script>

<style>

img.profilePicture {
    width: 64px;
    height: 64px;
    border-radius: 5px;
}

div.profilePictureWrapper {
    display: inline-block;
    vertical-align: top;
}

div.wrapper {
    padding: 50px;
    width: 100%;
    height: 100%;
}

div.usernameDisplay:hover {
    cursor: pointer;
}

div.wrapper > div {
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
    display: inline-block;
    vertical-align: top;
}
</style>
