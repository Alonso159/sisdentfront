<template>
  <v-card style="border-radius:5%;">
    <v-card-title class="justify-center">Registrar Tratamiento</v-card-title>
    <div class="container-Tratamiento" >
      <v-form style="margin:0px 100px 0 100px; ">
        <v-text-field
          v-model.trim="especialidad.descripcion"
          label="Nombre"
          outlined
          @input="$v.especialidad.descripcion.$touch()"
          @blur="$v.especialidad.descripcion.$touch()"
          :error-messages="errorDescripcion"
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model.trim="especialidad.duracion"
          label="Duración"
          outlined
          @input="$v.especialidad.duracion.$touch()"
          @blur="$v.especialidad.duracion.$touch()" 
          :error-messages="errorDuracion"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="especialidad.materiales"
          label="Materiales"
          outlined
          @input="$v.especialidad.materiales.$touch()"
          @blur="$v.especialidad.materiales.$touch()" 
          :error-messages="errorMateriales"
          color="#009900"
        ></v-text-field>

        <v-textarea
          v-model.trim="especialidad.costo"
          label="Costo"
          @input="$v.especialidad.costo.$touch()"
          @blur="$v.especialidad.costo.$touch()"
          height="25"
          rows="2"
          :error-messages="errorCosto"
          outlined
          color="#009900"
        ></v-textarea>

        <v-select
          v-model.trim="especialidad.complejidad"
          :items="itemsTD"
          :item-text="itemsTD.text"
          :item-value="itemsTD.value"
          label="Complejidad"
          outlined
          @input="$v.especialidad.complejidad.$touch()"
          @blur="$v.especialidad.complejidad.$touch()"
          :error-messages="errorComplejidad"
          color="#009900"
        ></v-select>      

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click.prevent="RegistrarEspecialidad"
              >Registrar</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog"
              >Volver</v-btn
            >
          </v-col>
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Registrando Tratamiento</v-card-title
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
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "RegistrarTratameitno",
  props: ["Tratamiento"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      step: 1,
      // dropzoneOptions: {
      //   url: "https://httpbin.org/post",
      //   thumbnailWidth: 250,
      //   maxFilesize: 3.0,
      //   maxFiles: 1,
      //   acceptedFiles: ".jpg, .png, jpeg",
      //   headers: { "My-Awesome-Header": "header value" },
      //   addRemoveLinks: true,
      //   dictDefaultMessage:
      //     "Seleccione una Imagen de su Dispositivo o Arrastrela aquí",
      // },

      especialidad: {
        descripcion: "",
        duracion: "",
        materiales: "",
        costo: "",
        complejidad: "",
      },
      itemsTD: [
        { value: "1", text: "1" },
        { value: "2", text: "2" }, 
        { value: "3", text: "3" },     
      ],

      cargaRegistro: false,
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapMutations(["setE"]),

    dropzone() {
      var file = {
        size: 123,
        name: "Imagen de Especialidad",
        type: "image/jpg",
      };
      this.$refs.myVueDropzone.manuallyAddFile(
        file,
        this.especialidad.url,
        null,
        null,
        true
      );
    },
    afterSuccess(file, response) {
      console.log(file);
      this.especialidad.url = file.dataURL.split(",")[1];
      this.$v.especialidad.url.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },

    afterRemoved(file, error, xhr) {
      this.especialidad.url = "";
      this.$v.especialidad.url.$model = "";
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
    resetEspecialidadValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.especialidad.$reset();
    },
    closeDialog() {
      this.especialidad = this.limpiarEspecialidad();
      this.step = 1;
      this.resetEspecialidadValidationState();
      this.$emit("close-dialog-Registrar");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async RegistrarEspecialidad() {
      this.especialidad.descripcion = this.especialidad.descripcion;
      this.especialidad.duracion = this.especialidad.duracion;
      this.especialidad.materiales = this.especialidad.materiales;
      this.especialidad.costo= this.especialidad.costo;
      this.especialidad.complejidad= this.especialidad.complejidad;

      console.log(this.especialidad);
      this.$v.especialidad.$touch();
      //if (this.$v.informe.$invalid) {
      if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",

          false
        );
      } else {
        console.log("no hay errores");
        this.cargaRegistro = true;
        await axios
          .post("/Especialidad/Registrar", this.especialidad)
          .then((res) => {
            this.especialidad = res.data;
            this.$emit("emit-obtener-especialidades");
            this.cargaRegistro = false;
            this.closeDialog();
          })
          .catch((err) => console.log(err));

        /*await this.mensaje(
          "success",
          "Listo",
          "Turno registrado satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestionar turnos<strong>"
        );*/
      }
    },

    limpiarEspecialidad() {
      return {
        especialidad:{
          descripcion: "",
          duracion: "",
          materiales: "",
          costo: "",
          complejidad: "",
        },
      };
    },
  },

  /*async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },*/
  computed: {    
    errorDescripcion() {
      const errors = [];
      if (!this.$v.especialidad.descripcion.$dirty) return errors;
      !this.$v.especialidad.descripcion.required &&
        errors.push("Debe ingresar el nombre del tratamiento");
      !this.$v.especialidad.descripcion.minLength &&
        errors.push(
          "El nombre del tratamiento debe poseer al menos 6 caracteres"
        );

      return errors;
    },
    errorDuracion() {
      const errors = [];
      if (!this.$v.especialidad.duracion.$dirty) return errors;
      !this.$v.especialidad.duracion.required &&
        errors.push("Falta poner como opcion la duracion");
      !this.$v.especialidad.duracion.minLength &&
        errors.push(
          "Duracion es por sesiones o tiempo?"
        );
      return errors;
    },
    errorMateriales() {
      const errors = [];
      if (!this.$v.especialidad.materiales.$dirty) return errors;
      !this.$v.especialidad.materiales.required &&
        errors.push("Falta ventana emergente que registre materiales ");
      !this.$v.especialidad.materiales.minLength &&
        errors.push(
          "Los materiales deben tener su cantidad y debe estar identificado con id"
        );
      return errors;
    },
    errorCosto() {
      const errors = [];
      if (!this.$v.especialidad.costo.$dirty) return errors;
      !this.$v.especialidad.costo.required &&
        errors.push("Debe ingresar el costo del tratamiento");
      !this.$v.especialidad.costo.minLength &&
        errors.push(
          "El costo debe ser superior a:"
        );
      return errors;
    },
    errorComplejidad() {
      const errors = [];
      if (!this.$v.especialidad.complejidad.$dirty) return errors;
      !this.$v.especialidad.complejidad.required &&
        errors.push("Seleccione la complejidad");      
      return errors;
    },
    
  },
  validations() {
    return {
      especialidad: {
        descripcion: {
          required,
          minLength: minLength(7),
        },        
        duracion:{
          required,
          minLength: minLength(2),
        },
        materiales:{
          required,
          minLength: minLength(2),
        },
        costo: {
          required,
          minLength: minLength(2),
        },
        complejidad:{
          required,
        }       
      },
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
