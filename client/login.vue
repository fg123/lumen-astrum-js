<template>
    <div class="content">
        <logo />
        <div class="errorMessage" v-if="hasError">{{ hasError }}</div>
        <div class="loginForm">
            <input
                type="text"
                placeholder="Username"
                ref="username"
                @keydown="checkEnter" /><br>
            <input
                type="password"
                placeholder="Password"
                ref="password"
                @keydown="checkEnter" /><br>
            <table style="width: 100%">
                <tr style="width: 100%">
                    <td style="width: 50%; text-align: left; padding-top: 5px; padding-left: 10px">
                        <GoogleLogin :renderParams="renderParams" :params="params" :onSuccess="onSuccess" :onCurrentUser="onSuccess">
                            Login with Google
                        </GoogleLogin>
                    </td>
                    <td style="width: 50%; text-align: right">
                        <gradient-button
                            style="margin-top: 5px; margin-right: 0px;"
                            ref="button"
                            @click="submit">LOGIN</gradient-button>
                    </td>
                </tr>
            </table>
            <table style="width: 100%;" v-if="!isProduction">
                <tr>
                    <td>
                        <gradient-button
                            ref="button"
                            style="width: 100%"
                            @click="login('test','test')">test</gradient-button>
                    </td>
                    <td>
                        <gradient-button
                            ref="button"
                            style="width: 100%"
                            @click="login('test2','test')">test2</gradient-button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <gradient-button
                            ref="button"
                            style="width: 100%"
                            @click="login('test3','test')">test3</gradient-button>
                    </td>
                    <td>
                        <gradient-button
                            ref="button"
                            style="width: 100%"
                            @click="login('test4','test')">test4</gradient-button>
                    </td>
                </tr>
            </table>
        </div>
	</div>
</template>

<script>
const { GoogleLogin } = require('vue-google-login');
const Constants = require('../shared/constants');

module.exports = {
    data() {
        return {
            hasError: "false",
            params: {
                client_id: "931239577838-1j1f1jb25jkduhupr3njdqrho1ae85bs.apps.googleusercontent.com"
            },
            renderParams: {

            },
            isProduction: Constants.IS_PRODUCTION
        };
    },
    mounted() {
        this.hasError = undefined;
        this.root.socket.on('login-failed', (reason) => {
            this.hasError = reason;
        });
    },
    methods: {
        checkEnter(e) {
            const key = e.keyCode || e.which;
            if (key === 13) {
                this.$refs.button.$el.click();
            }
        },
        onSuccess(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            this.root.glogin(id_token, (data) => {
                this.root.loginSuccess(data);
            });
        },
        login(username, password) {
            this.root.login(username, password, (data) => {
                this.root.loginSuccess(data);
            });
        },
        submit() {
            const username = this.$refs.username.value;
            const password = this.$refs.password.value;
            this.login(username, password);
        }
    },
    components: {
        gradientButton: require('./gradient-button.vue'),
        logo: require('./logo.vue'),
        GoogleLogin,
    },
    props: {
        root: Object
    },
};
</script>

<style>
div.loginForm {
    text-align:right;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
}

div.errorMessage {
    color: #ff4a4a;
    padding: 5px;
}
</style>
