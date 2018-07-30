<template>
    <div class="emoji__wrap">
        <div class="emojibtn" @click="openEmoji"></div>
        <div class="emoji__panel" v-show="showEmoji">
            <input type="search" name="findEmoji" class="empji form-control" placeholder="Find an Emoji...">
            <div class="emoji__list-wrap">
                <ul class="emoji__list">
                    <li v-for="(emoji, index) in emojiList" :key="index"><a href="#" :title="emoji.name" @click="addToTextarea(emoji.char)">{{emoji.char}}</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../bus';

export default {
    props: ['body'],
    data() {
        return {
            showEmoji: false,
            emojiList: [],
        }
    },

    mounted() {
        this.getEmojis();
    },

    methods: {

        openEmoji() {
            this.showEmoji = !this.showEmoji;
        },

        getEmojis() {
            axios.get('https://unpkg.com/emoji.json@11.0.0/emoji.json').then((response) => {
                this.emojiList = response.data;
            });
        },

        addToTextarea(emoji) {
            var newMessage = this.body + emoji;
            Bus.$emit('message.emoji', newMessage);
            this.showEmoji = !this.showEmoji;
        }
    }
    
}
</script>