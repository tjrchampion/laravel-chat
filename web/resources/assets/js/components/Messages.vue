<template>
    <div class="chat__inner-wrap" style="height:100%;">
        <div class="chat__loading" v-if="loading">
            <i class="fa fa-spinner fa-pulse"></i>
            <p>Putting the pieces together...</p>
        </div>
        <div class="chat__message-wrap" ref="messages" :v-cloak="loading">
            <chat-message v-for="message in messages" :key="message.id" :message="message"></chat-message>
        </div>
    </div>
</template>

<script>
    import ChatMessage from './ChatMessage.vue';

    import Bus from '../bus';

    export default {
        
        components: {
            ChatMessage
        },

        data () {
            return {
                loading: true,
                messages: {}
            }
        },

        mounted () {
            this.getChatMessages();
            this.handleScroll();
        },

        updated() {
            this.handleScroll();
        },

        methods: {
            
            getChatMessages () {
               
               axios.get('/api/chat/messages').then((response) => {
                    this.messages = response.data;
                    this.loading = !this.loading;
                });

                Bus.$on('message.posted', (message) => {
                    console.log('message.posted: ', message);
                    this.messages.push(message);
                    if(message.selfOwned === true) {
                        this.handleScroll();
                    }
                })
                .$on('message.removed', (message) => {
                    this.removeMessage(message.id);
                });

            },

            removeMessage(id) {
                this.messages = this.messages.filter((message) => {
                    return message.id !== id;
                });
            },

            handleScroll() {
                var container = document.querySelector(".chat__window");
                var scrollHeight = container.scrollHeight;
				container.scrollTop = scrollHeight;
            }
        }

    }
</script>