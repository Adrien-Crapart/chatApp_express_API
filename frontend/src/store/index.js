import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        username: '',
        userId: '',
        userAdmin: '',
        token: ''
    },
    mutations: {
        // Change la valeur d'identification en true si l'utilisateur se connecte
        authentication(state, payload) {
            state.isAuthenticated = payload
        },
        // Ajoute l'utilisateur actif
        userName(state, payload) {
            state.username = payload
        },
        // Ajoute l'ID de l'utilisateur actif
        userId(state, payload) {
            state.userId = payload
        },
        // Ajoute les droits admin de l'utilisateur actif
        userAdmin(state, payload) {
            state.userAdmin = payload
        },
        // Ajoute le token de l'utilisateur actif
        userToken(state, payload) {
            state.token = payload
        },

    },
    actions: {},
    modules: {}
});