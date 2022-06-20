<template>
  <v-container>
    <v-card class="mx-auto mt-8" width="310" elevation="24" tile>
      <v-row class="my-auto fill-height">
        <v-col
          style="
            margin-top: 10px;
            margin-left: 16px;
            padding-top: 0px;
            margin-bottoms: 0px;
            padding-bottoms: 0px;
          "
          cols="12"
        >
          <h5 class="text-h7 font-weight-light">Buenos dias {{ entrada }}</h5>
        </v-col>
        <v-col
          style="
            margin-top: 0px;
            padding-top: 0px;
            margin-bottom: 0px;
            padding-bottom: 0px;
          "
          cols="6"
        >
          <h5 class="font-weight-medium text-center purple--text text-h5">
            Today
          </h5>
          <h5 class="text-h7 ml-4 font-weight-light">
            {{ fecha_hoy }}
          </h5>
        </v-col>
        <v-col
          style="
            margin-top: 0px;
            padding-top: 0px;
            margin-bottoms: 0px;
            padding-bottoms: 0px;
          "
          cols="6"
        >
          <h5 class="text-h7 prim--text text-center">Completados</h5>
          <h5 :class="`text-h7    red--text text-center`">
            <a class="prim--text"> {{ get_viajes_completos.length }}/</a
            >{{ get_list_viajes.length }}
          </h5>
        </v-col>
        <v-col>
          <v-list>
            <v-divider></v-divider>
            <v-list-item-group v-model="selectedItem" color="prim">
              <template v-for="(item, i) in get_list_viajes">
                <v-divider :key="i"></v-divider>
                <v-list-item :key="i">
                  <v-row @click="elergir(item)">
                    <v-col cols="4">
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="item.ciudad"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="item.departamento"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-col>
                    <v-col cols="6" class="text-end">
                      <v-list-item-content>
                        <v-list-item-subtitle
                          v-html="item.fecha_ing"
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle
                          v-html="item.hora_ing"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-col>
                    <v-col cols="2" md="2" sm="2" xs="2">
                      <v-list-item-content>
                        <v-icon size="20" :color="item.estado ? 'red' : 'prim'"
                          >mdi-checkbox-blank-circle</v-icon
                        >
                      </v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog persistent width="400" elevation="24" v-model="estado_dialog">
      <v-card width="400" elevation="24">
        <v-card-text>
          <v-row justify="center">
            <v-col cols="12" class="mt-6">
              <h2 class="text-center">¿ Quieres Elegir este viaje?</h2>
            </v-col>
            <v-btn color="green" dark class="ma-4" @click="aceptar"
              >Aceptar</v-btn
            >
            <v-btn color="red" dark class="ma-4" @click="cerrar"
              >Cancelar</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import { format_num, currentUser } from "../global";

export default {
  data() {
    return {
      estado_dialog: false,
      selectedItem: 1,

      viajes: [],

      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
      form: {
        fecha_ing: moment().format("YYYY-MM-DD"),
        hora_ing: moment().format("HH:mm"),
        costo: 0,
        ciudad: "",
        novedades: "",
        departamento: "",
        estado: 0,
      },
      entrada: currentUser.nombres,
      viajes_completos: [],
    };
  },

  created() {
    this.cargarViajes();

    let fecha_actual = moment().locale("es");
    this.fecha_hoy = fecha_actual.format("ll");
  },

  computed: {
    get_viajes_completos() {
      this.viajes_completos = this.getViajes.filter((el) => el.estado == 1);
      return this.viajes_completos;
    },
    get_list_viajes() {
      if (currentUser.admi != true) {
        return this.getViajes.filter((el) => el.estado != 1);
      } else {
        return this.getViajes;
      }
    },
    ...mapGetters("journal", ["getViajes"]),
  },
  methods: {
    cerrar() {
      localStorage.removeItem("viaje");
      this.estado_dialog = false;
    },
    async aceptar(item) {
      this.form.estado = 1;
      await this.updateviaje(this.form);
      this.estado_dialog = false;
      this.$router.push("/Ingreso");
      // location.reload();
    },
    elergir(item) {
      localStorage.viaje = JSON.stringify(item);
      if (currentUser.admi != true) {
        this.estado_dialog = true;
        this.form = Object.assign({}, item);
      }
    },
    async cargarViajes() {
      await this.loadViajes();
      if (this.viajes.length == 0) {
        this.viajes = this.getViajes;
      }
    },
    ...mapActions("journal", ["loadViajes", "updateviaje"]),
  },
};
</script>
>
<style>
.page {
  background: url("../assets/background.png") no-repeat !important;
  /* background-size: cover !important; */
}
</style>
