<template>
    <v-card height:10px class="card" style="margin: 10px auto 0; width: 100%">
      <v-data-table expand-icon="$expand" :headers="headers" :items="listaCitaMedico" :search="search" class="elevation-1">
        <template v-slot:item.estado_cita="{ item }">
          <v-chip :color="getColor(item.estado_cita)" dark>
            {{ item.estado_cita }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row>
            <v-btn color="info" small dark :disabled="verificaEstado(item.estado_cita)" class="ml-4"
              @click="abrePago(item.id, item.fecha_cita,item.estado_cita)" @click.stop="dialog = true">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Pagar</span>
            </v-btn>
            <v-btn color="info" small dark class="ml-4" @click="abrirModalVisualizarReunion(item.cronograma.id)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="370">
        <v-card>
          <v-card-title class="text-h5">
            Su cita destinada para el {{ fechaCita }}
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="PagaCita()">
              Pagar
            </v-btn>
            <v-btn color="green darken-1" text @click="closeDialog()">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  
  <script>
  import axios from "axios";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "GestionarCronograma",
    components: {},
    data() {
      return {
        search: "",
        fechaCita: "",
        headers: [
          { text: "Estado", value: "estado_cita" },
          { text: "Paciente", value: "datos_generales.apellido_paterno" },
          { text: "Fecha", value: "fecha_cita" },
          { text: "Acciones", value: "actions", sortable: false },
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
      await this.obtenerCitas();
    },
    async mounted() { },
    methods: {
      ...mapActions("Citas", ["setListaCitaMedico"]),
      //obtener los citas listados
      async obtenerCitas() {
        await axios
          .get("/Cita/GetCitasxMedico?id_medico=6340f2a9dfe765c0e853e443")
          .then((x) => {
            console.log("NUEVA LISTA MEDICO")
            console.log(x.data)
            const listaCita = x.data;
            for (var i = 0; i < listaCita.length; i++) {
              listaCita[i].fecha_cita = x.data[i].fecha_cita.split("T")[0];
            }
            this.setListaCitaMedico(listaCita);
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
            this.obtenerCitas();
          })
          .catch((err) => console.log(err));
      },
    },
    computed: {
      ...mapGetters("Authentication", ["user"]),
      ...mapGetters("Citas", ["listaCitaMedico"]),
    },
  };
  </script>
  <style scoped>
  .card {
    margin: 200 px;
  }
  </style>
  