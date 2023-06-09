<template>
    <v-card height:10px class="card" style="margin: 10px auto 0; width: 100%">
      <v-form @submit="submitForm">
        <v-container>
          <v-row>
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
              <v-text-field v-model="form.datos_generales.fecha_nacimiento" label="Fecha de Nacimiento" type="date" required></v-text-field>
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
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.disptiemp" label="Disponibilidad de Tiempo" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.direccion" label="Dirección" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.edad" label="Edad" type="number" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.datos_generales.hijos" label="Hijos" type="number" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="form.datos_generales.ocupacion" label="Ocupación" required></v-text-field>
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
    import moment from 'moment';
   import { mapGetters, mapActions } from "vuex";
   import axios from 'axios';
  export default {
    data:function(){
  return{
    form:
    {
        id: '',
        id_usuario:"",
        datos_generales : {
          nombre: '',
          apellido_paterno: '',
          apellido_materno:'',
          telefono:0,
          dni:'',
          fecha_nacimiento:null,
          sexo:'',
          estado:'',
          disptiemp:0,
          direccion:'',
          edad:0,
          hijos:0,
          ocupacion:''},
        datos_paciente:
          {
            alergias:[""],
            obs:"",
            solicitud:"",
            rx:"",
          },   
    },
    sexos: ["Masculino", "Femenino", "No especifica"],
    estados: ["Activo", "Inactivo"]
  }
  },
  methods:
  {
    editar(){
      axios.put("/Paciente/PutModificarPerfil",this.form)
      .then(data => {
        console.log(data)
      })
  }
  },
    mounted() {
      axios.get("/Paciente/GetPacienteID?id=" + this.user.myID)
      .then(datos =>{
            this.form.id=datos.data.id;
            this.form.id_usuario=datos.data.id_usuario;
            this.form.datos_generales.nombre=datos.data.datos_generales.nombre;
            this.form.datos_generales.apellido_paterno=datos.data.datos_generales.apellido_materno;
            this.form.datos_generales.apellido_materno=datos.data.datos_generales.apellido_paterno;
            this.form.datos_generales.telefono=datos.data.datos_generales.telefono;
            this.form.datos_generales.dni=datos.data.datos_generales.dni;
            this.form.datos_generales.fecha_nacimiento = moment(datos.data.datos_generales.fecha_nacimiento).format('YYYY-MM-DD');
            this.form.datos_generales.sexo=datos.data.datos_generales.sexo;
            this.form.datos_generales.estado=datos.data.datos_generales.estado;
            this.form.datos_generales.disp_tiemp=datos.data.datos_generales.disp_tiemp;
            this.form.datos_generales.direccion=datos.data.datos_generales.direccion;
            this.form.datos_generales.edad=datos.data.datos_generales.edad;
            this.form.datos_generales.hijos=datos.data.datos_generales.hijos;
            this.form.datos_generales.ocupacion=datos.data.datos_generales.ocupacion;
            console.log(this.form);
      })
    },
    computed:{
    ...mapGetters("Authentication",["user"])
  },
  }
  </script>  
