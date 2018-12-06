<template>
    <div class="chatBox">
        <div class="messages">
            <span v-for="message in messages" v-bind:key="message.id">
                <b>{{ message.author }}</b>: {{ message.content }}
            </span>
        </div>
        <input type="text" class="chatInput" @keydown="onKey" ref="chatInput">
    </div>
</template>

<script>
const Game = require('./game.vue');

module.exports = {
    name: 'chat-box',
    props: {
        game: Game
    },
    data: {
        messages: []
    },
    methods: {
        onKey(e) {
            const code = e.keyCode || e.which;
            if (code === 13) {
                this.game.sendChat(this.$refs.chatInput.value);
                this.$refs.chatInput.value = "";
            }
        }
    }
};
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  background: #ddd;
  border-radius: 5px;
}

div.chatBox {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0px;
}
div.messages {
    width: 400px;
    height: 150px;
    overflow-y: scroll;
    background-color: rgba(0, 0, 0, 0.8);
}
input.chatInput {
    border: 0px;
    margin: 0px;
    padding: 5px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
