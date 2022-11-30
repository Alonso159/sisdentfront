<template>
    <v-card>
        <v-card-title class="justify-center">Registrar Nuevo Paciente</v-card-title>
        <div class="container-Actividad">
            <v-form>
                <v-col cols="12">
                    <v-text-field v-model.trim="paciente.nombre" @input="$v.paciente.nombre.$touch()"
                        @blur="$v.paciente.nombre.$touch()" :error-messages="errorNombre"
                        label="Nombre Completo del paciente " outlined color="#009900"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model.trim="paciente.documento" @input="$v.paciente.documento.$touch()"
                        @blur="$v.paciente.documento.$touch()" :error-messages="errorDocumento"
                        label="Documento de Identidad" outlined color="#009900"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-select :items="listaDocumento" item-text="text" item-value="value"
                        v-model="paciente.tipo_documento" :error-messages="errorTipo" outlined label="Tipo de Documento"
                        :required="true"></v-select>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model.trim="paciente.numero_telefono" @input="$v.paciente.numero_telefono.$touch()"
                        @blur="$v.paciente.numero_telefono.$touch()" :error-messages="errorNumero"
                        label="Numero Telefonico " outlined color="#009900"></v-text-field>
                </v-col>
                <v-row align="center" justify="space-around">
                    <v-col cols="12" sm="6" md="4">
                        <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date1" label="Fecha de Nacimiento" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date1" @input="menu1 = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-divider class="divider-custom"></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-col cols="6" sm="6" md="3">
                        <v-btn small block class="mr-4" color="success" elevation="1"
                            @click.prevent="guardarPaciente()">Guardar</v-btn>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                        <v-btn small block class="mr-4" color="error" elevation="1"
                            @click.prevent="closeDialog()">Volver</v-btn>
                    </v-col>
                </v-card-actions>
            </v-form>
        </div>
        <v-dialog width="450px" v-model="cargaRegistro" persistent>
            <v-card height="300px">
                <v-card-title class="justify-center">Registrando Paciente</v-card-title>
                <div>
                    <v-progress-circular style="display: block; margin: 40px auto" :size="90" :width="9" color="blue"
                        indeterminate></v-progress-circular>
                </div>
                <v-card-subtitle class="justify-center" style="font-weight: bold; text-align: center">En unos momentos
                    finalizaremos...</v-card-subtitle>
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
            suma: 0,
            timezone: "",
            date: null,
            date1: null,
            date2: null,
            menu2: false,
            menu1: false,
            listaDocumento: [
                {
                    value: "DNI",
                    text: "DNI",
                },
                {
                    value: "Carnet de Extranjeria",
                    text: "Carnet de Extranjeria",
                },

            ],
            paciente: {
                documento: 0,
                nombre: "",
                fecha_nacimiento: "",
                numero_telefono: 0,
                tipo_documento: "",
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
    },
    methods: {
    async guardarPaciente() {
            this.cargaRegistro = true
            await axios
        .get("/Cita/GetAll" )
        .then((x) => {
            this.cargaRegistro = false
            this.$emit("close-dialog-Registrar")
        })
        .catch((err) => console.log(err));
        await this.mensaje(
        "success",
        "Listo",
        "Paciente registrado satisfactoriamente",
        
      );
            
        },
        closeDialog(){
            this.$emit("close-dialog-Registrar")

        },

        limpiarActividad() {
            return {
                paciente: {
                    documento: 0,
                    nombre: "",
                    fecha_nacimiento: "",
                    numero_telefono: 0,
                    tipo_documento: "",
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
    },
    computed: {
        errorNombre() {
            const errors = [];
          //  if (!this.$v.paciente.nombre.$dirty) return errors;
            !this.$v.paciente.nombre.required &&
                errors.push("Debe ingresar el nombre del paciente");
            return errors;
        },
        errorDocumento() {
            const errors = [];
        //    if (!this.$v.paciente.documento.$dirty) return errors;
            !this.$v.paciente.documento.required &&
                errors.push("Debe ingresar el codigo de la paciente");
            !this.$v.paciente.documento.minLength &&
                errors.push(
                    "El código de la especialida debe poseer minimo 8 caracteres"
                );
                !this.$v.paciente.documento.maxLength &&
                errors.push(
                    "El código de la especialida debe poseer maximo 8 caracteres"
                );
            return errors;
        },
        errorTipo() {
            const errors = [];
            //if (!this.$v.paciente.tipo_documento.$dirty) return errors;
            !this.$v.paciente.tipo_documento.required &&
                errors.push("Debe seleccionar el tipo de documento");
            return errors;
        },
        errorNumero() {
            const errors = [];
        //    if (!this.$v.paciente.numero.$dirty) return errors;
            !this.$v.paciente.numero_telefono.required &&
                errors.push("Debe ingresar un numero telefonico de la paciente");
            !this.$v.paciente.numero_telefono.minLength &&
                errors.push("El numero debe poseer al menos 9 digitos");
            return errors;
        },


    },
    validations() {
        return {
            paciente: {
                documento: { required, minLength: minLength(8),maxLength:maxLength(8) },
                nombre: { required },
                fecha_nacimiento: { required },
                numero_telefono: { required, minLength: minLength(9) },
                tipo_documento: { required },
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
  */
.container-Actividad {
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
  