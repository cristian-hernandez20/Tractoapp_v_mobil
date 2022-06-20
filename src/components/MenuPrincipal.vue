<template>
  <v-app id="menu" class="page">
    <head_menu />
    <router-view></router-view>
  </v-app>
</template>

<script>
import head_menu from "./Head_menu.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";
import MenuPrincipal from "../listas/MenuPrincipal.json";
import dialogo_exit from "@/components/Dialogos/DialogExit.vue";

export default {
  name: "menuprincipal",

  data: () => ({
    messages: 0,
    verMenu: true,
    selectedItem: 0,
    menup: [],
    sheet: false,
    isVisible: true,
    dialog: false,
    item: "",
    ver: true,
    nombre: "",
    correo: "",
    init: "",
  }),
  created() {
    this.menup = MenuPrincipal.MenuClientes;
    this.messages = this.menup.length;
  },
  methods: {
    ...mapMutations(["reinicioAcceso"]),

    redirect_panel() {
      if (
        this.$route.path != "/panelUsuarios" &&
        this.$route.path != "/panelUsuarios/"
      ) {
        this.$router.push({ name: "panelUsuarios" });
      }
    },

    validClickOpcMenu(data) {
      this.$router.push({ path: data.route });
    },
  },
  mounted() {
    this.nombre = localStorage.getItem("nombre");
    this.correo = localStorage.getItem("correo");
    this.init = localStorage.getItem("init").slice(0, 1);
    if (this.$refs.foo) {
      this.$refs.foo.$el.focus();
    }
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.ver) {
      this.ver = localStorage.ver;
    } else {
      localStorage.getItem("ver", true);
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    },
  },
  updated() {
    if (this.$route.path == "/") {
      localStorage.ver = false;
    } else {
      this.verMenu = true;
      localStorage.ver = true;
    }
    if (localStorage.getItem("ver") === "true") {
      this.ver = true;
    } else {
      this.ver = false;
    }
  },
  computed: {
    acceso() {
      return this.$store.state.acceso;
    },
  },
  components: {
    head_menu,
    DialogExit: dialogo_exit,
  },
};
</script>
<style>
.zoomIt {
  display: block !important;
  -webkit-transition: -webkit-transform 0.4s ease-out;
  -moz-transition: -moz-transform 0.4s ease-out;
  -o-transition: -o-transform 0.4s ease-out;
  -ms-transition: -ms-transform 0.4s ease-out;
  transition: transform 0.4s ease-out;
}
.zoomIt:hover {
  -moz-transform: scale(0.9);
  -webkit-transform: scale(0.9);
  -o-transform: scale(0.9);
  -ms-transform: scale(0.9);
  transform: scale(0.9);
}
.zoomIt:-moz-focus-inner {
  -moz-transform: scale(0.9);
  -webkit-transform: scale(0.9);
  -o-transform: scale(0.9);
  -ms-transform: scale(0.9);
  transform: scale(0.9);
}
</style>
