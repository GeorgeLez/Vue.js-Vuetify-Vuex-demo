import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#9652ff",
        secondary: "#7B5154",
        accent: "#241715",
        success: "#3cd1c2",
        info: "#ffaa2c",
        error: "#f83e70",
      },
    },
  },
});
