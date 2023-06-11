<template>
    <v-card height:10px class="card" style="margin: 10px auto 0; width: 100%">
      <v-data-table expand-icon="$expand" :headers="headers" :items="ListInventario   " :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              solo
              reverse
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              <v-toolbar flat>
                <v-btn
                  class="mr-4"
                  color="white darken-1"
                  href="/RegistrarMaterial"
                >
                  <span>Registrar nuevo material</span>
                </v-btn>
              </v-toolbar>
            </v-col>

            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row>
            <v-btn color="info" small dark class="ml-4" @click="abrirModalVisualizar(item.inventario.id)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Visualizar</span>
            </v-btn>
            <v-btn color="primary" small dark class="ml-4" @click="abrirModalModificar(item.inventario.id)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Modificar</span>
            </v-btn>
            <v-btn color="error" small dark class="ml-4" @click="abrirModalEliminar(item.inventario.id)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Eliminar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script>
  import axios from "axios";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "GestionarInventario",
    components: {},
    data() {
      return {
        search: "",
        fechaCita: "",
        headers: [
          { text: "Nombre", value: "descripcion" },
          { text: "Reservado", value: "reservado" },
          { text: "Stock", value: "stock" },
          { text: "Estado", value: "estado"},
        ],
        idCita:"",
        dialog: false,
        dialogoRegistrar: false,
        dialogoactualizacion: false,
        dialogocambio: false,
        dialogodetalle: false,
        estadoCita:"",
      };
    },
    async created() {
      await this.obtenerInventario();
    },
    async mounted() { },
    methods: {
      ...mapActions("Inventario", ["setListaInventario"]),
      //obtener los citas listados
      async obtenerInventario() {
        await axios
          .get("/Inventario/GetAllInventario")
          .then((res) => {
            console.log("NUEVA LISTA MEDICO")
            console.log(res.data)
            
            this.setListaInventario(res.data);
          })
          .catch((err) => console.log(err));
      },
      getColor(estadoCita) {
        if (estadoCita == "Sin Pagar") {
          return "yellow";
        } else if (estadoCita == "Pagada") {
          return "green";
        } else {
          return "grey";
        }
      },
      verificaEstado(estadoCita) {
      
        if (estadoCita == "Sin Pagar") {
          return false;
        } else {
          return true;
        }
      },
      estadoActual(array) {
        if (array === "listo") {
          return false;
        } else {
          return true;
        }
      },
      abrePago(id, fecha_cita) {
        
        this.fechaCita = fecha_cita;
        this.dialog = true;
        this.idCita=id;
      
        // this.$router.push(`pagar`);
      },
      async PagaCita() {
        
        this.dialog = false;
        this.cargaRegistro = true;
        
        await axios
          .put("/Cita/UpdateCita?idCita="+this.idCita+"&estado=2")
          .then((x) => {
            this.obtenerInventario();
          })
          .catch((err) => console.log(err));
      },
    },
    computed: {
      ...mapGetters("Authentication", ["user"]),
      ...mapGetters("Inventario", ["ListInventario"]),
    },
  };
  </script>
  <style scoped>
  .card {
    margin: 200 px;
  }
  </style>
  
