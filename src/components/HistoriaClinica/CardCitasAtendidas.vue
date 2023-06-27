<template>
    <v-card height:10px class="card" style="margin: 10px auto 0; width: 100%">
      <v-data-table expand-icon="$expand" :headers="headers" :items="listaCitaMedico" :search="search" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-row>
            <v-btn color="info" small dark class="ml-4" @click="abrirModalVisualizarReunion(item.cronograma.id)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
</template>
  
  <script>
  import moment from "moment";
  import "moment/locale/es";
  import { mapGetters, mapActions } from "vuex";
  import axios from "axios";
  //import CardCita from "@/components/GestionarCitas/CardCita.vue";
  export default {
    name: "CardPagos_Pendientes",
    components: {
     // CardCita, 
    },
    
    data: () => ({
      dialogReservarCita: false,
      listaCitas: [],
      hoy: moment().format("L").replaceAll("/", "-"),
      fecha: "",
      search: "",
        fechaCita: "",
        headers: [
          { text: "Estado", value: "estado_cita" },
          { text: "Estado", value: "estado_cita" },
          { text: "Estado", value: "estado_cita" },
          { text: "Hora", value: "fecha_cita" },
          {text: "Dia", value:"dia"},
          { text: "Acciones", value: "actions", sortable: false },
        ],
        idCita:"",
        dialog: false,
        dialogoRegistrar: false,
        dialogoactualizacion: false,
        dialogocambio: false,
        dialogodetalle: false,
        estadoCita:"",
    }),
    async created() {
      this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
      await this.obteneridPaciente();
    },
    methods: {
        ...mapActions("Citas", ["setListaCitaMedico"]),
      openDialogPago_Pendiente() {
        this.openDialogPago_Pendiente = true;
      },
      closeDialogPago_Pendiente() {
        this.closeDialogPago_Pendiente = false;
      },
      Pago_Pendiente() {
        this.$router.push(`PagosPendientes`);
      },
      async obtenerCitas(idPaciente) {
        await axios
          .get("/Cita/GetCitasAtendidas?id_paciente="+idPaciente)
          .then((x) => {
            const listaCita = x.data;
            for (var i = 0; i < listaCita.length; i++) {
                listaCita[i].dia=x.data[i].fecha_cita.split("T")[0];
              listaCita[i].fecha_cita = x.data[i].fecha_cita.split("T")[1];
            listaCita[i].fecha_cita = listaCita[i].fecha_cita.split("Z")[0];
            
            }
            this.setListaCitaMedico(listaCita);
          })
          .catch((err) => console.log(err));
      },
      async obteneridPaciente() {
        await axios
          .get("/Paciente/GetPacienteID?id="+this.user.myID)
          .then((res) => {
           let idPaciente= res.data.id; 
           this.obtenerCitas(idPaciente);
          })
          .catch((err) => console.log(err));
        },
      closeDialog(){
        this.dialog=false
      },  
    },
    computed: {
      ...mapGetters("Authentication", ["user"]),
      ...mapGetters("Citas", ["listaCitaMedico"]),
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .card-c {
    padding: 1%;
    border-radius: 200px;
  }
  
  .button-89 {
    --b: 3px;   
    --s: .45em;
    --color: #373B44;
    padding: calc(.5em + var(--s)) calc(.9em + var(--s));
    color: var(--color);
    --_p: var(--s);
    background:
      conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
      var(--_p) var(--_p)/calc(100% - var(--b) - 2var(--_p)) calc(100% - var(--b) - 2*var(--_p));
    transition: .3s linear, color 0s, background-color 0s;
    outline: var(--b) solid #0000;
    outline-offset: .6em;
    font-size: 45px;
  
    border: 0;
  
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  
  .button-89:hover,
  .button-89:focus-visible{
    --_p: 0px;
    outline-color: var(--color);
    outline-offset: .05em;
  }
  
  .button-89:active {
    background: var(--color);
    color: #fff;
  }
  
  h2 {
    font-size: 18px;
    margin-top: 5%;
  }
  
  .div_reservar {
    display: flex;
  }
  .item-cita {
    margin: 4% 0;
  }
  .card {
    margin: 200 px;
  }
  </style>
  
  