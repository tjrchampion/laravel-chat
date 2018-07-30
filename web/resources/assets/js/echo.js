import Bus from './bus';

import Vue from 'vue';
import Notifications from 'vue-notification'

Vue.use(Notifications);

window.Echo.join('chat')
    .here((users) => {
        Bus.$emit('users.here', users);
    })
    .joining((user) => {
        Bus.$emit('users.joined', user);
        Vue.notify({
            group: 'foo',
            title: user.name + ' has Joined',
            text: ''
          });    
    })
    .leaving((user) => {
        Bus.$emit('users.left', user);
        Vue.notify({
            group: 'foo',
            title: user.name + ' has Disconnected',
            text: 'This user is no longer online'
          });
    })
    .listen('Chat.MessageCreated', (e) => {
        Bus.$emit('message.posted', e.message);
    });