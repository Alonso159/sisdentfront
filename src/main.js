import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios';
import VueMeta from 'vue-meta';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import '../src/assets/css/estilos3.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(VueAxios, axios);
Vue.component("VuePerfectScrollbar", VuePerfectScrollbar);

const BaseUrl = "http://localhost:40650"
axios.defaults.baseURL = `${BaseUrl}/api`;
Vue.prototype.$httpRequest = BaseUrl;
axios.interceptors.request.use(config => {

    if (localStorage.getItem("token")) {

        config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    return config;
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
