import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

import Messages from './components/Messages';
import Users from './components/Users';
import Emoji from './components/Emoji';

import moment from 'moment';
import Notifications from 'vue-notification';

import Bus from './bus';

Vue.component('fa', FontAwesomeIcon);

Vue.component('notifications', Notifications);
Vue.component('messages', Messages);
Vue.component('users', Users);
Vue.component('emoji', Emoji);


Vue.component('chat', {

    props: ['user'],

    components: {
        FontAwesomeIcon,
        Messages,
        Users,
        Emoji
    },

    data () {
        return { 
            body: null,
            bodyBackUp: null,
        }
    },

    mounted() {
        this.getEmojiMessages();
    },

    updated() {
        this.getEmojiMessages();
    },

    methods: {
        
        getEmojiMessages() {
            Bus.$on('message.emoji', ( message ) => {
                console.log('adding emoji');
                this.body = message;
            });            
        },

        handleInput (e) {
            this.bodyBackUp = this.body;
            if(e.keyCode == 13 && e.shiftKey == false) {
                e.preventDefault();
                this.sendMessage(this.body);
            }
        },

        buildTempMessage()
        {
            let tempId = Date.now();
            return {
                id: tempId,
                body: this.body,
                created_at: moment().utc(1).format('YYYY-MM-DD HH:mm:ss'),
                selfOwned: true,
                user: {
                    name: this.user.name
                }

            }
        },

        sendMessage() {
           
            if( !this.body || this.body.trim() === '' ) {
                return
            }

            let tempMessage = this.buildTempMessage();
            Bus.$emit('message.posted', tempMessage);

            axios.post('api/chat/messages', {
                body: this.body.trim()
            }).then(() => {
                console.log('posted!');
            }).catch((error) => {
                this.body = this.bodyBackUp;
                Bus.$emit('message.removed', tempMessage);
            });

            this.body = '';

        }
        

    }

});