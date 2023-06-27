<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Actividad</v-card-title>
    <div class="container-Modulo">
      <v-form>
        <v-text-field
          v-model.trim="Actividad.nombre"
          label="Nombre del Actividad"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="Actividad.prioridad"
          readonly
          label="Prioridad del Actividad"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.number="Actividad.costo"
          label="Costo del Actividad"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.number="Actividad.horas_estimadas"
          label="Horas estimadas del Actividad"
          outlined
          color="#009900"
        ></v-text-field>
        
        <v-divider class="divider-custom"></v-divider>
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
            color="success"
            elevation="1"
            @click="actualizaActividad"
            >Guardar Cambios</v-btn
          >
        </v-col>
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
        <v-card-title class="justify-center">Registrando Recurso</v-card-title>
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
import { mapGetters, mapActions } from "vuex";
import ModificarActividad from "@/components/ComponenteGestionarCronograma/ModificarActividad.vue";

export default {
  name: "ModificarActividad",
  props: ["InfoActividad", "Actividad"],
  components: {},
  data() {
    return {
      menu2: false,
      menu1: false,
      prioridad: null,
      cargaRegistro: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    console.log(this.Actividad);
  },
  methods: {
    async actualizaActividad() {
      var cronograma = {};
      await axios
        .get(
          "/Cronograma/BusquedaPorId?id_cronograma=" +
            this.InfoActividad.idCronograma
        )
        .then((res) => {
          cronograma = res.data;
        })
        .catch((err) => console.log(err));
      let listaModulos = [];
      listaModulos = cronograma.modulo;

      for (let i = 0; i < listaModulos.length; i++) {
        let listaSubModulos = [];
        listaSubModulos = cronograma.modulo[i].submodulos;
        if (
          cronograma.modulo[i].tipo == this.InfoActividad.tipoModulo &&
          cronograma.modulo[i].prioridad == this.InfoActividad.prioridadModulo
        ) {
          let listaSubModulos = [];
          listaSubModulos = cronograma.modulo[i].submodulos;

          for (let j = 0; j < listaSubModulos.length; j++) {
            let listaActividades = [];
            listaActividades = cronograma.modulo[i].submodulos[j].actividades;
            if (
              cronograma.modulo[i].submodulos[j].prioridad ==
              this.InfoActividad.prioridadSubModulo
            ) {
              let listaActividades = [];
              listaActividades = cronograma.modulo[i].submodulos[j].actividades;

              for (let k = 0; k < listaActividades.length; k++) {
                if (
                  cronograma.modulo[i].submodulos[j].actividades[k].prioridad ==
                  this.InfoActividad.prioridadActividad
                ) {
                  cronograma.modulo[i].submodulos[j].actividades[k] =this.Actividad;
                 
                  this.$emit("emit-obtener-Modulo");
                }
              }
            }
          }
        }
      }
      await axios
        .put("/Cronograma/ModificarCronograma", cronograma)
        .then((x) => {
          this.listaE = x.data;
          this.$emit("emit-obtener-Modulo");
          this.closeDialog();
          // this.modulos=this.limpiarActividad();
        })
        .catch((err) => console.log(err));
          this.cargaRegistro = true;
        await axios
        .get("/Cronograma/Fechas_Hito?id=" + this.InfoActividad.idCronograma)
        .then((x) => {
          this.listaF = x.data;
          this.cargaRegistro = false;
          this.$emit("emit-obtener-Modulo");
        })
        .catch((err) => console.log(err));
         this.obtenerCronogramaactualizado();
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
    ...mapGetters("Authentication", ["user"]),
  },
  validations() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
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
