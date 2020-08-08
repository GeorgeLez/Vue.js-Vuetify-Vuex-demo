import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snack: { value: false },
  },
  getters: {
    valueOfSnack(state) {
      let valuex = state.snack.value;
      return valuex;
    },
  },
  mutations: {
    snackSwitch(state, payload) {
      // console.log("MUTATED");
      // console.log(payload);
      state.snack.value = payload;
      // setTimeout(() => (state.snack.value = !state.snack.value), 4000);
      // state.snack.value;
    },
  },
  actions: {
    snackSwitch({ commit }, payload) {
      commit("snackSwitch", payload);
    },
  },
  modules: {},
});
