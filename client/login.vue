<template>
    <div class="content">
        <logo />
        <div class="errorMessage" v-if="hasError">Username or password was incorrect.</div>
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
            <gradient-button
                style="margin-top: 5px; margin-right: 0px;"
                ref="button"
                @click="submit">LOGIN</gradient-button>
        </div>
	</div>
</template>

<script>
module.exports = {
    data() {
        return {
            hasError: false
        };
    },
    methods: {
        checkEnter(e) {
            const key = e.keyCode || e.which;
            if (key === 13) {
                this.$refs.button.$el.click();
            }
        },
        submit() {
            const username = this.$refs.username.value;
            const password = this.$refs.password.value;
            this.root.login(username, password, (err, data) => {
                if (err) {
                    this.hasError = true;
                    return;
                }
                this.root.loginSuccess(data, username);
            });
        }
    },
    components: {
        gradientButton: require('./gradient-button.vue'),
        logo: require('./logo.vue')
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
