<template>
  <v-card>
    <v-card-title class="justify-center">Modificar SubModulo</v-card-title>
    <div class="container-Modulo">
      <v-form>
        <v-text-field
          v-model.trim="SubModulo.nombre"
          @input="$v.SubModulo.nombre.$touch()"
          @blur="$v.SubModulo.nombre.$touch()"
          :error-messages="errorNombreModulo"
          label="Nombre del SubModulo"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="SubModulo.prioridad"
          readonly
          label="Prioridad del SubModulo"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="SubModulo.horas_estimadas"
          readonly
          label="Horas estimadas del SubModulo"
          outlined
          color="#009900"
        ></v-text-field>

        <v-row align="center" justify="space-around">
          <v-col cols="6" sm="5" md="4">
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
                  disabled
                  v-model="SubModulo.fecha_inicio"
                  label="Fecha de inicio"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="SubModulo.fecha_inicio"
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
                  disabled
                  v-model="SubModulo.fecha_fin"
                  label="Fecha de Fin"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="SubModulo.fecha_fin"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider class="divider-custom"></v-divider>
        <v-data-table
          :headers="headers"
          :items="ListActividades"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-row align="center" justify="space-around">
              <v-btn
                small
                v-if="estadoActual(item.id)"
                color="info"
                dark
                @click="abrirModificarActividad(item.prioridad, item.nombre)"
              >
                <span>Actualizar Actividad</span>
              </v-btn>
              <v-btn small v-if="estadoActual(item.id)" color="info" dark>
                <v-icon center> mdi-file-eye </v-icon>
                <span> Ver Actividad</span>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-row align="center" justify="space-around">
            <v-text-field
              v-model.trim="nombreActividad"
              @input="$v.nombreActividad.$touch()"
              @blur="$v.nombreActividad.$touch()"
              :error-messages="errorNombreSubModulo"
              label="Titulo"
              outlined
              color="#009900"
            ></v-text-field>
            <v-select
              larga
              :items="selectPrioridad"
              item-text="text"
              item-value="value"
              v-model="prioridad"
              menu-props="auto"
              label="Seleccione la prioridad"
              hide-details
              prepend-icon="mdi-microsoft-visual-studio"
              single-lin
            ></v-select>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col cols="6" sm="3" md="3">
              <v-btn
                block
                class="mr-4"
                color="success"
                elevation="1"
                @click.prevent="agregarActividad()"
                >Aceptar</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
      <v-row justify="center">
        <v-col cols="6" sm="3" md="3">
          <v-btn
            block
            small
            right
            class="mr-4"
            color="error"
            elevation="1"
            @click="closeDialog"
            >Volver</v-btn
          >
        </v-col>
      </v-row>
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
    <v-dialog v-model="dialogoModificarActividad" max-width="880px">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <ModificarActividad
            :Actividad="Actividad"
            :InfoActividad="InfoActividad"
            v-if="dialogoModificarActividad"
            @close-dialog-Registrar="closeDialogModificarActividad()"
            @emit-obtener-Modulo="obtenerCronogramaactualizado()"
          >
            ></ModificarActividad
          >

          <br />
        </v-card-text>
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
import { mapGetters, mapActions } from "vuex";
import ModificarActividad from "@/components/ComponenteGestionarCronograma/ModificarActividad.vue";

export default {
  name: "ModificarModulo",
  props: ["Informacion", "SubModulo"],
  components: { ModificarActividad },
  data() {
    return {
      headers: [
        {
          text: "Nombre del Actividad",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Horas estimadas de la Actividad", value: "horas_estimadas" },
        { text: "Prioridad del Actividad", value: "prioridad" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      selectPrioridad: [
        { value: "Alta", text: "Alta" },
        { value: "Media", text: "Media" },
        { value: "Baja", text: "Baja" },
      ],
      menu2: false,
      menu1: false,
      nombreActividad: "",
      prioridad: null,
      Actividad: {},
      InfoActividad: {
        idCronograma: "",
        tipoModulo: "",
        prioridadModulo: "",
        prioridadSubModulo: "",
        prioridadActividad: "",
      },
      dialogoModificarActividad: false,
      cargaRegistro: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    this.obtenerCronogramaactualizado();
  },
  methods: {
    ...mapActions("Cronograma", ["setListaActividades"]),
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
    obtenerEstadoModificar() {
      if (this.prioridad == null) {
        return true;
      } else {
        return false;
      }
    },
    estadoActual(array) {
      if (array === "listo") {
        return false;
      } else {
        return true;
      }
    },
    async traeInfoActividad(prioridad, nombre) {
      let user = {};
      this.InfoActividad.prioridadActividad = prioridad;
      this.InfoActividad.tipoModulo = this.Informacion.Modulo.tipo;
      this.InfoActividad.prioridadModulo = this.Informacion.Modulo.prioridad;
      this.InfoActividad.prioridadSubModulo = this.SubModulo.prioridad;
      this.InfoActividad.idCronograma = this.Informacion.Modulo.id;
      await axios
        .get(
          "/PlantillaCrono/GetActividad_Cronograma?idCronograma=" +
            this.Informacion.Modulo.id +
            "&tipoModulo=" +
            this.Informacion.Modulo.tipo +
            "&prioridadModulo=" +
            this.Informacion.Modulo.prioridad +
            "&prioridadSubModulo=" +
            this.SubModulo.prioridad +
            "&prioridadActividad=" +
            prioridad
        )
        .then((res) => {
          let a = [];
          a = res.data.actividades;
          for (let i = 0; i < a.length; a++) {
            if (res.data.actividades[i].nombre == nombre) {
              user = res.data.actividades[0];
              this.cargaRegistro = false;
              console.log(user)
            }
          }
        })
        .catch((err) => console.log(err));
     
      return user;
    },
    async obtenerCronogramaactualizado() {
      var user = {};
      // this.cargaRegistro = true;
      await axios
        .get(
          "/PlantillaCrono/GetSubModulo_Cronograma?idCronograma=" +
            this.Informacion.Modulo.id +
            "&tipoModulo=" +
            this.Informacion.Modulo.tipo +
            "&prioridadModulo=" +
            this.Informacion.Modulo.prioridad +
            "&prioridadSubModulo=" +
            this.Informacion.prioridadSub
        )
        .then((res) => {
          user = res.data.submodulos[0].actividades;
          this.setListaActividades(user);
          this.cargaRegistro = false;
        })
        .catch((err) => console.log(err));
    },
    closeDialogModificarActividad() {
      this.dialogoModificarActividad = false;
    },
    async abrirModificarActividad(prioridad, nombre) {
      this.dialogoModificarActividad = !this.dialogoModificarActividad;
      this.Actividad = await this.traeInfoActividad(prioridad, nombre);
      console.log(this.Actividad)
      //  this.ModificarModulo= await
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
      if (!this.$v.SubModulo.nombre.$dirty) return errors;
      !this.$v.SubModulo.nombre.required &&
        errors.push("Debe ingresar un nombre Obligatoriamente");
      return errors;
    },
    errorNombreSubModulo() {
      const errors = [];
      if (!this.$v.nombreActividad.$dirty) return errors;
      !this.$v.nombreActividad.required &&
        errors.push("Debe ingresar un nombre Obligatoriamente");
      return errors;
    },
    ...mapGetters("Cronograma", ["ListActividades"]),
    ...mapGetters("Authentication", ["user"]),
  },
  validations() {
    return {
      SubModulo: {
        nombre: {
          required,
        },
      },
      nombreActividad: { required },
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
