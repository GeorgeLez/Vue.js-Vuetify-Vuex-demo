import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { auth } from "@/fb";
import store from "./store";

Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged((user) => {
  console.log("User from main.js :", user);
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
