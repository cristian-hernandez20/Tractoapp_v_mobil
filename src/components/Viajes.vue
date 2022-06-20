<template>
  <v-container class="page">
    <v-card
      class="mx-auto"
      style="margin: 20px"
      width="800"
      elevation="24"
      title
    >
      <v-row>
        <v-card-title
          style="margin-top: 20px"
          align="center"
          justify="center"
          class="mx-auto"
        >
          <h2 class="primary--text text-center zoomIt">Registrar Viaje</h2>
          <v-icon size="40" class="mx-1 zoomIt" color="primary"
            >mdi-car-estate</v-icon
          >
        </v-card-title>
      </v-row>

      <v-spacer></v-spacer>
      <v-card-text>
        <v-container>
          <v-form ref="form" class="mx-auto" lazy-validation v-model="valid">
            <v-row style="margin-left: 10px; margin-right: 10px">
              <v-col cols="12" sm="4" md="4" xs="4">
                <v-menu
                  v-model="fecha_ini"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.fecha_ing"
                      label="Fecha De Salida"
                      item-text="fecha_hoy"
                      item-value="fecha_hoy"
                      hide-details
                      prepend-inner-icon="mdi-calendar-outline"
                      readonly
                      required
                      :rules="Rules"
                      v-bind="attrs"
                      v-on="on"
                      clearable
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.fecha_ing"
                    @input="fecha_ini = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4" md="4" xs="4">
                <v-dialog
                  ref="dialog1"
                  v-model="hora_ini"
                  :return-value.sync="form.hora_ing"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.hora_ing"
                      label="Hora De Salida"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                      clearable
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="hora_ini"
                    v-model="form.hora_ing"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="hora_ini = false">
                      Cancelar
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog1.save(form.hora_ing)"
                    >
                      Aceptar
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="4" md="4" xs="4">
                <v-text-field
                  :value="format_num(form.costo)"
                  @input="input_mask('costo')"
                  label="Viaticos"
                  dense
                  prefix="$"
                  required
                  :rules="Rules"
                  outlined
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="margin-left: 10px; margin-right: 10px">
              <v-col cols="12" sm="6" md="6">
                <v-autocomplete
                  @focus="cambio = 'departamento'"
                  v-model="form.departamento"
                  label="Departamento Destino"
                  :items="departamento"
                  item-value="departamento"
                  dense
                  hide-details
                  ref="departamento"
                  outlined
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-autocomplete
                  @focus="cambio = 'ciudad'"
                  :items="municipio"
                  item-value="cod"
                  item-text="text"
                  v-model="form.ciudad"
                  label="Municipio Destino"
                  ref="ciudad"
                  dense
                  hide-details
                  outlined
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row style="margin-left: 10px; margin-right: 10px">
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="form.novedades"
                  label="Recomendación..."
                  dense
                  outlined
                  clearable
                  maxlength="120"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-btn color="red darken-1" text @click="close"> Cancelar </v-btn>
            <v-btn
              color="green darken-1"
              :loading="isLoading"
              text
              :disabled="!valid"
              @click="save"
            >
              Guardar <v-icon>mdi-content-save-check-outline</v-icon>
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>
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
  </v-container>
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import { format_num, currentUser } from "../global";
import Departamento from "../listas/Departamentos.json";

export default {
  data() {
    return {
      snackbar: {
        estado: false,
      },
      departamento: Departamento.departamento,
      municipio: [],
      Rules: [(v) => !!v || "Este campo es requerido"],
      dialog: false,
      valid: true,
      dialogDelete: false,
      selectedItem: 0,
      search: "",
      fecha_ini: false,
      hora_ini: false,

      tipo_combustible: ["Diesel", "Gasolina", "Otros"],
      editedIndex: -1,
      form: {
        fecha_ing: moment().format("YYYY-MM-DD"),
        hora_ing: moment().format("HH:mm"),
        costo: 0,
        ciudad: "",
        novedades: "",
        departamento: "",
        estado: 0,
      },
    };
  },
  created() {
    let fecha_actual = moment().locale("es");
    this.fecha_hoy = fecha_actual.format("YYYY-MM-DD");
  },
  computed: {
    ...mapState("journal", ["isLoading"]),
  },
  watch: {
    "form.departamento"() {
      Departamento.departamento.forEach((u) => {
        if (this.form.departamento == u.text) {
          this.municipio = u.municipio;
        }
      });
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    ...mapMutations("journal", ["cargar"]),

    format_num,
    input_mask(obj_name, callback) {
      let val = event.target.value;
      let val_edit = val.replace(/,/g, "");
      this.$set(this.form, obj_name, val_edit);
      if (callback) callback();
    },

    ...mapActions("journal", ["createviaje"]),

    close() {
      this.$nextTick(() => {
        location.reload();
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      this.cargar();
      this.form.costo = Number(this.form.costo);
      try {
        console.log(this.form);
        await this.createviaje(this.form);
        this.msj("Gasto Agregado", "green");
      } catch (error) {
        console.error(error);
        this.msj("Ha ocurrido un Error intenta de nuevo");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.cargar();
      location.reload();
      //   this.close();
    },
    msj(text, color) {
      this.snackbar.estado = true;
      this.snackbar.text = text;
      this.snackbar.color = color ? `${color} darken-2` : "red darken-3";
    },
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
  -moz-transform: scale(1.04);
  -webkit-transform: scale(1.04);
  -o-transform: scale(1.04);
  -ms-transform: scale(1.04);
  transform: scale(1.04);
}
.zoomIt:-moz-focus-inner {
  -moz-transform: scale(1.04);
  -webkit-transform: scale(1.04);
  -o-transform: scale(1.04);
  -ms-transform: scale(1.04);
  transform: scale(1.04);
}
.sub-titulo {
  text-decoration: underline darkblue;
  color: darkblue;
}

.input-row {
  height: 60px;
}
.page {
  height: 100%;
  contain: content;
  background: url("../assets/background.png") no-repeat !important;
  /* background-size: cover !important; */
}
</style>
