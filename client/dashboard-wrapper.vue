<template>
    <div class="wrapper">
        <div class="topLeft">
            <logo style="width: 400px" />
        </div>
        <div class="topRight" style="top: 10px">
            <div class="usernameDisplay">{{ this.user.username }} ({{ this.user.elo }})</div>
        </div>
        <slot />
    </div>
</template>

<script>
module.exports = {
    name: 'dashboard-wrapper',
    props: {
        user: Object
    },
    components: {
        logo: require('./logo.vue')
    }
};
</script>

<style>
div.wrapper {
    padding: 50px;
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
