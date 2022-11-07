<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Modulo</v-card-title>
    <div class="container-Modulo">
      <v-form>
        <v-text-field
          v-model.trim="observaciones_cliente.titulo"
          label="Titulo"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="observaciones_cliente.contenido"
          label="Contenido"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="observaciones_cliente.tipo_observacion"
          label="Tipo de observacion"
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
            color="error"
            elevation="1"
            @click="closeDialog()"
            >Volver</v-btn
          >
          <v-btn
            block
            small
            right
            class="mr-4"
            color="error"
            elevation="1"
            @click="actualizarCronograma()"
            >Guardar</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Guardando Opinion</v-card-title>
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
  name: "AgregarOpiniones",
  props: ["Opinion"],
  components: {},
  data() {
    return {
      observaciones_cliente: {
        contenido: "",
        tipo_observacion: "",
        titulo: "",
      },
      cargaRegistro: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
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
    async actualizarCronograma() {
      let listaE = [];

        this.Opinion.observacion_cliente.push(this.observaciones_cliente);
        await axios
          .put("/Cronograma/ModificarCronograma", this.Opinion)
          .then((x) => {
            this.listaE = x.data;
            this.$emit("close-dialog-detalle");
            // this.modulos=this.limpiarActividad();
          })
          .catch((err) => console.log(err));
    },
    closeDialog() {
      this.$emit("close-dialog-detalle");
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
