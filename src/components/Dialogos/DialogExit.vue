<template>
  <v-dialog v-model="dialog" persistent max-width="550">
    <v-card>
      <v-card-title class="primary--text text-center">
        ¡Advertencia!
      </v-card-title>
      <v-card-text>¿Estas seguro que deseas salir?</v-card-text>
      <v-card-actions @keyup="checkKey">
        <v-spacer></v-spacer>
        <v-btn
          tabindex="1"
          autofocus
          ref="select"
          color="green darken-1"
          text
          @click="
            reinicioAcceso();
            salir();
          "
        >
          Salir
        </v-btn>
        <v-btn ref="cancel" color="error" text @click="cancelar">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "dialogo_exit",
  data: () => ({}),
  props: {
    dialog: Boolean,
  },

  methods: {
    checkKey(event) {
      switch (event.which) {
        case 27: //scp
          this.$emit("dialog");
          break;
        case 39: //derecha
          this.$refs.cancel.$el.focus();
          break;
        case 37: //derecha
          this.$refs.select.$el.focus();
          break;
        default:
          //teclas por defaul
          break;
      }
    },
    salir() {
      sessionStorage.removeItem("auth_code");
      localStorage.removeItem("viaje");
      location.reload();
    },
    ...mapMutations("journal", ["reinicioAcceso"]),
    cancelar() {
      this.$emit("cancelarSalir");
    },
  },
  watch: {
    dialog() {
      if (!this.dialog) return;
      requestAnimationFrame(() => {
        this.$refs.select.$el.focus();
      });
    },
  },
};
</script>
