<template>
    <div id="app">
        Test Websockets
    </div>
</template>

<script>

import Echo from "laravel-echo"

window.io = require('socket.io-client')

if (typeof io !== 'undefined') {
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: 'localhost:6001',
    });
}

export default {
    name: 'app',

    mounted() {
        window.Echo.channel('notifications')
            .listen('NotificationEvent', function (data) {
                /* eslint-disable no-console */
                console.log(data)
                console.log('data')
            })
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
