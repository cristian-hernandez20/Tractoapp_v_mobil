<template>
  <v-dialog v-model="dialog" persistent max-width="550">
    <v-card>
      <v-card-title class="primary--text text-center">
        ¡Advertencia!
      </v-card-title>
      <v-card-text
        >El usuario o la contraseña es incorrecta, Verifica los
        campos</v-card-text
      >
      <v-card-actions @keydown="checkKey">
        <v-spacer></v-spacer>
        <v-btn ref="select" color="red" dark @click="aceptar"> Aceptar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "dialog_valid",
  data: () => ({}),
  props: {
    dialog: Boolean,
  },
  component: {},
  created() {},
  methods: {
    aceptar() {
      this.$emit("cancelarSalir");
    },
    checkKey(event) {
      switch (event.which) {
        case 13:
          this.$emit("dialog");
          break;
      }
    },
  },
  mounted() {
    console.log("mounted start");
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
