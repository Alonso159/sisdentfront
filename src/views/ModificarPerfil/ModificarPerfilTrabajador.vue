<template>
    <v-card height:10px class="card" style="margin: 10px auto 0; width: 100%">
      <v-form @submit="submitForm">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.id" label="id" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.id_usuario" label="id_usuario" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.nombre" label="Nombre" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.apellido_paterno" label="Apellido Paterno" :rules="nameRules" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.apellido_materno" label="Apellido Materno" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.telefono" label="Teléfono" :rules="phoneRules" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.dni" label="DNI" :rules="dniRules" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.fecha_nacimiento" label="Fecha de Nacimiento" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select v-model="form.datos_generales.sexo" :items="sexos" label="Sexo" required></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="form.datos_generales.estado" :items="estados" label="Estado" required></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn type="submit" color="primary" class="mr-2" v-on:click="editar()">Guardar</v-btn>
              <v-btn type="submit" color="error" href="/dashboard-management">Salir</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </template>
  <script>
   import { mapGetters, mapActions } from "vuex";
   import axios from 'axios';
  export default {
    data:function(){
  return{
    form:
    {
        id: '',
        id_usuario:'',
        datos_generales : {
          nombre: '',
          apellido_paterno: '',
          apellido_materno:'',
          telefono:0,
          dni:'',
          fecha_nacimiento:0,
          sexo:'',
          estado:''
        }
    },
    sexos: ["Masculino", "Femenino", "No especifica"],
    estados: ["Activo", "Inactivo"]
  }
  },
  methods:
  {
    editar(){
      axios.put("/Trabajador/PutModificarPerfil",this.form)
      .then(data => {
        console.log(data)
      })
  }
  },
    mounted() {
      console.log("TU MAMA "+ this.user.myID)
      axios.get("/Trabajador/GetTrabajadorID?id="+this.user.id)
      .then(datos =>{
        this.form.id=datos.data.id;
        this.form.id_usuario=datos.data.id_usuario;
        this.form.datos_generales.nombre=datos.data.datos_generales.nombre;
        this.form.datos_generales.apellido_paterno=datos.data.datos_generales.apellido_materno;
        this.form.datos_generales.apellido_materno=datos.data.datos_generales.apellido_paterno;
        this.form.datos_generales.telefono=datos.data.datos_generales.telefono;
        this.form.datos_generales.dni=datos.data.datos_generales.dni;
        this.form.datos_generales.fecha_nacimiento=datos.data.datos_generales.fecha_nacimiento;
        this.form.datos_generales.sexo=datos.data.datos_generales.sexo;
        this.form.datos_generales.estado=datos.data.datos_generales.estado;
        console.log(this.form);
      })
    },
    computed:{
    ...mapGetters("Authentication",["user"])
  },
  }
  </script>  