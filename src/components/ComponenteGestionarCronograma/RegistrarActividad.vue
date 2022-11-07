<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Actividad</v-card-title>
    <div class="container-Actividad">
      <v-form>
        <v-col cols="12">
          <v-text-field
            v-model.trim="actividad.nombre"
            @input="$v.actividad.nombre.$touch()"
            @blur="$v.actividad.nombre.$touch()"
            label="Nombre de la actividad "
            outlined
            color="#009900"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            :items="listaRoles"
            item-text="nombre"
            item-value="id"
            v-model="actividad.rol_responsable.id_rol"
            outlined
            label="Roles"
            :required="true"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            :items="selectPrioridad"
            item-text="text"
            item-value="value"
            v-model="actividad.prioridad"
            outlined
            label="Prioridad"
            :required="true"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model.trim="actividad.horas_estimadas"
            @input="$v.actividad.horas_estimadas.$touch()"
            @blur="$v.actividad.horas_estimadas.$touch()"
            label="Horas estimadas "
            outlined
            color="#009900"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model.trim="actividad.costo"
            @input="$v.actividad.costo.$touch()"
            @blur="$v.actividad.costo.$touch()"
            label="Costo "
            outlined
            color="#009900"
          ></v-text-field>
        </v-col>
        <v-row align="center" justify="space-around">
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date1"
                  label="Fecha de Inicio"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date1"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" sm="5" md="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date2"
                  label="Fecha de Fin"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="date2"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
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
              @click.prevent="actualizarCronograma()"
              >Registrar</v-btn
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
import axios from "axios";
import Vuelidate from "vuelidate";
import {
  required,
  minLength,
  email,
  numeric,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "RegistrarActividad",
  props: ["Actividad", "Actividad2"],
  components: {},
  data() {
    return {
      listaRoles: [],
      listaModulos: [],
      listaActividades: [],
      suma: 0,
      timezone: "",
      date: null,
      date1: null,
      date2: null,
      menu2: false,
      menu1: false,
      selectPrioridad: [
        {
          value: "Alta",
          text: "Alta",
        },
        {
          value: "Media",
          text: "Media",
        },
        {
          value: "Baja",
          text: "Baja",
        },
      ],
      actividad: {
        id_actividad: "",
        nombre: "",
        prioridad: "",
        fecha_inicio: null,
        fecha_fin: null,
        horas_estimadas: 0,
        costo: 0,
        rol_responsable: {
          id_rol: "",
          nombre: "",
        },
      },
      dialogoRegistrar: false,
      cargaRegistro: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    this.obtenerRoles();
  },
  methods: {
    limpiarActividad() {
      return {
        actividad: {
          id_actividad: "",
          nombre: "",
          prioridad: "",
          fecha_inicio: null,
          fecha_fin: null,
          horas_estimadas: 0,
          costo: 0,
          rol_responsable: {
            id_rol: "",
            nombre: "",
          },
        },
      };
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
    async obtenerRoles() {
      await axios
        .get("/Cronograma/GetAllRoles")
        .then((x) => {
          this.listaRoles = x.data;
        })
        .catch((err) => console.log(err));
    },
    async actualizarCronograma() {
      // this.$v.actividad.$touch();
      /*  if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          false
        );
      } else {*/

      for (let i = 0; i < this.listaRoles.length; i++) {
        if (this.actividad.rol_responsable.id_rol == this.listaRoles[i].id) {
          this.actividad.rol_responsable.nombre = this.listaRoles[i].nombre;
        }
      }

      this.listaModulos = this.Actividad.modulo;
      var c = new Date(this.date1).toISOString();
      var a = new Date(this.date2).toISOString();
      this.actividad.fecha_inicio = c;
      this.actividad.fecha_fin = a;
      for (let j = 0; j < this.listaModulos.length; j++) {
        //Inserta actividad al modulo que esta recien creado
        if (this.Actividad.modulo[j].actividades[0].nombre == null) {
          this.Actividad.modulo[j].actividades[0] = this.actividad;
          this.Actividad.modulo[j].fecha_inicio = this.actividad.fecha_inicio;
          this.Actividad.modulo[j].fecha_fin = this.actividad.fecha_fin;
          this.Actividad.gestion.fecha_de_fin_programada =
            this.actividad.fecha_fin;
          this.Actividad.gestion.fecha_de_inicio_programada =
            this.actividad.fecha_inicio;
          // this.cargaRegistro = true;
          this.listaActividades = this.Actividad.modulo[j].actividades;
          this.Actividad.modulo[j].horas_estimadas =
            this.Actividad.modulo[j].actividades[0].horas_estimadas;
          this.Actividad.modulo[j].costo =
            this.Actividad.modulo[j].actividades[0].costo;
          var aaa = this.Actividad.modulo[j].actividades[0].horas_estimadas;
          this.Actividad.gestion.horas_estimadas = aaa;
          await axios
            .put("/Cronograma/ModificarCronograma", this.Actividad)
            .then((x) => {
              let listaE = [];
              this.listaE = x.data;
              this.calculaCosto();
              this.cargaRegistro = false;
              this.$emit("close-dialog-Registrar");

              // this.actividad=this.limpiarActividad();
            })
            .catch((err) => console.log(err));
          await this.mensaje(
            "success",
            "Listo",
            "Actividad registrada satisfactoriamente",
            "<strong>Se redirigira a la interfaz de Registrar Modulos<strong>"
          );
        }
        if (this.Actividad2 != null) {
          this.actualizaCronograma2(j);
        }
      }
    },
    async actualizaCronograma2(j) {
      if (this.Actividad.modulo[j].nombre == this.Actividad2.modulo[0].nombre) {
        this.listaActividades = this.Actividad.modulo[j].actividades;
        for (let k = 0; k < this.listaActividades.length; k++) {
          var suma = 0;
          var sumaFinal = 0;
          var sumaHoragestion = 0;
          var suma =
            parseInt(this.Actividad.modulo[j].actividades[k].costo) +
            parseInt(this.actividad.costo);
          var sumaFinal = sumaFinal + suma;
          this.Actividad.modulo[j].costo = sumaFinal;
          var sumaHoras = 0;
          var sumaHorasFinal = 0;
          var sumaHoras =
            parseInt(this.Actividad.modulo[j].actividades[k].horas_estimadas) +
            parseInt(this.actividad.horas_estimadas);
          var sumaHorasFinal = sumaHorasFinal + sumaHoras;
          this.Actividad.modulo[j].horas_estimadas = sumaFinal.toString();
          var sumaHoragestion =
            sumaHoragestion + this.Actividad.modulo[j].horas_estimadas;
          this.Actividad.gestion.horas_estimadas = sumaHoragestion.toString();
        }

        this.Actividad.modulo[j].actividades.push(this.actividad);
        //this.cargaRegistro = true;
        await axios
          .put("/Cronograma/ModificarCronograma", this.Actividad)
          .then((x) => {
            let listaE = [];
            this.listaE = x.data;
            this.calculaCosto();
            this.cargaRegistro = false;
            this.$emit("emit-obtener-Actividad");
            this.$emit("close-dialog-Registrar");

            // this.actividad=this.limpiarActividad();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "Listo",
          "Actividad registrada satisfactoriamente",
          "<strong>Se redirigira a la interfaz de Registrar Modulos<strong>"
        );
      }
    },
    async calculaCosto() {
      await axios
        .put("/Cronograma/Suma_Modulos?crono=" + this.Actividad.id)
        .then((x) => {
          let listaE = [];
          this.listaE = x.data;
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {},
  validations() {
    return {
      actividad: {
        id_actividad: "",
        nombre: "",
        prioridad: "",
        fecha_inicio: null,
        fecha_fin: null,
        horas_estimadas: 0,
        costo: 0,
        rol_responsable: {
          id_rol: "",
          nombre: "",
        },
      },
    };
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
