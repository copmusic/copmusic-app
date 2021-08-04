<template>

<div class="hello">
    <h1>Вы авторизованы!</h1>
	{{ me }}
</div>

</template>

<script>
import AuthService from '../services/auth-service';

export default {
	name: 'Authenticated',
	data() {
		return {
			me: {}
		}
	},
	mounted() {
		AuthService.me().then(response => {
			this.me = response
		});
	}
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
