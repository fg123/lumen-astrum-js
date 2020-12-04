<template>
    <div class="chatBox" ref="chatBox">
        <div class="messages" ref="scrollBox">
            <div v-for="(message, index) in messages"
                v-bind:key="index"
                v-bind:style="{ 'color': !message.author ? message.color: '#fff' }">
                <template v-if="message.author && game.clientState.gameState">
                    <b v-bind:style="{ 'color': message.color }"><span v-if="message.teamSend">[TEAM]</span><span v-else>[ALL]</span> {{ game.clientState.gameState.getUsername(message.author) }}</b>:&nbsp;
                </template>
                {{ message.content }}
            </div>
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
    data() {
        return {
            messages: [],
            mouseOverChatBox: false
        };
    },
    updated() {
        /* Scroll to Bottom */
        const div = this.$refs.scrollBox;
        div.scrollTop = div.scrollHeight;
    },
    mounted() {
        this.$refs.chatBox.addEventListener('mouseenter', () => {
            this.mouseOverChatBox = true;
        });
        this.$refs.chatBox.addEventListener('mouseleave', () => {
            this.mouseOverChatBox = false;
        });
        this.$refs.chatInput.disabled = true;
    },
    methods: {
        addMessage(message) {
            this.messages.push(message);
        },
        focus() {
            this.$refs.chatInput.disabled = false;
            this.$refs.chatInput.focus();
        },
        clearChat() {
            this.messages = [];
        },
        onKey(e) {
            const code = e.keyCode || e.which;
            if (code === 13 && this.$refs.chatInput.value) {
                this.game.sendChat(this.$refs.chatInput.value);
                this.$refs.chatInput.value = "";
                this.$refs.chatInput.blur();
                this.$refs.chatInput.disabled = true;
            }
            else if (code === 27) {
                this.$refs.chatInput.blur();
                this.$refs.chatInput.disabled = true;
            }
        },
        isFocused() {
            return this.$refs.chatInput === document.activeElement;
        },
        isMouseOverChatBox() {
            return this.mouseOverChatBox;
        }
    }
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  background: #666;
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
    font-size: 14px;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 2px 6px;
}
input.chatInput {
    border: 0px;
    margin: 0px;
    padding: 5px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
