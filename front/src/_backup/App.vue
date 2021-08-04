<template>
    <div id="app">
        Test Websockets
        <br>
        <button @click="produceEvent" style="margin-bottom: 20px;">
            Send event
        </button>
        <div>
            <span v-for="(event, i) in events" :key="i" style="display: block;">
                {{ event }}
            </span>
        </div>
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
    data() {
        return {
            events: [],
        }
    },
    methods: {
        produceEvent: function () {
            fetch('http://localhost:8080/websockets/test')
            this.events.push('event was triggered')
        }
    },
    mounted() {
        window.Echo.channel('notifications')
            .listen('NotificationEvent', function (data) {
                this.events.push('event was received: ' + JSON.stringify(data))
            }.bind(this))
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
