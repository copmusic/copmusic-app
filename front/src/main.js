import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8080/api/';

axios.interceptors.request.use(async config => {
    if (config.skipAuth) {
        return config;
    }

    let accessToken

    if (config.url === 'auth/refresh') {
        accessToken = store.state.auth.token
    } else {
        accessToken = await requestValidAccessToken();
    }

    return {
        ...config,
        headers: {
            common: {
                ['Authorization']: `Bearer ${accessToken}`,
            },
        },
    };
});

async function requestValidAccessToken() {
    let accessToken = store.state.auth.token;
    const now = Math.floor(Date.now() * 0.001);

    console.log(store.state.auth.tokenDecoded.exp, now, store.state.auth.tokenDecoded.exp - now)
    console.log(store.getters.isAccessTokenValid(now))

    if (store.state.auth.token && !store.getters.isAccessTokenValid(now)) {
        accessToken = store.dispatch('refresh');
    }

    return accessToken;
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
