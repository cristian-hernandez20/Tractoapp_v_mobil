import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import es from "vuetify/es5/locale/es";
import { VueMaskDirective } from "v-mask";

Vue.directive("mask", VueMaskDirective);

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
    current: "es",
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        prim: "#00ff66",
        primary: "#076A16",
        secondary: "#07270C",
        tertiary: "21969c",
        background: "#ececf5",
        accent: "#71c3c7",
        error: "#AC4421",
        info: "#E78A1B",
        salir: "#09696e",
        success: "#127406",
        warning: "#FFC107",
      },
    },
  },
});
