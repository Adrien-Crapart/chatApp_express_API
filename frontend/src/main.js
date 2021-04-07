// Import des modules standards de VueJS
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import axios from 'axios';

// Import des plugins tiptapVuetify 
import './plugins/tiptap-vuetify';
import './plugins/gtag';

Vue.config.productionTip = false;

// Permet l'utilisation de cookies, identification et en-têtes d'autorisation
axios.defaults.withCredentials = true;

// Définit l'adresse d'API par défaut à utiliser
axios.defaults.baseURL = 'http://localhost:3000/api/';

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');