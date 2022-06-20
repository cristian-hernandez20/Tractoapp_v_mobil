<template>
  <v-app max-height="730">
    <v-img width="600" contain src="../assets/background.png">
      <v-card-text class="mt-16 py-16">
        <v-form
          class="fill-height mt-16 py-16"
          ref="form"
          lazy-validation
          v-model="valid"
        >
          <v-row justify="center" style="margin-left: 20px; margin-right: 20px">
            <v-col
              class="pb-0 ma-0"
              style="margin-bottom: 0px; padding-bottom: 0px"
              cols="12"
              sm="5"
              md="5"
              xs="3"
            >
              <h1
                class="black--text text-center text-md-h4"
                style="margin-bottom: 0px; padding-bottom: 0px"
              >
                Login
              </h1>
              <v-text-field
                required
                outlined
                ref="usa"
                v-on:keydown.enter="paso()"
                label="Usuario"
                prepend-inner-icon="mdi-account-outline"
                v-model="opcion.user"
                @focus="cambio = 'user'"
                :rules="[() => opcion.user.length <= 30 || 'Usuario no valido']"
                placeholder="Ingresa Usuario o Email"
                color="primary"
                class="mt-10 py-2"
                hide-details
                elevation="12"
              />
              <v-text-field
                required
                outlined
                hide-details
                ref="password"
                v-model="opcion.password"
                @keydown="checkKey"
                v-on:keydown.enter="ingreso()"
                :rules="[
                  () =>
                    contraseña.length <= 8 ||
                    'La contraseña debe tener menos o igual a 8 caracteres',
                ]"
                placeholder="Ingresa Contraseña"
                label="Contraseña"
                color="primary"
                autocomplete="true"
                prepend-inner-icon="mdi-lock-outline"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                @focus="cambio = 'password'"
              />
            </v-col>
            <v-col cols="12" sm="5" md="5" xs="3">
              <v-btn
                color="prim black--text"
                :disabled="!valid"
                :loading="isLoading"
                depressed
                block
                height="45"
                @click="ingreso()"
                >Iniciar sesión</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <DialogValid
        v-if="this.estate === true"
        v-model="dialog"
        :dialog="dialog"
        @cancelarSalir="dialog = false"
        @dialog="dialog = false"
      ></DialogValid>
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
    </v-img>
    <registro
      :estado="dialogo_registro"
      @cerrar="dialogo_registro = false"
    ></registro>
  </v-app>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import dialog_valid from "@/components/Dialogos/DialogValid.vue";
import DialogValid from "@/components/Dialogos/DialogValid.vue";
// import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import LottieAnimation from "lottie-web-vue";
import registro from "../components/Dialogos/Registro.vue";
export default {
  components: { DialogValid, registro, LottieAnimation },
  name: "login",
  data: () => ({
    dialogo_registro: false,
    cambio: "",
    dialog: false,
    opcion: {
      user: "",
      password: "",
    },
    snackbar: {
      estado: false,
    },
    showPassword: false,
    valid: false,
    estate: false,
    contraseña: "",
    select: null,
    checkbox: false,
  }),

  created() {
    console.log("xxx");
    // this.$refs.anim.play();
    if (
      (localStorage.getItem("acceso") == "true" &&
        this.$route.path == "/Login") ||
      this.$route.path == "/login"
    ) {
      this.$router.push("/Home");
    }
  },
  methods: {
    ...mapActions("journal", ["cargarUser"]),
    ...mapMutations("journal", ["valida"]),
    ...mapMutations("journal", ["cargar"]),

    async ingreso() {
      this.cargar();

      let { user, password } = this.opcion;
      if (!user) {
        this.msj("Debe ingresar un usuario");
        this.cargar();
        this.$refs.usa.focus();
      } else {
        try {
          let res = await this.cargarUser();
          console.log(res);
          await this.valida([this.opcion]);
          if (this.acceso !== true) {
            this.dialog = true;
            this.cargar();
            this.estate = true;
          }
        } catch (error) {
          console.log(error);
          this.cargar();
          this.msj("Ha ocurrido un error durante el proceso");
        }
      }
    },
    checkKey(event) {
      switch (event.which) {
        case 27: //scp
          this.$refs.usa.focus();
          break;
      }
    },
    msj(text, color) {
      this.snackbar.estado = true;
      this.snackbar.text = text;
      this.snackbar.color = color ? `${color} darken-2` : "red darken-3";
    },
    login() {},

    paso() {
      this.$refs.password.focus();
    },
  },

  component: {
    DialogValid: dialog_valid,
  },
  computed: {
    ...mapState("journal", ["empresa"]),
    ...mapState("journal", ["acceso"]),
    ...mapState("journal", ["isLoading"]),
  },
  props: {
    source: String,
  },
  mounted() {},
  watch: {
    opcion: {
      deep: true,
      handler(opcion) {
        // opcion.user = opcion.user.toUpperCase();
        if (this.cambio === "user" && opcion.user.length === 20) {
          let password = "password";
          this.$refs[`${password}`].focus();
        }
      },
    },
  },
};
</script>
<style>
.page {
  height: 100%;
  contain: content;
  background: url("../assets/background.png") no-repeat !important;
  /* background-size: cover !important; */
}
.v-responsive__content {
  height: 900%;
  margin-bottom: 0%;
  contain: content;
}
</style>
