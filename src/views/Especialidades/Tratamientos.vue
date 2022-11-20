<template>
<v-card
    class="mx-auto"
    style="box-shadow: 0 8px 32px rgb(47 60 74 / 1%), 0 8px 16px rgb(47 60 74 / 2%);"
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
            v-model="Cita.id_tratamiento"
            outlined
            label="Tratamiento"
            :required="true"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            :items="listaMedico"
            item-text="text"
            item-value="value"
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
              @click.prevent="RegistrarCita"
              >Buscar</v-btn
            >
          </v-col>
        
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Registrando Cita</v-card-title
        >
        <div>
          <v-progress-circular
            style="display: block;margin:40px auto;"
            :size="90"
            :width="9"
            color="blue"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight:bold;text-align:center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
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
export default {
  name: "RegistrarCita",
  props: { color: {
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
    },},
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      
      Cita:{
      id_medico:"",
      id_paciente:"",
      id_tratamiento:"",
      fecha_cita:"",
      estado_cita:"Sin Pagar"
      },

      listaTratamiento:{},
      cargaRegistro: false,
      listaMedico: [
        {
          value: "6340f2a9dfe765c0e853e443",
          text: "Anghelo Flores Fano",
        },
        {
          value: "63742e3c57e81730d4862a35",
          text: "Victor Castro Chipana",
        },
      ],
      Semana: [
        {
          value: 0,
          text: "Lunes",
        },
        {
          value: 1,
          text: "Martes",
        },
        {
          value: 2,
          text: "Miercoles",
        },
        {
          value: 3,
          text: "Jueves",
        },
        {
          value: 4,
          text: "Viernes",
        },
        
      ],
      date:null,
      listaRango:[
        8,9,10,11,12,13,14,15,16,17,18     ]
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
    async obtenerTratamientos(){
      await axios
          .get("/Tratamiento/GetAllTratamiento")
          .then((res) => {
            this.listaTratamiento=res.data
          })
          .catch((err) => console.log(err));

    },
    async RegistrarCita() {
      this.Cita.id_paciente=this.user.infoUser.id
      
     // this.$v.Cita.$touch();
    
       
        //this.cargaRegistro = true;
        await axios
          .get ("/Turnos/GetTurnosxMedico?id_medico="+ this.Cita.id_medico)
          .then((res) => {
            let listaDia=[];
          let listaTurnos=res.data;
          for(var i=0;i<listaTurnos.length;i++){
            
           
            let dia=new Date(listaTurnos[i].dia).getDay();
            if(dia==this.Cita.fecha_cita){
              listaDia.push(listaTurnos[i])
            }
           
           
          }
          let listaHora=[];
          for(var j=0;j<listaDia.length;j++){
            let listaHorafake=[]
            listaHorafake=new Date(listaDia[j].dia).getHours();
            listaHora.push(listaHorafake)
          }
          let listaFinal=[]
          for(var k=0;k<listaHora.length;k++){
            for(var i=0;i<this.listaRango.length;i++)
              {
                if(listaHora[k]!=this.listaRango[i]){
                 listaFinal.push(this.listaRango[i])
               
                }
              }
            }
            console.log({listaFinal})
           // this.$emit("emit-obtener-enfermedades");
           // this.cargaRegistro = false;
          //  this.closeDialog();
          
          })
          .catch((err) => console.log(err));
       // this.obtieneTurnosporMedico();
         // this.$router.push(`pagar`);
        await this.mensaje(
          "success",
          "Listo",
          "La cita fue registrada satisfactoriamente",
        );
      
    },
    async obtieneTurnosporMedico(){
      await axios
          .get ("/Turnos/GetTurnosxMedico?id_medico="+this.Cita.id_medico)
          .then((res) => {
          console.log(res.data)
          })
      .catch((err) => console.log(err));

    },
  },

  computed: {
    ...mapGetters("Authentication", ["user"]),
  },
  validations() {
    return {

    };
  },
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
