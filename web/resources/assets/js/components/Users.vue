<template>
    <div class="users__online">
        <div class="users__online-count">
            <i class="fa fa-bullhorn"></i> <small><strong>{{users.length}}</strong> {{pluralize('user', users.length)}} online</small>
        </div>
        <ul class="users__online-list">
            <li v-for="user in users" :key="user.id"><i class="fa fa-circle"></i> {{user.name}}</li>
        </ul>
    </div>
</template>

<script>

    import Bus from '../bus';
    import pluralize from 'pluralize';

    export default {
        
        data() {
            return {
                users: []
            }
        },

        methods: {
            pluralize: pluralize
        },

        mounted () {
            Bus.$on('users.here', (users) => {
                //console.log('here: ', users);
                this.users = users;
            })
            .$on('users.joined', (user) => {
                //console.log('joined: ', user);
                this.users.unshift(user);
            })
            .$on('users.left', (user) => {
                this.users = this.users.filter((u) => {
                   return u.id !== user.id;
                });
            });

        },


    }
</script>