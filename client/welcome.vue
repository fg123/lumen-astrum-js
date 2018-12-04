<template>
    <div class="content">
        <logo />
        <gradient-button large @click="goToLogin">PLAY</gradient-button>
    </div>
</template>

<script>
module.exports = {
    props: {
        root: Object
    },
    components: {
        gradientButton: require('./gradient-button.vue'),
        logo: require('./logo.vue')
    },
    methods: {
        goToLogin() {
            console.log('GoToLogin');
            this.root.goToLogin();
        }
    }
};
</script>
