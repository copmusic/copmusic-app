<template>
    <div id="app">
        <p>
            <router-link to="/">Home</router-link> |
            <router-link to="/authenticated">For authenticated</router-link>
            <br>

            <span v-if="isLoggedIn">
                <a @click="logout">Выйти</a>
            </span>
            <span v-else>
                <router-link to="/register">Register</router-link> |
                <router-link to="/login">Login</router-link>
            </span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            await this.$router.push('/login')
        }
    },
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

.router-link-exact-active {
    color: red;
}
</style>
