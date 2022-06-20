<template>
  <v-footer color="#313431">
    <v-row no-gutters align="center" justify="center">
      <v-col cols="4" md="3" sm="3" xs="12">
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="white" dark v-bind="attrs" v-on="on">
              <v-icon> mdi-menu </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(opc, index) in menup"
              :to="opc.route"
              :key="index"
            >
              <v-list-item-title>{{ opc.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="4" md="3" sm="3" xs="3">
        <h1 class="text-center white--text" @click="redirect_inicio()">
          Viajes
        </h1>
      </v-col>
      <v-col cols="4" sm="3" md="3" xs="3">
        <div class="text-end">
          <v-btn @click="dialog = true" color="white" text justify="end">
            <v-icon color="white" size="30">mdi-exit-to-app </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <DialogExit
      v-model="dialog"
      :dialog="dialog"
      @cancelarSalir="dialog = false"
      @dialog="dialog = false"
    ></DialogExit>
  </v-footer>
</template>
<script>
import dialogo_exit from "./Dialogos/DialogExit.vue";
import DialogExit from "@/components/Dialogos/DialogExit.vue";
import MenuPrincipal from "../listas/MenuPrincipal.json";

export default {
  components: { DialogExit },
  name: "head_menu",
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    items: ["default", "absolute", "fixed"],
    padless: false,
    variant: "default",
    menup: [],
    dialog: false,
  }),
  updated() {},
  mounted() {
    const auth = sessionStorage.auth_code;
    const currentUser = auth ? JSON.parse(atob(auth)) : null;
    console.log(currentUser);
    if (currentUser.admi == true) {
      this.menup = MenuPrincipal.MenuPrincipal;
    } else {
      this.menup = MenuPrincipal.MenuClientes;
    }
  },
  methods: {
    redirect_inicio() {
      if (this.$route.path != "/inicio" && this.$route.path != "/inicio/") {
        this.$router.push({ name: "inicio" });
      }
    },
  },
  component: {
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
