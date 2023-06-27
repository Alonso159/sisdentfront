<template>
  <v-card>
    <v-card-title class="justify-center">Resumen Pago</v-card-title>
    <div class="container-Actividad">
      <v-form>
        <v-col cols="12">
          <v-text-field
            disable
            v-model.trim="this.objetoCita.tratamiento"
            label="Nombre del tratamiento "
            outlined
            color="#009900"
          ></v-text-field>
        </v-col>
        
        
        <v-col cols="12">
          <v-text-field
          disable
          v-model.trim="this.objetoCita.costo"
            label="Costo "
            outlined
            color="#009900"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
          disable
            v-model.trim="this.objetoCita.fecha"
            label="Hora "
            outlined
            color="#009900"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
          disable
            v-model.trim="this.objetoCita.duracion"
            label="Duracion "
            outlined
            color="#009900"
          ></v-text-field>
        </v-col>
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="6" sm="6" md="3">
            <v-btn
              small
              block
              class="mr-4"
              color="success"
              elevation="1"
              @click="modificaUsuario()"
              href=/dashboard-management
              >Pagar Ahora</v-btn
            >
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-btn
              small
              block
              class="mr-4"
              color="success"
              elevation="1"
              href=/dashboard-management
              >Pagar Despues</v-btn
            >
          </v-col>
          
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Registrando Modulo</v-card-title>
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="blue"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight: bold; text-align: center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import axios from "axios";
//import CardCita from "@/components/GestionarCitas/CardCita.vue";


export default {
  name: "CardPagos_Pendientes",
  props: ["objetoCita"],
  components: {
   // CardCita, 
  },
  async obtenerDescripcion(){


  },
  data: () => ({
    dialogReservarCita: false,
    listaCitas: [],
    actividad:{},

    search: "",
    
   
      headers: [
        { text: "Tratamiento", value: "tratamiento" },
        { text: "Dia", value:"dia"},
        { text: "Hora", value: "fecha_cita" },
        { text: "Costo", value: "costo"},
        { text: "Acciones", value: "actions", sortable: false },
      ],
      
      dialog: false,
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogocambio: false,
      dialogodetalle: false,
      estadoCita:"",
  }),
  async created() {
    console.log(this.objetoCita)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  },
  methods: {
      ...mapActions("Citas", ["setListaCitaMedico"]),
    openDialogPago_Pendiente() {
      this.openDialogPago_Pendiente = true;
    },
    closeDialogPago_Pendiente() {
      this.closeDialogPago_Pendiente = false;
    },
    closeDialog(){
      this.dialog=false
    },
    async PagaCita() {

  this.dialog = false;
  this.cargaRegistro = true;

await axios
  .put("/Cita/UpdateCita?idCita=" + this.objetoCita.id + "&estado=2")
  .then((x) => {
  })
  .catch((err) => console.log(err));
},
    async modificaUsuario(){
      this.PagaCita()
      console.log(this.user.myID)
      await axios
        .put("/UsuarioTemporal/temporalrol?user=" + this.user.myID)
        .then((x) => {
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

