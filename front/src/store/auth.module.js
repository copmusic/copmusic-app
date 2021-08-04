import AuthService from '@/services/auth-service';
import jwt_decode from "jwt-decode";

const token = localStorage.getItem('token');
const tokenDecoded = JSON.parse(localStorage.getItem('token_decoded'));

const state = {
    token: token,
    tokenDecoded: tokenDecoded,
};

const getters = {
    isAuthenticated: (state) => !!state.token,
    isAccessTokenValid: (state) => (now) => {
        return (state.tokenDecoded.exp - now) > 10
    }
};

const actions = {
    async login({ commit }, form) {
        return AuthService.login(form).then(
            token => {
                commit('loginSuccess', token);
                return Promise.resolve(token);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
        );
    },

    async register({ commit }, form) {
        return AuthService.register(form).then(
            token => {
                commit('registerSuccess', token);
                return Promise.resolve(token);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
        );
    },

    async refresh({ commit }) {
        return AuthService.refresh().then(
            token => {
                commit('refreshSuccess', token);
                return Promise.resolve(token);
            },
            error => {
                commit('refreshFailure');
                return Promise.reject(error);
            }
        )
    },

    async logout({ commit }) {
        AuthService.logout();
        commit('logout');
    },
};

const mutations = {
    loginSuccess(state, token) {
        state.token = token;
        state.tokenDecoded = jwt_decode(token);
        localStorage.setItem('token', token)
        localStorage.setItem('token_decoded', JSON.stringify(state.tokenDecoded))
    },
    loginFailure(state) {
        state.token = null;
        state.tokenDecoded = null;
        localStorage.removeItem('token')
        localStorage.removeItem('token_decoded')
    },
    registerSuccess(state, token) {
        state.token = token;
        state.tokenDecoded = jwt_decode(token);
        localStorage.setItem('token', token)
        localStorage.setItem('token_decoded', JSON.stringify(state.tokenDecoded))
    },
    registerFailure(state) {
        state.token = null;
        state.tokenDecoded = null;
        localStorage.removeItem('token')
        localStorage.removeItem('token_decoded')
    },
    logout(state) {
        state.token = null;
        state.tokenDecoded = null;
        localStorage.removeItem('token')
        localStorage.removeItem('token_decoded')
    },
    refreshSuccess(state, token) {
        state.token = token;
        state.tokenDecoded = jwt_decode(token);
        localStorage.setItem('token', token)
        localStorage.setItem('token_decoded', JSON.stringify(state.tokenDecoded))
    },
    refreshFailure(state) {
        state.token = null;
        state.tokenDecoded = null;
        localStorage.removeItem('token')
        localStorage.removeItem('token_decoded')
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}
