<template>
  <v-card style="width: 500px;border-radius: 5%;">
    <v-card-title class="justify-center">Registrar Tratamiento</v-card-title>
    <div class="container-Tratamiento" >
      <v-form style="margin:0px 100px 0 100px; ">
        <v-text-field
          v-model.trim="tratamiento.id"
          label="Nombre"
          outlined
          @input="$v.tratamiento.id.$touch()"
          @blur="$v.tratamiento.id.$touch()"
          :error-messages="errorId"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="tratamiento.descripcion"
          label="Nombre"
          outlined
          @input="$v.tratamiento.descripcion.$touch()"
          @blur="$v.tratamiento.descripcion.$touch()"
          :error-messages="errorDescripcion"
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model="tratamiento.duracion"
          label="Duración"
          outlined
          @input="$v.tratamiento.duracion.$touch()"
          @blur="$v.tratamiento.duracion.$touch()" 
          :error-messages="errorDuracion"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="tratamiento.materiales.id_inventario"
          label="IDMateriales"
          outlined
          @input="$v.tratamiento.materiales.$touch()"
          @blur="$v.tratamiento.materiales.$touch()" 
          :error-messages="errorMaterialesId"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="tratamiento.materiales.cantidad"
          label="cantidad"
          outlined
          @input="$v.tratamiento.materiales.$touch()"
          @blur="$v.tratamiento.materiales.$touch()" 
          :error-messages="errorMaterialesCantidad"
          color="#009900"
        ></v-text-field>

        <v-textarea
          v-model="tratamiento.costo"
          label="Costo"
          @input="$v.tratamiento.costo.$touch()"
          @blur="$v.tratamiento.costo.$touch()"
          height="25"
          rows="2"
          :error-messages="errorCosto"
          outlined
          color="#009900"
        ></v-textarea>

        <v-select
          v-model="tratamiento.complejidad"
          :items="itemsTD"
          :item-text="itemsTD.text"
          :item-value="itemsTD.value"
          label="Complejidad"
          outlined
          @input="$v.tratamiento.complejidad.$touch()"
          @blur="$v.tratamiento.complejidad.$touch()"
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
              @click.prevent="RegistrarTratamiento"
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
import { mapMutations, mapState } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "RegistrarTratameitno",
  props: ["Tratamiento"],
  
  data() {
    return {
      step: 1,
      tratamiento: {
        id:"",
        descripcion: "",
        duracion: 0,
        materiales:{
        id_inventario:"",
        cantidad,
        },
        costo: 0,
        complejidad: 0,
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
    resetTratamientoValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.tratamiento.$reset();
    },
    closeDialog() {
      this.tratamiento = this.limpiarTratamiento();
      this.step = 1;
      this.resetTratamientoValidationState();
      this.$emit("close-dialog-Registrar");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async RegistrarTratamiento() {
      // this.tratamiento.push(materiales);
      console.log(this.tratamiento);
      this.$v.tratamiento.$touch();
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
          .post("/Tratamiento/RegistrarTratamiento", this.tratamiento)
          .then((res) => {
            this.tratamiento = res.data;
            this.$emit("emit-obtener-tratamientos");
            this.cargaRegistro = false;
            this.closeDialog();
          })
          .catch((err) => console.log(err));
      }
    },

    limpiarTratamiento() {
      return {
        tratamiento: {
        id:"",
        descripcion: "",
        duracion: 0,
        materiales:{
          id_inventario:"",
          cantidad,
        },
        costo: 0,
        complejidad: 0,
        },
        
      };
    },
  },

  computed: {    
    errorDescripcion() {
      const errors = [];
      if (!this.$v.tratamiento.descripcion.$dirty) return errors;
      !this.$v.tratamiento.descripcion.required &&
        errors.push("Debe ingresar el nombre del tratamiento");
      !this.$v.tratamiento.descripcion.minLength &&
        errors.push(
          "El nombre del tratamiento debe poseer al menos 6 caracteres"
        );

      return errors;
    },
    errorDuracion() {
      const errors = [];
      if (!this.$v.tratamiento.duracion.$dirty) return errors;
      !this.$v.tratamiento.duracion.required &&
        errors.push("Falta poner como opcion la duracion");
      !this.$v.tratamiento.duracion.minLength &&
        errors.push(
          "Duracion es por sesiones o tiempo?"
        );
      return errors;
    },
    errorMaterialesId() {
      const errors = [];
      if (!this.$v.tratamiento.materiales.$dirty) return errors;
      !this.$v.tratamiento.materiales.id_inventario.required &&
        errors.push("Id");
      !this.$v.tratamiento.materiales.id_inventario.minLength &&
        errors.push(
          "Id"
        );
      return errors;
    },
    errorMaterialesCantidad() {
      const errors = [];
      if (!this.$v.tratamiento.materiales.$dirty) return errors;
      !this.$v.tratamiento.materiales.cantidad.required &&
        errors.push("Cantidad");
      !this.$v.tratamiento.materiales.cantidad.minLength &&
        errors.push(
          "Cantidad"
        );
      return errors;
    },
    errorCosto() {
      const errors = [];
      if (!this.$v.tratamiento.costo.$dirty) return errors;
      !this.$v.tratamiento.costo.required &&
        errors.push("Debe ingresar el costo del tratamiento");
      !this.$v.tratamiento.costo.minLength &&
        errors.push(
          "El costo debe ser superior a:"
        );
      return errors;
    },
    errorComplejidad() {
      const errors = [];
      if (!this.$v.tratamiento.complejidad.$dirty) return errors;
      !this.$v.tratamiento.complejidad.required &&
        errors.push("Seleccione la complejidad");      
      return errors;
    },    
  },
  validations() {
    return {
      tratamiento: {
        descripcion: {
          required,
          minLength: minLength(1),
        },        
        duracion:{
          required,
          minLength: minLength(1),
        },        
        costo: {
          required,
          minLength: minLength(1),
        },
        complejidad:{
          required,
        }       
      },
      materiales:{
        id_inventario:{
          required,
        },
        cantidad:{
          required,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.boton
{
  border: 0px;
}
</style>
