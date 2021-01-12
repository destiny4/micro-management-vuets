import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import "@/styles/index.scss"; // global css
import i18n from "./lang"; // internationalization
import App from "./App.vue";
import store from "./store";
import router from "./router";
import api from "@/api/";
import Cookies from "js-cookie";
import "@/icons"; // icon
import "@/utils/permission"; // permission control
import BaseComp from "@/components";
Vue.use(BaseComp);
Vue.use(ElementUI, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  i18n: (key: string, value: any[] | { [key: string]: any } | undefined) =>
    i18n.t(key, value),
});

Vue.config.productionTip = false;
Vue.prototype.$api = api;
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});
