import axios from 'axios';

const AUTH_PREFIX = 'auth/';

class AuthService {
    login(form) {
        return axios
            .post(AUTH_PREFIX + 'login', form, { skipAuth: true })
            .then(response => {
                if (response.data.access_token) {
                    return response.data.access_token;
                }

                return response.data;
            });
    }

    register(form) {
        return axios
            .post(AUTH_PREFIX + 'register', form, { skipAuth: true })
            .then(response => {
                if (response.data.access_token) {
                    return response.data.access_token;
                }

                return response.data;
            });
    }

    refresh() {
        return axios
            .post(AUTH_PREFIX + 'refresh')
            .then(response => {
                if (response.data.access_token) {
                    return response.data.access_token;
                }

                return response.data;
            });
    }

    logout() {
        return axios.post(AUTH_PREFIX + 'logout');
    }

    me() {
        return axios
            .post(AUTH_PREFIX + 'me', {}, { skipAuth: false })
            .then(response => {
                return response.data;
            });
    }
}

export default new AuthService();
