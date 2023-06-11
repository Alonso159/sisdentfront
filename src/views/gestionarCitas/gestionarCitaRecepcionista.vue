<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          type="category"
          category-show-all
          :categories="doctores"
          :events="eventos"
          :event-color="getEventColor"
          @change="fetchEvents"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
         <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
            <v-btn icon class="mr-4" color="orange darken-2" @click="abreDialogo()">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon class="mr-4" color="primary darken-2" @click="cambiaestadoCita(selectedEvent.id)">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
      <v-dialog persistent v-model="dialogoRegistrar" max-width="600px">
      <RegistrarPaciente
        v-if="dialogoRegistrar"
        @close-dialog-Registrar="closeDialogRegistrar()"
      >
      </RegistrarPaciente>
     </v-dialog>
     </v-col>
   </v-row>
 </template>
<script>
import axios from "axios";
import RegistrarPaciente from "@/components/RegistrarPaciente.vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { mdiAlignHorizontalCenter } from "@mdi/js";
export default {
  components: {
    RegistrarPaciente,
  },
  data() {
    return {
      listaCita: [],
      focus: '',
      eventos: [],
      doctores: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      fechaCalendario:"",
      dialogoRegistrar: false,
    }
  },
  async created() {
    await this.obtieneCitaxDia();
    await this.obtieneMedicos();
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    ...mapActions("Medico", ["setListaMedico"]),
    async obtieneCitaxDia() {
      var Hoy = moment();
      var Fecha = Hoy.format('DD-MM-YYYY');
      await axios
        .get("/Cita/GetAllCitasxdia?dia=" + Fecha)
        .then((x) => {
          this.listaCita = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtieneMedicos() {
      await axios
        .get("/Medico/GetAllMedico")
        .then((x) => {

          for (var i = 0; i < x.data.length; i++) { this.doctores.push(x.data[i].datos_generales.apellido_paterno) }
          this.setListaMedico(x.data);
        })
        .catch((err) => console.log(err));
    },
    abreDialogo(){
      this.dialogoRegistrar = !this.dialogoRegistrar;
    },
   async cambiaestadoCita(id){
   console.log(id)
      await axios
        .put("/Cita/UpdateCita?idCita="+id+"&estado=3" )
        .then((x) => {
          this.listaCita = x.data;
          this.fetchEvents()
        })
        .catch((err) => console.log(err));
      console.log(id)
    },
    closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
    
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
    async fetchEvents({ start, end }) {
      var Hoy = moment();
      var Fecha = Hoy.format('DD-MM-YYYY');
      await axios
        .get("/Cita/GetAllCitas" )
        .then((res) => {
          this.listaCita = res.data;
        })
        .catch((err) => console.log(err));
      const events = []
      for (let i = 0; i < this.listaCita.length; i++) {
        const allDay = this.rnd(0, 3) === 0
        var HoraInicio = new Date(this.listaCita[i].fecha_cita).toISOString()
        var HoradisqueFin = moment(HoraInicio).add(1,"hours");
        var Hora=new Date(HoradisqueFin).getHours()
        if(Hora==19){HoradisqueFin=moment(HoradisqueFin).subtract(1,"days")}
        var HoraFin= new Date(HoradisqueFin._d).toISOString();
        var hora=new Date(this.listaCita[i].fecha_cita).getHours()
        var newhora= hora+1
        var a=HoraInicio.split("T")[0]+"T"+hora+":00:00"
        var b=HoraFin.split("T")[0]+"T"+newhora+":00:00"
        var evento = { name: "", start: "", end: "", color: "", timed: "", category: "" }
        evento.name = this.listaCita[i].apellidoPaterno
       // evento.nombrePaciente = this.listaCita[i].apellidoPaterno
        evento.start= a
        evento.end= b
        evento.timed = !allDay
        evento.id=this.listaCita[i].id
        for (var j = 0; j < this.doctores.length; j++) {
          if (this.listaCita[i].apellidoPMedico == this.doctores[j]) {
            evento.category = this.listaCita[i].apellidoPMedico
          }
        }
        if(this.listaCita[i].estado_cita=="Sin Pagar")
       { evento.color="red"}
       if(this.listaCita[i].estado_cita=="En espera")
       { evento.color="grey"}
       if(this.listaCita[i].estado_cita=="Pagada")
       { evento.color="green"}
        events.push(evento);
      }
      this.eventos = events
     
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
  computed: {
    ...mapGetters("Medico", ["listaMedico"]),
  },
}
</script>