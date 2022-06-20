<template>
  <v-dialog v-model="estado" persistent max-width="400">
    <v-card height="100%">
      <v-card-title class="text-h6 primary--text pb-1 ml-16">
        {{ 'Registrar Usuario' }}
      </v-card-title>
      <v-card-text class="black--text pb-0">
        <v-row class="mt-2 ma-4" justify="center">
          <v-form lazy-validation v-model="valid">
            <v-col cols="12" md="12" sm="12" xs="12" class="d-flex">
              <v-text-field
                label="Nombres"
                dense
                class="ml-9"
                outlined
                required
                hide-details
                clearable
                v-model="form.nombres"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" class="d-flex">
              <v-text-field
                label="Apellidos"
                dense
                class="ml-9"
                outlined
                hide-details
                clearable
                v-model="form.apellidos"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" class="d-flex">
              <v-text-field
                class="ml-9"
                label="Nombre de Usuario"
                dense
                outlined
                hide-details
                clearable
                v-model="form.init"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" class="d-flex">
              <v-text-field
                label="Email"
                class="ml-9"
                dense
                outlined
                hide-details
                clearable
                v-model="form.correo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" class="d-flex">
              <v-text-field
                required
                maxlength="15"
                outlined
                dense
                v-model="form.password"
                placeholder="Ingresa Contraseña"
                counter="15"
                hide-details
                label="Contraseña"
                color="primary"
                autocomplete="true"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" class="d-flex">
              <v-text-field
                required
                maxlength="15"
                outlined
                dense
                hide-details
                v-model="form.confirmarcontraseña"
                placeholder="Ingresa Contraseña"
                label="Contraseña"
                color="primary"
                autocomplete="true"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
          </v-form>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="cerrar">
          Cerrar

          <v-icon>mdi-exit-run</v-icon>
        </v-btn>
        <v-btn color="green darken-1" text @click="guardar">
          Registrar
          <v-icon>mdi-content-save-check</v-icon>
        </v-btn>
      </v-card-actions>
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
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    estado: Boolean,
  },
  data() {
    return {
      snackbar: {
        estado: false,
        text: '',
        color: '',
      },
      valid: false,
      form: {
        nombres: '',
        init: '',
        apellidos: '',
        password: '',
        confirmarcontraseña: '',
        correo: '',
        admi: false,
      },
      showPassword: false,
    }
  },
  watch: {},
  computed: {},
  methods: {
    msj(text, color) {
      this.snackbar.estado = true
      this.snackbar.text = text
      this.snackbar.color = color ? `${color} darken-2` : 'red darken-3'
    },
    ...mapActions('journal', ['createcuenta']),

    async guardar() {
      if (
        [
          this.form.nombres,
          this.form.apellidos,
          this.form.password,
          this.form.init,
          this.form.confirmarcontraseña,
          this.form.correo,
        ].includes('')
      ) {
        this.msj('Verifica los Campos', 'red')
      } else {
        try {
          console.log(this.form)
          await this.createcuenta(this.form)

          this.msj('Usuario Creado Correctamente', 'green')
        } catch (error) {
          console.error(error)
          this.msj('Ha ocurrido un Error intenta de nuevo')
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.form.estado = false
        this.form = {}
        this.$emit('cerrar', false)
      }
    },

    cerrar() {
      this.form.estado = false
      this.$emit('cerrar', false)
    },
  },
}
</script>
