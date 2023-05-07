<template>
  <v-card
    class="mx-auto"
    style="
      box-shadow: 0 8px 32px rgb(47 60 74 / 1%), 0 8px 16px rgb(47 60 74 / 2%);
    "
    :class="{ 'pa-4': padding, cardClass }"
    :color="$vuetify.theme.dark && color == 'white' ? 'dark' : color"
    :dark="$vuetify.theme.dark"
    max-width="100%"
  >
    <v-card-title class="">Registrar Cita</v-card-title>
    <div class="container-Especialidad">
      <v-form>
        <v-col cols="12">
          <v-select
            :items="Semana"
            item-text="text"
            item-value="value"
            v-model="Cita.fecha_cita"
            outlined
            label="Dia de la semana"
            :required="true"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            :items="listaTratamiento" 
            item-text="descripcion"
            item-value="id"
            v-model="id_tratamiento"
            outlined
            label="Tratamiento"
            :required="true"
          ></v-select>
          <v-text-field
          :disabled="complejidadTratamiento()"
            label="Cantidad de tratamientos"
            v-model="cantidadTratamiento"
            class="mb-3"
            @blur="$v.cantidadTratamiento.$touch()" :error-messages="errorNombre"
            
          />
        </v-col>
        <v-col cols="12">
          <v-select
            :items="listaMedico"
            item-text="datos_generales.apellido_paterno"
            item-value="id"
            v-model="Cita.id_medico"
            outlined
            label="Medico"
            :required="true"
            

          ></v-select>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click.prevent="registrarCita"
              >Buscar</v-btn
            >
          </v-col>
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Buscando horario disponible</v-card-title
        >
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
    <v-dialog persistent v-model="dialogoRegistrar" max-width="320px">
      <VisualizarHorario
        v-if="dialogoRegistrar"
        :Horario="Horario"
        :Cita="Cita"
        @close-dialog-Registrar="closeDialogRegistrar()"
        @actualiza-turnos="obtieneTurnosporMedico()"
      >
      </VisualizarHorario>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";

import vue2Dropzone from "vue2-dropzone";
import moment from "moment";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapGetters, mapActions } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
import VisualizarHorario from "@/components/CardHorario.vue";
export default {
  name: "RegistrarCita",
  props: {
    color: {
      type: String,
      default: "white",
    },
    cardClass: {
      type: String,
      default: "",
    },

    padding: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VisualizarHorario,
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      cantidadTratamiento:1,
      listaFinal: [],
      Horario: {},
      complejidad:0,
      id_tratamiento:"",
      Cita: {
        id_medico: "",
        id_paciente: "",
        tratamiento: [],
        fecha_cita: "",
        estado_cita: "Sin Pagar",
      },
      listaTratamiento: [],
      cargaRegistro: false,
      listaMedico: [],
      Semana: [
        {
          value: 1,
          text: "Lunes",
        },
        {
          value: 2,
          text: "Martes",
        },
        {
          value: 3,
          text: "Miercoles",
        },
        {
          value: 4,
          text: "Jueves",
        },
        {
          value: 5,
          text: "Viernes",
        },
      ],
      date: null,
      listaRango: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      dialogoRegistrar: false,
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
    await this.obtenerTratamientos();
    await this.obtenerMedicos();
  },
  methods: {
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    async verificaTramiento(){
      await axios
        .get("/Tratamiento/GetIDTratamiento?id="+this.id_tratamiento)
        .then((res) => {
          console.log
          this.complejidad=res.data.complejidad       
        })
        .catch((err) => console.log(err));
    },
    complejidadTratamiento(){
      if(this.id_tratamiento!=null)
     { this.verificaTramiento()
      console.log(this.complejidad)
       if(this.complejidad>=3) 
       {
        this.cantidadTratamiento=1;
        return true;}}
    },
    closeDialog() {
      this.$emit("close-dialog-Registrar");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async obtenerTratamientos() {
      await axios
        .get("/Tratamiento/GetAllTratamiento")
        .then((res) => {
          this.listaTratamiento = res.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerMedicos() {
      await axios
        .get("/Medico/GetAllMedico")
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            let nombreCompleto = "".concat(
              res.data[i].datos_generales.nombre,
              " ",
              res.data[i].datos_generales.apellido_paterno,
              " ",
              res.data[i].datos_generales.apellido_materno
            );
            this.listaMedico.push(nombreCompleto);
          }
        })
        .catch((err) => console.log(err));
    },
    pushListaTratamientos(){

      for(let i=0;i<3;i++)
      {this.Cita.tratamiento.push(this.id_tratamiento)}
    },
    async infoPaciente(){
      await axios
        .get("/Paciente/GetPacienteID?id="+this.user.myID)
        .then((res) => {
         
          this.Cita.id_paciente = res.data.id;
        })
        .catch((err) => console.log(err));


    },
    async registrarCita() {
    this.infoPaciente();
    this.pushListaTratamientos();
      //this.cargaRegistro = true;
     await axios
        .get("/Turnos/GetTurnosxMedico?id_medico=" + this.Cita.id_medico)
        .then((res) => {
          let listaDia = [];

          
          let listaTurnos = res.data;
          for (var i = 0; i < listaTurnos.length; i++) {
            let dia = new Date(listaTurnos[i].dia).getDay();
            let a = new Date(listaTurnos[i].dia);
            let diaHoy = new Date();
            if (diaHoy <= a) {
              if (dia == this.Cita.fecha_cita) {
                listaDia.push(listaTurnos[i]);
              }
            }
          }
          let listaHora = [];
          for (var j = 0; j < listaDia.length; j++) {
            let listaHorafake = [];
            listaHorafake = new Date(listaDia[j].dia).getHours(); 
            listaHora.push(listaHorafake);
          }

          for (var k = 0; k < listaHora.length; k++) {
            for (var i = 0; i < this.listaRango.length; i++) {
              if (listaHora[k] != this.listaRango[i]) {
                this.listaRango = this.listaRango.filter(
                  (item) => item !== listaHora[k]
                );
              }
            }
          }
          console.log("CITA REGISTRADA")
          this.listaFinal = this.listaRango;
          let nuevalistaRango = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
          this.listaRango = nuevalistaRango;
          this.cargaRegistro = false;
          this.abrirDialogo();
          //  this.closeDialog();
        })
        .catch((err) => console.log(err));
    },
    async obtieneTurnosporMedico() {
      await axios
        .get("/Turnos/GetTurnosxMedico?id_medico=" + this.Cita.id_medico)
        .then((res) => {})
        .catch((err) => console.log(err));
    },
    async abrirDialogo() {
      console.log(this.Cita.fecha_cita);
      this.dialogoRegistrar = !this.dialogoRegistrar;
      this.Horario = this.listaFinal;

      ////////////////////////////////////////////////////////////////////////////////////////
      //falta limpiar medicos dia y tratamiento
    },
    closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
  },

  computed: {
    ...mapGetters("Authentication", ["user"]),
    errorNombre() {
            const errors = [];
          //  if (!this.$v.paciente.nombre.$dirty) return errors;
            !this.$v.cantidadTratamiento.required &&
                errors.push("Debe ingresar la cantidad de tratamientos que desee");
                !this.$v.cantidadTratamiento.type &&
                errors.push("Debe ingresar solo numeros");
                !this.$v.cantidadTratamiento.minLength &&
                errors.push("La cantidad no debe pasar de 1 digito");
                !this.$v.cantidadTratamiento.validator &&
                errors.push("La cantidad debe ser menor que 3");
                !this.$v.cantidadTratamiento.validator &&
                errors.push("La cantidad debe ser mayor que 0");
            return errors;
        },
  },
  validations() {
    return {
            cantidadTratamiento:{required,minLength:minLength(1), type:Number,default:0,validator:function(cantidadTratamiento){return cantidadTratamiento<=3},ayuda:function(cantidadTratamiento){return cantidadTratamiento>0}}
        };  },
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: blue;
  padding-top: 7%;
  text-align: center;
}

.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;
}
.filas {
  margin: 2% 8% 5% 8%;
}
.filas2 {
  margin-top: 4%;
  margin-bottom: 1%;
}
.btn-registrar {
  background: green;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.container-Especialidad {
  margin: 15px;
}
.btn-volver {
  background: blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>
