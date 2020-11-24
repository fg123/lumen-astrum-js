<template>
    <div class="button" v-bind:class="{ 'large': large, 'medium': !large && medium }"
        v-on:click="$emit('click')"
        v-on:mouseover="$emit('mouseover')"
        v-on:mouseout="$emit('mouseout')">
        <slot/>
    </div>
</template>

<script>
module.exports = {
    name: 'gradient-button',
    props: {
        large: {
            type: Boolean,
            default: false
        },
        medium: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style>
div.button {
    position: relative;
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    padding: 0.3em 1.5em;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    user-select: none;
    color: white;
    background: linear-gradient(135deg, #18a3c5, #c01313);
    background-size: 400%, 400%;
    border-radius: 4px;
    transition: box-shadow .5s ease, transform .2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
    -webkit-animation: SlowMovement 8s ease infinite;
    -moz-animation: SlowMovement 8s ease infinite;
    animation: SlowMovement 8s ease infinite;
}

@-webkit-keyframes SlowMovement {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes SlowMovement {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes SlowMovement {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

div.button:hover {
    background: linear-gradient(135deg, rgb(29, 183, 214), #f51818);
    background-size: 400%, 400%;
}

div.button:active {
    box-shadow: inset 0 5px 15px rgba(0, 0, 0, .3);
}

div.button.large {
    padding: 1.2em 3em;
}

div.button.medium {
    padding: 1em 2em;
}
</style>
