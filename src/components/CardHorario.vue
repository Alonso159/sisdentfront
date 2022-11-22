<template>
  <v-card>
    <v-card-title class="justify-center">Horarios Disponibles</v-card-title>
    <div class="container-Actividad">
      <v-form>
        <v-col cols="12">
          <v-select
            autofocus:true
            :items="this.Horario"
            item-text="nombre"
            item-value="id"
            v-model="hora"
            outlined
            label="Seleccione su Horario"
            :required="true"
          ></v-select>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="6" sm="6" md="3">
            <v-btn
              small
              block
              class="mr-4"
              color="success"
              elevation="1"
              @click.prevent="reservaCita()"
              >Registrar</v-btn
            >
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-btn
              small
              block
              class="mr-4"
              color="error"
              elevation="1"
              @click.prevent="closeDialog()"
              >Cancelar</v-btn
            >
          </v-col>
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Reservando la Cita</v-card-title>
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
import axios from "axios";
import Vuelidate from "vuelidate";
import moment from "moment";
import {
  required,
  minLength,
  email,
  numeric,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "RegistrarActividad",
  props: ["Horario", "Cita"],
  components: {},
  data() {
    return {
      hora: 0,
      date: new Date(),
      dialogoRegistrar: false,
      cargaRegistro: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {},
  methods: {
    closeDialog() {
      this.$emit("close-dialog-Registrar");
    },
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
    async reservaCita() {
      let fechaHoy = new Date().getUTCDay();
      let hoy=new Date();
      if(this.Cita.fecha_cita<=fechaHoy){
       let variable= fechaHoy-this.Cita.fecha_cita
       let numeroDias= 7-variable
        let nuevafecha= moment(hoy).add(numeroDias,"day")
       
     nuevafecha= new Date(nuevafecha._d).toISOString();
     let splite1=nuevafecha.split("T")[0]
     this.Cita.fecha_cita=new Date(""+splite1+"T09:00:00");

      }
      
      /*      await axios
     .get("/Turnos/GetTurnosxMedico?id_medico=" + this.Cita.id_medico)
        .then((res) => {
           //this.cargaRegistro = true;
          let listaDia = [];
          let listaTurnos = res.data;
          for (var i = 0; i < listaTurnos.length; i++) {
            let dia = new Date(listaTurnos[i].dia).getHours();
            console.log({dia})
            /*if (dia == this.Cita.fecha_cita) {
              listaDia.push(listaTurnos[i]);
            }*/
      //  }
      //     let listaHora = [];
      /*  for (var j = 0; j < listaDia.length; j++) {
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
           
          }*/

      //   this.listaFinal = this.listaRango;
      //   this.cargaRegistro = false;
      //   this.abrirDialogo(this.listaFinal);
      //  this.closeDialog();
      /*   })
        .catch((err) => console.log(err)); */
    },
  },
  computed: {},
  validations() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
/*.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}*/
/*.estilo-stepper {
  padding-top: 2%;
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
  background: $green;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.container-Especialidad {
  margin: 15px;
}*/
.btn-volver {
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>
