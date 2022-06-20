<template>
  <v-container class="page">
    <v-col cols="12" sm="12" md="12">
      <v-row justify="center">
        <v-card class="mx-auto my-auto" elevation="24">
          <v-form
            class="mx-auto"
            ref="form"
            v-model="valid"
            lazy-validation
            style="margin-top: 2px; margin-left: 45px"
          >
            <v-card-title class="primary--text text-center">
              Configurar cuenta del usuario
            </v-card-title>
            <v-text-field
              @keydown="checkKey"
              style="margin-left: 45px; margin-right: 45px"
              ref="nombre"
              autofocus
              v-model="cuenta.nombres"
              :rules="nombreRules"
              label="Nombres"
              required
              outlined
              dense
              maxlength="15"
            ></v-text-field>
            <v-text-field
              @keydown="checkKey"
              dense
              style="margin-left: 45px; margin-right: 45px"
              ref="apellido"
              v-model="cuenta.apellidos"
              :rules="apellidoRules"
              label="Apellidos"
              required
              outlined
            ></v-text-field>
            <v-text-field
              @keydown="checkKey"
              dense
              style="margin-left: 45px; margin-right: 45px"
              ref="apellido"
              v-model="cuenta.init"
              :rules="apellidoRules"
              label="Nombre de usuario"
              required
              outlined
            ></v-text-field>

            <v-text-field
              dense
              @keydown="checkKey"
              style="margin-left: 45px; margin-right: 45px"
              ref="email"
              v-model="cuenta.correo"
              :rules="emailRules"
              label="Correo Electronico"
              required
              outlined
            ></v-text-field>

            <v-text-field
              dense
              @keydown="checkKey"
              ref="password"
              style="margin-left: 45px; margin-right: 45px"
              v-model="cuenta.password"
              required
              maxlength="15"
              :rules="contraseñaRules"
              placeholder="Ingresa Contraseña"
              outlined
              label="Contraseña"
              color="primary"
              autocomplete="true"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              dense
              @keydown="checkKey"
              ref="passwordcon"
              v-model="cuenta.confirmarcontraseña"
              style="margin-left: 45px; margin-right: 45px"
              required
              outlined
              maxlength="15"
              :rules="[
                () =>
                  cuenta.password == cuenta.confirmarcontraseña ||
                  'La contraseña no coinciden',
              ]"
              placeholder="Ingresa Contraseña"
              label="Confirmar contraseña"
              color="primary"
              autocomplete="true"
              :type="showPassword1 ? 'text' : 'password'"
              :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword1 = !showPassword1"
            ></v-text-field>
            <v-btn
              dense
              justify="center"
              :disabled="!valid"
              style="margin-bottom: 5px; margin-left: 35%"
              color="success"
              @click="saveUser"
              :loading="isLoading"
            >
              Guardar&nbsp;
            </v-btn>
          </v-form>
        </v-card>
      </v-row>
    </v-col>
    <v-snackbar
      v-model="snackbar.estado"
      :color="snackbar.color"
      :timeout="1500"
      bottom
      left
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon dark text @click="snackbar.estado = false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "Panel_Usuarios",
  data: () => ({
    snackbar: {
      estado: false,
    },
    valid: true,
    showPassword: false,
    showPassword1: false,
    cuenta: {},
    num: 0,

    nombreRules: [
      (v) => !!v || "Nombre es requerido",
      (v) => (v && v.length <= 30) || "Nombre no puede tener mas de 30 letras",
    ],
    apellidoRules: [
      (v) => !!v || "Apellido es requerido",
      (v) =>
        (v && v.length <= 30) || "Apellido no puede tener mas de 30 letras",
    ],
    contraseñaRules: [
      (v) => !!v || "Contraseña es requerida",
      (v) => (v && v.length <= 30) || "Contraseña no valida",
      (v) => (v && v.length >= 5) || "Contraseña muy corta",
    ],
    emailRules: [
      (v) => !!v || "Correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "Correo invalido",
    ],
  }),

  props: {
    dialog: Boolean,
  },
  watch: {},
  computed: {
    ...mapState("journal", ["isLoading"]),
    ...mapState("journal", ["cuentaActual"]),
    ...mapGetters("journal", ["getCuentas"]),

    // ...mapState("journal", ["cuenta"]),
  },
  methods: {
    ...mapMutations("journal", ["cargar"]),
    ...mapActions("journal", ["updateCuenta"]),
    ...mapActions("journal", ["cargarUser"]),
    async saveUser() {
      this.cargar();
      try {
        await this.updateCuenta(this.cuenta);
        localStorage.auth_code = btoa(JSON.stringify(this.cuenta));
        this.msj("Usuario Modificado Correctamente", "green");
      } catch (error) {
        console.error(error);
        this.msj("Ha ocurrido un Error intenta de nuevo");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.cargar();
      location.reload();
    },
    msj(text, color) {
      this.snackbar.estado = true;
      this.snackbar.text = text;
      this.snackbar.color = color ? `${color} darken-2` : "red darken-3";
    },
    checkKey(event) {
      switch (event.which) {
        case 27: //Codigo-Scp
          if (this.num > 0 && this.num <= 4) {
            this.num = this.num - 1;
            switch (this.num) {
              case 0:
                this.$refs.nombre.focus();
                break;
              case 1:
                this.$refs.apellido.focus();
                break;
              case 2:
                this.$refs.email.focus();
                break;
              case 3:
                this.$refs.password.focus();
                break;
              case 4:
                this.$refs.passwordcon.focus();
                break;
            }
          }
          break;
        case 13: //Codigo-Enter
          if (this.num < 4) {
            this.num = this.num + 1;
            switch (this.num) {
              case 1:
                this.$refs.apellido.focus();
                break;
              case 2:
                this.$refs.email.focus();
                break;
              case 3:
                this.$refs.password.focus();
                break;
              case 4:
                this.$refs.passwordcon.focus();
                break;
            }
          }
          break;
        default: //Teclas-Defaul
          break;
      }
    },

    validate() {
      this.cargar();
      return this.$refs.form.validate();
    },
    cuentaSession() {
      let cuenta = JSON.parse(atob(localStorage.auth_code));
      this.cuenta = cuenta;
    },
  },

  created() {
    this.cargarUser();
    this.cuentaSession();
  },
};
</script>
