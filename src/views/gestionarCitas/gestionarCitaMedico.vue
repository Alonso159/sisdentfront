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
            <v-btn color="info" dark 
              @click="abreInicioCita(item.id_paciente)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Iniciar</span>
            </v-btn>
            <v-btn color="info" small dark class="ml-4" @click="abrirModalVisualizarReunion(item.id)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script>
  import axios from "axios";
  import { mapGetters, mapActions } from "vuex";
  import ActoMedico from "@/components/ActoMedico/ActoMedico.vue";
  import moment from "moment";
  export default {
    name: "GestionarCronograma",
    components: {ActoMedico},
    data() {
      return {
        search: "",
        fechaCita: "",
        headers: [
          { text: "Estado", value: "estado_cita" },
          { text: "Paciente", value: "datos_generales.apellido_paterno" },
          { text: "Hora", value: "fecha_cita" },
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
        var Hoy = moment();
      var Fecha = Hoy.format('DD-MM-YYYY');
        await axios
          .get("/Cita/GetCitaxMedico_Dia?id_medico=63742e3c57e81730d4862a35&dia=04-07-2023")
          .then((x) => {
            const listaCita = x.data;
            for (var i = 0; i < listaCita.length; i++) {
              listaCita[i].fecha_cita = x.data[i].fecha_cita.split("T")[1];
            listaCita[i].fecha_cita = listaCita[i].fecha_cita.split("Z")[0];
            }
            this.setListaCitaMedico(listaCita);
          })
          .catch((err) => console.log(err));
      },
      closeDialogDetalle(){
        this.dialogodetalle=false


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
      
        if (estadoCita == "En espera") {
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
      abreInicioCita(id_paciente) { 
        this.idPaciente=id_paciente
      this.$router.push({ path:'/ActoMedico/'+this.idPaciente+''});
     
      this.dialogodetalle = true;
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
  