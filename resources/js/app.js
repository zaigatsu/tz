window.Vue = require("vue");

import App from "./App.vue";
import VueRouter from "vue-router";
import VueAxios from "vue-axios";
import axios from "axios";
import router from "./router/index";
import GlobalComponents from "./globals"
import container from  "./container"

Vue.use(GlobalComponents)
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const app = new Vue({
    el: "#app",
    router: router,
    provide: container,
    render: h => h(App)
});
