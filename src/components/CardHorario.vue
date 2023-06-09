<template>
  <v-card>
    <v-card-title class="justify-center">Horarios Disponibles</v-card-title>
    <div class="container-Actividad">
      <v-form>
        <v-col cols="12">
          <v-select
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
          <v-row align="center" justify="space-around">
            <v-col cols="6" sm="6" md="3">
              <v-btn
                small
                block
                class="mr-4"
                color="success"
                elevation="1"
                @click.prevent="reservaCita()"
                @click.stop="dialog = true"
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
          </v-row>
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
    <v-dialog v-model="dialog" max-width="370">
      <v-card>
        <v-card-title class="text-h5">
          La reserva mas proxima seria el {{ fechaCita }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="RegistraCita()">
            Aceptar
          </v-btn>
          <v-btn color="green darken-1" text @click="closeDialog()">
            Volver
          </v-btn>
        </v-card-actions>
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
      fechaCita: "",
      dialog: false,
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
    cambiodeHoras(nuevafecha) {
      nuevafecha = new Date(nuevafecha._d).toISOString();
      let splite1 = nuevafecha.split("T")[0];
      if (this.hora > 9) {
        this.Cita.fecha_cita = new Date(
          "" + splite1 + "T" + this.hora + ":00:00"
        );
      } else {
        console.log("menor que 10");
        this.Cita.fecha_cita = new Date(
          "" + splite1 + "T0" + this.hora + ":00:00"
        );
      }
    },
    closeDialog() {
      this.$emit("close-dialog-Registrar");
      this.dialog = false;
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        html: texto,
        footer: footer,
        showCancelButton: true,
        confirmButtonText: 'Pagar ahora',
        cancelButtonText: 'Pagar despues',
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    async reservaCita() {
      let fechaHoy = new Date().getUTCDay();
      let hoy = new Date();
      if (this.Cita.fecha_cita < fechaHoy) {
        let variable = fechaHoy - this.Cita.fecha_cita;
        let numeroDias = 7 - variable;
        let nuevafecha = moment(hoy).add(numeroDias, "day");
        this.cambiodeHoras(nuevafecha);
      } else if (this.Cita.fecha_cita == fechaHoy) {
        let nuevafecha = moment(hoy).add(7, "day");
        this.cambiodeHoras(nuevafecha);
      } else {
        let variable = this.Cita.fecha_cita - fechaHoy;
        let nuevafecha = moment(hoy).add(variable, "day");
        this.cambiodeHoras(nuevafecha);
      }
      console.log(this.Cita.fecha_cita);

      let fechaPaciente = new Date(this.Cita.fecha_cita).toISOString();
      console.log({ fechaPaciente });
      this.fechaCita = fechaPaciente.split("T")[0];
      this.$emit("actualiza-turnos");
    },
    async RegistraCita() {
      console.log(this.Cita);
      this.cargaRegistro = true;
      try {
        const res = await axios.post("/Cita/RegistrarCita", this.Cita);
        let infoTurno = res.data;
        let HoraTurno = new Date(infoTurno.fecha_cita).getHours();
        let turno = {
          id_medico: infoTurno.id_medico,
          dia: infoTurno.fecha_cita,
          hora_inicio: HoraTurno.toString(),
          duracion: "60",
          id_cita: infoTurno.id,
        };
        this.cargaRegistro = false;
        this.dialog = false;
        this.closeDialog();
          const divResumen = document.createElement("div");
          divResumen.textContent = "Resumen de mi cita";
          divResumen.id = "resumen_pago";

          const nombreTratamiento = document.createElement("p");
          nombreTratamiento.textContent = "Tratamiento: ";
          divResumen.appendChild(nombreTratamiento);

          const costoTratamiento = document.createElement("p");
          costoTratamiento.textContent = "Costo total: " + infoTurno.costo;
          divResumen.appendChild(costoTratamiento);

          const htmlContent = divResumen.outerHTML;
        await this.mensaje(
            "success",
            "Listo",
            htmlContent,
            "<strong>Se le redirigira<strong>"
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {},
  validations() {
    return {};
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
.container-Actividad {
  margin: 15px;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.btn-volver {
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>
