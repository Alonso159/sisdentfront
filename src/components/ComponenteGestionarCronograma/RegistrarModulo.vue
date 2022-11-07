<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Modulo</v-card-title>
    <div class="container-Modulo">
      <v-form>
        <v-text-field
          v-model.trim="nombreModulo"
          @input="$v.nombreModulo.$touch()"
          @blur="$v.nombreModulo.$touch()"
          :error-messages="errorNombreModulo"
          label="Titulo"
          outlined
          color="#009900"
        ></v-text-field>
        <v-select
          :items="selectTipo"
          item-text="text"
          item-value="value"
          v-model="modulos.tipo"
          menu-props="auto"
          label="Tipo"
          hide-details
          prepend-icon="mdi-microsoft-visual-studio"
          single-lin
        ></v-select>
        <v-col> </v-col>
        <v-select
          :items="selectPrioridad"
          item-text="text"
          item-value="value"
          v-model="modulos.prioridad"
          menu-props="auto"
          label="Prioridad"
          hide-details
          prepend-icon="mdi-microsoft-visual-studio"
          single-lin
        ></v-select>

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="6" sm="3" md="3">
              <v-btn
                class="mr-4"
                color="success"
                @click="actualizarCronograma()"
              >
                <span>Aceptar </span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" sm="3" md="3">
              <v-btn
                block
                right
                class="mr-4"
                color="error"
                elevation="1"
                @click="closeDialog"
                >Volver</v-btn
              >
            </v-col>
          </v-row>
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
import moment from "moment";
import RegistrarActividad from "@/components/ComponenteGestionarCronograma/RegistrarActividad.vue";

export default {
  name: "RegistrarModulo",
  props: ["Modulo"],
  components: {
    RegistrarActividad,
  },
  data() {
    return {
      hito: {
        id_pago: "",
        fecha_hito: null,
      },
      cambios:[{
            fecha_cambio:null,
            tipo:"",
            id_solicitud:"",
            descripcion:"",
        }],
      selectTipo: [
        { value: "Diseño", text: "Diseño" },
        { value: "Despliegue", text: "Despliegue" },
        { value: "Analisis", text: "Analisis" },
        { value: "Desarrollo", text: "Desarrollo" },
      ],
      selectPrioridad: [
        { value: "Alta", text: "Alta" },
        { value: "Media", text: "Media" },
        { value: "Baja", text: "Baja" },
      ],
      date1: null,
      date2: null,
      menu2: false,
      nombreModulo: "",
      Actividad: {},
      modulos: {
        tipo: "",
        prioridad: "",
      },

      dialogoRegistrarActividad: false,
      cargaRegistro: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    this.obtieneInfoCronogramaCreado();
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
      this.$emit("emit-obtener-Modulo");
      this.$emit("close-dialog-Registrar");
    },
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
    async actualizarCronograma() {
      let listaF = [];
      await axios
        .get(
          "PlantillaCrono/GetModulo_Plantilla?tipo=" +
            this.modulos.tipo +
            "&prioridad=" +
            this.modulos.prioridad
        )
        .then((x) => {
          this.listaF = x.data;
          this.listaF.modulos[0].nombre = this.nombreModulo;
          
          this.listaF.modulos[0].cambios = this.cambios;
          this.listaF.modulos[0].estado = "Activo";
          this.listaF.modulos[0].hito = this.hito;
          //  this.listaF.modulos[0].fecha_inicio=
          this.$emit("emit-obtener-Modulo");
        })
        .catch((err) => console.log(err));

      let listaE = [];
      if (this.Modulo.modulo[0] == null) {
        this.Modulo.modulo[0] = this.listaF.modulos[0];
        this.Modulo.modulo[0].fecha_inicio =this.Modulo.gestion.fecha_de_inicio_programada;
        this.Modulo.modulo[0].estado = "Activo";
        this.Modulo.modulo[0].cambios = this.cambios;
        //empieza a guardar fecha de los submodulos
        let listaSubModulos = [];
        listaSubModulos = this.Modulo.modulo[0].submodulos;
        for (let recorre = 0; recorre < listaSubModulos.length; recorre++) {
          let listaActividad = [];
          listaActividad =this.Modulo.modulo[0].submodulos[recorre].actividades;
            this.Modulo.modulo[0].submodulos[recorre].estado = "Activo";
            this.Modulo.modulo[0].submodulos[recorre].cambios = this.cambios;
            for (let correActividad = 0;correActividad < listaActividad.length;correActividad++) {
              this.Modulo.modulo[0].submodulos[recorre].actividades[correActividad].estado = "Activo";
              this.Modulo.modulo[0].submodulos[recorre].actividades[correActividad].cambios = this.cambios;
            }
          
        }
        this.cargaRegistro = true;
        await axios
          .put("/Cronograma/ModificarCronograma", this.Modulo)
          .then((x) => {
            this.listaE = x.data;
            this.cargaRegistro = false;
            this.closeDialog();

            // this.modulos=this.limpiarActividad();
          })
          .catch((err) => console.log(err));
        
      } else {
        this.Modulo.modulo.push(this.listaF.modulos[0]);
        let listaModulos = [];
        listaModulos = this.Modulo.modulo;
        let listaSubModulos = [];
        for (let recorrido = 1; recorrido < listaModulos.length; recorrido++) {
          if (this.Modulo.modulo[recorrido].nombre == this.nombreModulo) {
            listaSubModulos = this.Modulo.modulo[recorrido].submodulos;
            this.Modulo.modulo[recorrido].estado = "Activo";
            this.Modulo.modulo[recorrido].cambios = [];
            for (let recorre = 0; recorre < listaSubModulos.length; recorre++) {
                this.Modulo.modulo[recorrido].submodulos[recorre].estado ="Activo";
                this.Modulo.modulo[recorrido].submodulos[recorre].cambios = [];
                let listaActividad = [];
                listaActividad =this.Modulo.modulo[recorrido].submodulos[recorre].actividades;
                for (let recorreActividad = 0;recorreActividad < listaActividad.length;recorreActividad++) {
                  this.Modulo.modulo[recorrido].submodulos[recorre].actividades[recorreActividad].estado = "Activo";
                  this.Modulo.modulo[recorrido].submodulos[recorre].actividades[recorreActividad].cambios = [];
                }
            }
          }
        }

        this.cargaRegistro = true;
        await axios
          .put("/Cronograma/ModificarCronograma", this.Modulo)
          .then((x) => {
            this.listaE = x.data;
            this.cargaRegistro = false;
            this.closeDialog();
            this.$emit("close-dialog-Registrar");
            this.$emit("emit-obtener-Modulo");
            // this.modulos=this.limpiarActividad();
          })
          .catch((err) => console.log(err));
       
      }
       this.cargaRegistro = true;
      await axios
        .get("/Cronograma/Fechas_Hito?id=" + this.Modulo.id)
        .then((x) => {
          this.listaF = x.data;
          this.cargaRegistro = false;
          this.$emit("emit-obtener-Modulo");
        })
        .catch((err) => console.log(err));
    },

    async obtieneInfoCronogramaCreado() {
      var user = {};
      await axios
        .get(
          "/Cronograma/BusquedaPorId?id_cronograma=" +
            this.Informacion.Modulo.id
        )
        .then((res) => {
          user = res.data;
        })
        .catch((err) => console.log(err));
      return user;
    },
  },

  async mensaje(icono, titulo, texto, footer) {
    await this.$swal({
      icon: icono,
      title: titulo,
      text: texto,
      footer: footer,
    });
  },
  computed: {
    errorNombreModulo() {
      const errors = [];
      if (!this.$v.nombreModulo.$dirty) return errors;
      !this.$v.nombreModulo.required &&
        errors.push("Debe ingresar un nombre Obligatoriamente");
      return errors;
    },

  },
  validations() {
    return {
        nombreModulo: { required },
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
}*/
.container-Modulo {
  margin: 15px;
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
