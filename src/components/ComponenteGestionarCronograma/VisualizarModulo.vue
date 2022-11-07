<template>
  <v-card>
    <v-card-title class="justify-center">Visualizar Modulo</v-card-title>
    <div class="container-Modulo">
      <v-form>
        <v-text-field
          v-model.trim="ModificarModulo2.nombre"
          @input="$v.ModificarModulo2.nombre.$touch()"
          @blur="$v.ModificarModulo2.nombre.$touch()"
          :error-messages="errorNombreModulo"
          readonly
          label="Nombre del Modulo"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="ModificarModulo2.tipo"
          readonly
          label="Tipo del Modulo"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="ModificarModulo2.prioridad"
          readonly
          label="Prioridad del Modulo"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="ModificarModulo2.horas_estimadas"
          readonly
          label="Horas estimadas del Modulo"
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
                  v-model="ModificarModulo2.fecha_inicio"
                  label="Fecha de inicio"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="ModificarModulo2.fecha_inicio"
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
                  v-model="ModificarModulo2.fecha_fin"
                  label="Fecha de Fin"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="ModificarModulo2.fecha_fin"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider class="divider-custom"></v-divider>
        <v-data-table
          :headers="headers"
          :items="ListSubModulo"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-row align="center" justify="space-around">
              <v-btn small v-if="estadoActual(item.id)" color="info" dark
               @click="abrirModificarSubModulo(item.prioridad, item.nombre)">
                <v-icon center> mdi-file-eye </v-icon>
                
                <span> Ver SubModulo</span>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
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
        <v-card-title class="justify-center"
          >Registrando SubModulo</v-card-title
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
    <v-dialog v-model="dialogoModificarSubModulo" max-width="880px">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <VisualizarSubModulo
            :Informacion="Informacion"
            :SubModulo="SubModulo"
            v-if="dialogoModificarSubModulo"
            @close-dialog-Registrar="closeDialogModificarSubModulo()"
            @emit-obtener-Modulo="obtenerCronogramaactualizado()"
          >
            ></VisualizarSubModulo
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
import moment from "moment";
import VisualizarSubModulo from "@/components/ComponenteGestionarCronograma/VisualizarSubModulo.vue";

export default {
  name: "ModificarModulo",
  props: ["ModificarModulo2", "Cronogramaid"],
  components: { VisualizarSubModulo },
  data() {
    return {
      headers: [
        {
          text: "Nombre del SubModulo",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Horas estimadas del SubModulo", value: "horas_estimadas" },
        { text: "Prioridad del SubModulo", value: "prioridad" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      selectPrioridad: [
        { value: "Alta", text: "Alta" },
        { value: "Media", text: "Media" },
        { value: "Baja", text: "Baja" },
      ],
      menu2: false,
      menu1: false,
      Informacion: {
        Modulo: {
          id: "",
          tipo: "",
          prioridad: "",
        },
        prioridadSub: "",
      },
      prioridad: null,
      SubModulo: {},
      nombreSubmodulo: "",
      dialogoModificarSubModulo: false,
      cargaRegistro: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    await this.obtenerCronogramaactualizado();
  },
  methods: {
    ...mapActions("Cronograma", ["setListaSubModulo"]),
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
    async traeInfoSubModulo(prioridad, nombre) {
      this.Informacion.prioridadSub = prioridad;
      var user = {};
      this.cargaRegistro = true;
      await axios
        .get(
          "/PlantillaCrono/GetSubModulo_Cronograma?idCronograma=" +
            this.Cronogramaid.id +
            "&tipoModulo=" +
            this.ModificarModulo2.tipo +
            "&prioridadModulo=" +
            this.ModificarModulo2.prioridad +
            "&prioridadSubModulo=" +
            prioridad
        )
        .then((res) => {
          let a = [];
          a = res.data.submodulos;
          for (let i = 0; i < a.length; i++) {
            if ((res.data.submodulos[i].nombre == nombre)) {
              user = res.data.submodulos[i];
              this.cargaRegistro = false;
            }
          }
        })
        .catch((err) => console.log(err));

      return user;
    
    },    
    async obtenerCronogramaactualizado() {
      this.Informacion.Modulo.id = this.Cronogramaid.id;
      var uuser = {};
      await axios
        .get(
          "/Cronograma/Get_Modulo?id=" +
            this.Cronogramaid.id +
            "&name=" +
            this.Cronogramaid.nombre
        )
        .then((res) => {
          uuser = res.data.modulo[0].submodulos;
          this.Informacion.Modulo.tipo = res.data.modulo[0].tipo;
          this.Informacion.Modulo.prioridad = res.data.modulo[0].prioridad;
          this.cargaRegistro = false;
          this.setListaSubModulo(uuser);
        })
        .catch((err) => console.log(err));
    },
    
    closeDialogModificarSubModulo() {
      this.dialogoModificarSubModulo = false;
    },
    async abrirModificarSubModulo(prioridad, nombre) {
      this.dialogoModificarSubModulo = !this.dialogoModificarSubModulo;
      this.SubModulo = await this.traeInfoSubModulo(prioridad, nombre);

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
      if (!this.$v.ModificarModulo2.nombre.$dirty) return errors;
      !this.$v.ModificarModulo2.nombre.required &&
        errors.push("Debe ingresar un nombre Obligatoriamente");
      return errors;
    },
    errorNombreSubModulo() {
      const errors = [];
      if (!this.$v.nombreSubmodulo.$dirty) return errors;
      !this.$v.nombreSubmodulo.required &&
        errors.push("Debe ingresar un nombre Obligatoriamente");
      return errors;
    },
    ...mapGetters("Cronograma", ["ListSubModulo"]),
    ...mapGetters("Authentication", ["user"]),
  },
  validations() {
    return {
      ModificarModulo2: {
        nombre: {
          required,
        },
      },
      nombreSubmodulo: { required },
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
