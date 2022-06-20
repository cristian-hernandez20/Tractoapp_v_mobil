import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import journal from "./journal";


export default new Vuex.Store({
  modules: {
    journal,
  },
});
