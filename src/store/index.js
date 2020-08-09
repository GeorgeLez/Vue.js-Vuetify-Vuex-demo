import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "@/fb";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snack: { value: false },
    displayName: "",
  },
  getters: {
    valueOfSnack(state) {
      let valuex = state.snack.value;
      return valuex;
    },
    getDisplayName(state) {
      // console.log("test", state.displayName);
      return state.displayName;
    },
  },
  mutations: {
    snackSwitch(state, payload) {
      state.snack.value = payload;
    },
    setDisplayName(state) {
      let user = auth.currentUser;
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((res) => {
          state.displayName = res.data().name;
          // console.log(state.displayName);
        });
    },
  },
  actions: {
    snackSwitch({ commit }, payload) {
      commit("snackSwitch", payload);
    },
    setDisplayName({ commit }) {
      commit("setDisplayName");
    },
  },
  modules: {},
});
