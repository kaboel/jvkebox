import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        user: null,
        isLoggedIn: false,
    },
    getters: {
        getStatus: state => {
            return state.isLoggedIn;
        },
        getToken: state => {
            return state.token;
        },
        getUser: state => {
            return state.user;
        }
    },
    mutations: {
        Login(state, data) {
            state.token = data.token;
            state.user = data.user;
            state.isLoggedIn = state.token !== null;
        },
        Logout(state) {
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
        }
    },
    actions: {
        Login({commit}, data) {
            commit('Login', data);
        },
        Logout({commit}) {
            commit('Logout');
        }
    }
})
