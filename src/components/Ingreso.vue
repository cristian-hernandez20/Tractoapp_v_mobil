<template>
  <v-card class="mx-auto" style="margin: 20px" width="800" elevation="24" title>
    <v-row>
      <v-card-title
        style="margin-top: 20px"
        align="center"
        justify="center"
        class="mx-auto"
      >
        <h2 class="primary--text text-center zoomIt">Registrar Movimiento</h2>
        <v-icon size="40" class="mx-1 zoomIt" color="primary"
          >mdi-car-estate</v-icon
        >
      </v-card-title>
    </v-row>

    <v-spacer></v-spacer>
    <v-card-text v-show="form.datos_viaje.estado == 0">
      <v-container>
        <v-form ref="form" class="mx-auto" lazy-validation v-model="valid">
          <v-row style="margin-left: 10px; margin-right: 10px">
            <v-row class="input-row">
              <v-col class="input-col" cols="6" sm="3" md="3" xs="3">
                <v-text-field
                  v-model="form.datos_viaje.departamento"
                  label="Departamento de viaje"
                  dense
                  required
                  disabled
                  :rules="Rules"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col class="input-col" cols="6" sm="3" md="3" xs="3">
                <v-menu
                  v-model="fecha_on"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.datos_viaje.fecha_ing"
                      label="Fecha de Viaje"
                      item-text="fecha_hoy"
                      item-value="fecha_hoy"
                      prepend-inner-icon="mdi-calendar-outline"
                      readonly
                      disabled
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
                    @input="fecha_on = false"
                    :max="fecha_hoy"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col class="input-col" cols="6" sm="3" md="3" xs="3">
                <v-text-field
                  v-model="form.datos_viaje.hora_ing"
                  label="Hora de Viaje"
                  dense
                  disabled
                  required
                  :rules="Rules"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col class="input-col" cols="6" sm="3" md="3" xs="3">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  dense
                  disabled
                  required
                  :rules="Rules"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col class="input-col" cols="6" sm="4" md="4" xs="4">
                <v-text-field
                  autofocus
                  v-model="form.datos_viaje.ciudad"
                  label="Ciudad de viaje"
                  dense
                  required
                  disabled
                  :rules="Rules"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col class="input-col" cols="6" sm="4" md="4" xs="4">
                <v-text-field
                  :value="format_num(form.datos_viaje.costo)"
                  label="Viaticos"
                  dense
                  prefix="$"
                  required
                  disabled
                  :rules="Rules"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col class="input-col" cols="6" sm="4" md="4" xs="4">
                <v-text-field
                  v-model="form.datos_viaje.novedades"
                  label="Recomendación"
                  dense
                  required
                  disabled
                  :rules="Rules"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col class="input-col" cols="6" sm="4" md="4" xs="4">
                <v-text-field
                  autofocus
                  v-model="form.nom_hospedaje"
                  label="Nombre de Hospedaje"
                  dense
                  required
                  :rules="Rules"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col class="input-col" cols="6" sm="4" md="4">
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
                      label="Fecha"
                      item-text="fecha_hoy"
                      item-value="fecha_hoy"
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
                    :max="fecha_hoy"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col class="input-col" cols="6" sm="4" md="4" xs="4">
                <v-text-field
                  :value="format_num(form.costo)"
                  @input="input_mask('costo')"
                  label="Costo del Hospedaje"
                  dense
                  prefix="$"
                  required
                  :rules="Rules"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col class="input-col" cols="6" sm="4" md="4">
                <v-autocomplete
                  v-model="form.tipo_combustible"
                  label="Tipo de Combustible"
                  dense
                  :items="tipo_combustible"
                  required
                  outlined
                  :rules="Rules"
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col class="input-col" cols="6" sm="4" md="4" xs="4">
                <v-text-field
                  v-model="form.cantidad"
                  label="Cantidad de Galones"
                  dense
                  required
                  outlined
                  type="number"
                  clearable
                  :rules="Rules"
                ></v-text-field>
              </v-col>
              <v-col class="input-col" cols="6" sm="4" md="4">
                <v-text-field
                  dense
                  label="Costo Combustible por galón"
                  :value="format_num(form.costo_combustible)"
                  @input="input_mask('costo_combustible')"
                  outlined
                  prefix="$"
                  clearable
                  :rules="Rules"
                ></v-text-field>
              </v-col>

              <v-col class="input-col" cols="6" sm="4" md="4">
                <v-text-field
                  label="Total combustible"
                  :value="format_num(form.total_combustible)"
                  @input="input_mask('total_combustible')"
                  dense
                  disabled
                  outlined
                  prefix="$"
                  clearable
                  :rules="Rules"
                ></v-text-field>
              </v-col>
              <v-col class="input-col" cols="6" sm="6" md="4">
                <v-text-field
                  v-model="form.tramo"
                  label="Tramo Peajes"
                  dense
                  required
                  outlined
                  clearable
                  :rules="Rules"
                ></v-text-field>
              </v-col>

              <v-col class="input-col" cols="6" sm="6" md="4">
                <v-text-field
                  :value="format_num(form.peajes)"
                  @input="input_mask('peajes')"
                  label="Costo de peajes-totalidad"
                  dense
                  required
                  prefix="$"
                  outlined
                  clearable
                  :rules="Rules"
                ></v-text-field>
              </v-col>

              <v-col class="input-col" cols="12" sm="12" md="12">
                <v-textarea
                  v-model="form.novedades"
                  label="Novedades..."
                  dense
                  outlined
                  clearable
                  maxlength="120"
                ></v-textarea>
              </v-col>
            </v-row>
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
    <v-row v-if="!alert" justify="center" class="ma-10">
      <v-alert border="top" colored-border type="info" elevation="2">
        Debes Seleccionar un Viaje, ve a la Opcion de "Elegir Viaje" en la parte
        superior de la pantalla
      </v-alert>
    </v-row>
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
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import { format_num, currentUser } from "../global";

export default {
  data() {
    return {
      alert: localStorage.viaje,
      snackbar: {
        estado: false,
      },
      Rules: [(v) => !!v || "Este campo es requerido"],
      dialog: false,
      valid: true,
      dialogDelete: false,
      selectedItem: 0,
      search: "",
      fecha_on: false,
      fecha_ini: false,
      hora_ini: false,

      tipo_combustible: ["Diesel", "Gasolina", "Otros"],
      editedIndex: -1,
      form: {
        fecha_ing: moment().format("YYYY-MM-DD"),
        hora_ing: moment().format("HH:mm"),
        costo: 0,
        total_combustible: 0,
        costo_combustible: 0,
        cantidad: "",
        datos_viaje: {},
        nombre: currentUser.nombres,
      },
    };
  },
  created() {
    if (localStorage.viaje) {
      const viaje = localStorage.viaje;
      let datos_viaje = JSON.parse(viaje);
      this.form.datos_viaje = datos_viaje;
      console.log(this.form.datos_viaje);
    }

    let fecha_actual = moment().locale("es");
    this.fecha_hoy = fecha_actual.format("YYYY-MM-DD");
  },
  computed: {
    ...mapState("journal", ["isLoading"]),
  },
  watch: {
    "form.costo_combustible"() {
      this.form.total_combustible =
        this.form.cantidad * this.form.costo_combustible;
    },
    "form.cantidad"() {
      this.form.total_combustible =
        this.form.cantidad * this.form.costo_combustible;
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

    ...mapActions("journal", ["createGats", "updateviaje"]),
    async editItem(item) {
      this.editedIndex = this.parqueos.indexOf(item);
      this.form = Object.assign({}, item);
      console.log(this.form);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.parqueos.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.parqueos.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    async close() {
      this.form.datos_viaje.estado = 0;
      await this.updateviaje(this.form.datos_viaje);
      localStorage.removeItem("viaje");
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
      this.form.cantidad = Number(this.form.cantidad);
      this.form.costo_combustible = Number(this.form.costo_combustible);
      try {
        this.form.datos_viaje.estado = 1;
        await this.updateviaje(this.form.datos_viaje);
        await this.createGats(this.form);
        this.msj("Gasto Agregado", "green");
      } catch (error) {
        console.error(error);
        this.msj("Ha ocurrido un Error intenta de nuevo");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.cargar();
      this.$nextTick(() => {
        localStorage.removeItem("viaje");
        this.form = "";
        location.reload();
      });
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

.sub-titulo {
  text-decoration: underline darkblue;
  color: darkblue;
}
.row + .row {
  margin-top: 10px;
  margin-bottom: 0px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin: 2px;
}
.input-col {
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  /* height: 60px; */
}
.input-row {
  /* height: 60px; */
  margin-bottom: 0px;
  margin-top: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
