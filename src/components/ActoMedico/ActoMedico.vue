<template>
   
    <v-row style="display: flex; flex-direction: column;">
      <v-card height:10px class="card" style="margin: 10px auto 10; width: 100%">
      
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.datos_generales.nombre" label="Nombre"  required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.datos_generales.apellido_paterno" label="Apellido Paterno"  required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.datos_generales.apellido_materno" label="Apellido Materno"  required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.datos_generales.telefono" label="Teléfono"  required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.datos_generales.dni" label="DNI"  required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.datos_generales.fecha_nacimiento" label="Fecha de Nacimiento" type="date" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="form.datos_generales.sexo" :items="sexos" label="Sexo" required></v-select>
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
            <v-btn type="submit" color="error" v-on:click="cerrarModal()">Salir</v-btn>
          </v-col>
        </v-row>
      </v-container>
  </v-card>
      <v-col cols="48" md="48" lg="32">
        <div class="home-columns">
          <Odontograma />
        </div>
      </v-col>
    </v-row>

</template>
    <script>
    import axios from "axios";
    import { mapGetters, mapActions } from "vuex";
    import moment from "moment";
    import CardCitasAtendidas from "@/components/HistoriaClinica/CardCitasAtendidas.vue";
    import Odontograma from "@/components/HistoriaClinica/Odontograma.vue";
    import CardModificarPaciente from "@/components/ModificarPerfil/CardModificarPaciente.vue";

  //import Odontograma from "@components/HistoriaClinica/Odontograma.vue"
    export default {
      name: "HistoriaClinica",
     
      components: {
      CardModificarPaciente,
      CardCitasAtendidas,
      Odontograma
      //Odontograma
  },
      data() {
        return {
         idPaciente:"",
          form:
    {
        id: '',
        id_usuario:"",
        username:"",
        password:"",
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
        };
      },
      async created() {
        
       
      
        const id = this.$route.params.id;
        this.idPaciente=id
        await this.obtieneInfoPaciente();
        await this.fetchUser();
        
      },
      methods: {
        async cerrarModal(){
          this.$emit("close-dialog-detalle");
        },
        async obtieneInfoPaciente(){
          await axios
          .get("/Paciente/IDPaciente?id="+this.idPaciente)
          .then((datos) => {
            console.log("NUEVA LISTA MEDICO")
            console.log(datos.data)
            this.form.username=this.user.usuario
            this.form.password=this.user.clave
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
          })
          .catch((err) => console.log(err));
        },
        ...mapActions("Authentication", ["fetchUser"]),
      },
      computed: {
        ...mapGetters("Authentication", ["user"]),
      },
      
    }
    </script>
    <style lang="scss" scoped>
    .home-columns {
    
      display: flex;
      flex-direction: row;
      justify-content: left;
      flex-wrap: nowrap;
    }
    </style>
  
