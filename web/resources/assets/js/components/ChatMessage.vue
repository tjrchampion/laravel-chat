<template>
    <div :class="{'chat__message':true, 'selfowned': message.selfOwned }">
        <span class="chat__message-authed"><small><strong>{{message.user.name}}</strong> {{this.formatTime()}}</small></span>
        <p>{{message.body}}</p>
    </div>
</template>

<script>

import timeago from 'timeago.js';

export default {
    props: ['message'],

    data() {
        return {
            posted: this.message,
        }
    },
    methods: {
        formatTime() {
            timeago().format(new Date()); 
            return timeago(null, 'en_GB').format(this.posted.created_at);
        }
    }
}
</script>