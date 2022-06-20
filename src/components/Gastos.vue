<template>
  <v-card class="mx-auto" style="margin: 20px" shaped>
    <v-card-title>
      <h2>Gastos Registrados</h2>
      <v-icon class="mx-1" size="35" color="primary">mdi-cash-multiple</v-icon>
      <v-spacer></v-spacer>
      <v-col cols="6" sm="5" md="5">
        <v-text-field
          v-model="search"
          append-icon="mdi-cash-100"
          label="Buscar Gasto Realizado"
          outlined
          placeholder="Buscar Gasto"
          dense
          hide-details
        ></v-text-field>
      </v-col>
    </v-card-title>
    <v-data-table
      :items-per-page="5"
      :headers="headers"
      :items="gastos"
      :search="search"
      link
      :loading="isLoading"
      loading-text="Cargando... Porfavor Espere"
      @click="validClickOpcMenu(gastos)"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" persistent max-width="800">
            <v-card>
              <v-card-title>
                <span
                  style="font-family: cursive; cursor: pointer"
                  class="primary--text text-h5 mx-11"
                  >{{ formTitle }}&nbsp;&nbsp;
                  <v-icon color="primary" size="35">
                    {{ formIcon }}
                  </v-icon>
                </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form class="mx-auto" lazy-validation v-model="valid">
                    <v-row>
                      <v-row class="input-row">
                        <v-col cols="12" sm="4" md="4" xs="4">
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
                        <v-col cols="12" sm="4" md="4">
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
                        <v-col cols="12" sm="4" md="4" xs="4">
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
                      </v-row>
                      <v-row class="input-row">
                        <v-col cols="12" sm="6" md="5">
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
                        <v-col cols="12" sm="3" md="3" xs="3">
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
                        <v-col cols="12" sm="4" md="4">
                          <v-text-field
                            dense
                            label="Costo Combustible"
                            :value="format_num(form.costo_combustible)"
                            @input="input_mask('costo_combustible')"
                            outlined
                            prefix="$"
                            clearable
                            :rules="Rules"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="input-row">
                        <v-col cols="12" sm="4" md="4">
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
                        <v-col cols="12" sm="6" md="4">
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

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :value="format_num(form.peajes)"
                            @input="input_mask('peajes')"
                            label="Costo de peajes"
                            dense
                            required
                            prefix="$"
                            outlined
                            clearable
                            :rules="Rules"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="py-2">
                        <v-col cols="4" sm="12" md="12">
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
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  style="margin-bottom: 15px"
                  color="red darken-3"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  outlined
                  style="margin-bottom: 15px; margin-right: 5%"
                  @click="save"
                  :disabled="!valid"
                >
                  Guardar&nbsp;
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estas seguro de eliminar este Gasto?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Confirmar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="orange" small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="gastos"> Consultar de nuevo </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import { format_num, currentUser } from "../global";

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      selectedItem: 0,
      search: "",
      fecha_ini: false,
      hora_ini: false,
      valid: true,
      headers: [
        {
          text: "Hospedaje",
          align: "center",
          sortable: false,
          value: "nom_hospedaje",
        },
        {
          text: "Fecha",
          align: "center",
          sortable: false,
          value: "fecha_ing",
        },
        {
          text: "Costo Hospedaje",
          align: "center",
          sortable: false,
          value: "costo",
        },
        {
          text: "Tipo de Combustible",
          align: "center",
          sortable: false,
          value: "tipo_combustible",
        },
        {
          text: "Cantidad G.",
          align: "center",
          sortable: false,
          value: "cantidad",
        },
        {
          text: "Costo Galon",
          align: "center",
          sortable: false,
          value: "costo_combustible",
        },
        { text: "Tramo", align: "center", sortable: false, value: "tramo" },

        { text: "Acción", aling: "center", value: "actions", sortable: false },
      ],

      editedIndex: -1,
      tipo_combustible: ["Diesel", "Gasolina", "Otros"],
      form: {
        fecha_ing: moment().format("YYYY-MM-DD"),
        hora_ing: moment().format("HH:mm"),
        costo: 0,
        total_combustible: 0,
        costo_combustible: 0,
        cantidad: "",
      },
      gastos: [],
      defaultItem: {
        fecha_ing: moment().format("YYYY-MM-DD"),
        hora_ing: moment().format("HH:mm"),
        costo: 0,
        total_combustible: 0,
        costo_combustible: 0,
        cantidad: "",
      },
      Rules: [(v) => !!v || "Este campo es requerido"],
    };
  },
  created() {
    this.cargargastos();
    let fecha_actual = moment().locale("es");
    this.fecha_hoy = fecha_actual.format("YYYY-MM-DD");
  },
  detroyed() {},
  mounted() {},
  computed: {
    ...mapGetters("journal", ["getGastos"]),
    ...mapState("journal", ["isLoading"]),

    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Gasto" : "Modificar Gasto";
    },
    formIcon() {
      return this.editedIndex === -1
        ? "mdi-account-multiple-plus"
        : "mdi-credit-card-edit-outline";
    },
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
    dialogHistoria(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    format_num,
    cambiarHistoria() {
      this.estadoexamen = true;
      this.estadohistoria = false;
    },
    cambiarExamen() {
      this.estadoexamen = false;
      this.estadohistoria = true;
    },

    async cargargastos() {
      if (this.gastos.length == 0) {
        await this.loadGastos();
        this.gastos = this.getGastos;
      }
    },
    ...mapActions("journal", ["updategasto", "loadGastos", "deletegasto"]),
    ...mapMutations("journal", ["cargar"]),

    editItem(item) {
      this.editedIndex = this.gastos.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.gastos.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deletegasto(this.form.id);
      this.gastos.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialogHistoria = false;
      this.dialog = false;
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
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
      if (this.editedIndex > -1) {
        Object.assign(this.gastos[this.editedIndex], this.form);
        await this.updategasto(this.form);
      } else {
        this.gastos.push(this.form);
      }
      this.close();
    },
  },
};
</script>
