<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Cronograma</v-card-title>
    <div class="container-Cronograma">
      <v-form>
        <v-col>
          <v-text-field
            v-model.trim="Cronograma.project.nombre"
            label="Titulo"
            outlined
            readonly
            color="#009900"
          ></v-text-field>
          <v-text-field
            v-model.trim="Cronograma.cliente.datos_basicos.nombre_comercial"
            label="Cliente"
            readonly
            outlined
            color="#009900"
          ></v-text-field>
        </v-col>
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
                  v-model="fechaInicio"
                  label="Fecha de inicio"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fechaInicio"
                 :min="date1"
                @input="
                  (menu1 = false), actualizaFecha(), $v.fechaInicio.$touch()
                "
                
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" sm="5" md="4">
            <v-menu
              v-model="menu2"
              disabled
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fechaFin"
                  label="Fecha de Fin"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fechaFin"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="6" sm="3" md="3">
              <v-btn
                small
                class="mr-4"
                color="white darken-1"
                @click="modificarfechaCronograma()"
              >
                <span>Registrar Modulo</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" sm="3" md="3">
              <v-btn
                small
                :disabled="condicionEstado()"
                block
                class="mr-4"
                color="success"
                elevation="1"
                @click.prevent="actualizarEstado()"
                >Guardar Datos</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
      <v-data-table :headers="headers" :items="ListModulo" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn
              small
              v-if="estadoActual(item.id)"
              color="info"
              dark
              @click="abrirModificarModulo(item.nombre)"
            >
              <span>Actualizar</span>
            </v-btn>
            <v-btn
              small
              v-if="estadoActual(item.id)"
              color="info"
              dark
              @click="eliminarModulo(item.nombre)"
            >
              <v-icon center> mdi-file-eye </v-icon>
              <span> Eliminar</span>
            </v-btn>
            <v-btn
              small
              v-if="estadoActual(item.id)"
              color="info"
              dark
              @click="abrirDialogoDetalle(item.nombre)"
            >
              <v-icon center> mdi-file-eye </v-icon>
              <span> Ver</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
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
        <v-card-title class="justify-center">Cargando Datos</v-card-title>
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

    <v-dialog v-model="dialogoRegistrarModulo" max-width="880px">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <RegistrarModulo
            :Modulo="Modulo"
            v-if="dialogoRegistrarModulo"
            @close-dialog-Registrar="closeDialogRegistrarModulo()"
            @emit-obtener-Modulo="obtieneInfoCronogramaCreado()"
          >
          </RegistrarModulo>

          <br />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogoModificarModulo" max-width="880px">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <ModificarModulo
            :Cronogramaid="Cronogramaid"
            :ModificarModulo2="ModificarModulo2"
            v-if="dialogoModificarModulo"
            @close-dialog-Registrar="closeDialogModificarModulo()"
            @emit-obtener-Modulo="obtieneInfoCronogramaCreado()"
          >
          </ModificarModulo>

          <br />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogoVisualizarModulo" max-width="880px">
      <v-card-text>
        <VisualizarModulo
          :ModificarModulo2="ModificarModulo2"
          v-if="dialogoVisualizarModulo"
          @close-dialog-Registrar="closeDialogVisualizarModulo()"
          @emit-obtener-Modulo="obtieneInfoCronogramaCreado()"
        >
        </VisualizarModulo>
        <br />
      </v-card-text>
    </v-dialog>
  </v-card>
</template>
<script>
import axios from "axios";
import moment from "moment";
import Vuelidate from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import RegistrarModulo from "@/components/ComponenteGestionarCronograma/RegistrarModulo.vue";
import ModificarModulo from "@/components/ComponenteGestionarCronograma/ModificarModulo.vue";
import VisualizarModulo from "@/components/ComponenteGestionarCronograma/VisualizarModulo.vue";
export default {
  name: "RegistrarCronograma",
  props: ["Cronograma", "Proyecto"],
  components: {
    RegistrarModulo,
    ModificarModulo,
    VisualizarModulo,
  },
  data() {
    return {
      date1:new Date().toISOString(),
      headers: [
        {
          text: "Nombre del Modulo",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Tipo de Modulo", value: "tipo" },
        { text: "Prioridad del Modulo", value: "prioridad" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      estadoCrono: "",
      deshabilitado: false,
      menu2: false,
      fechaInicio: null,
      fechaFin: null,
      menu1: false,
      Modulo: {},
      ModificarModulo2: {},
      Cronogramaid: {
        id: "",
        nombre: "",
      },
      ModificarModulo: {},
      VisualizarModulo: {},

      dialogoRegistrarModulo: false,
      dialogoModificarModulo: false,
      dialogoVisualizarModulo: false,
      cargaRegistro: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    this.obtieneInfoCronogramaCreado();
  },
  methods: {
    ...mapActions("Cronograma", ["setListaModulo"]),
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
      this.$emit("close-dialog-Registrar");
      this.$emit("emit-obtener-Cronograma");
    },
    async eliminarModulo(nombre){
      var variable={};
      await axios
        .get(
          "/Cronograma/BusquedaPorId?id_cronograma="+this.Cronograma.id
        )
        .then((res) => {
          variable = res.data
        
        })
        .catch((err) => console.log(err));
        let listaModulos=[];
        listaModulos= variable.modulo;
        for(let i =0;i<listaModulos.length;i++)
        {
          if(variable.modulo[i].nombre==nombre){
            var a = variable.modulo.splice(i,1)
             variable.modulo.slice(i,1); 
             console.log(variable)
          }
        }
         this.cargaRegistro = true;
         await axios
          .put("/Cronograma/ModificarCronograma", variable)
          .then((x) => {
            this.$emit("emit-obtener-Cronograma");

          })
          .catch((err) => console.log(err));
        await axios
        .get("/Cronograma/Fechas_Hito?id=" + variable.id)
        .then((x) => {
          this.listaF = x.data;
          console.log("SI CAMBIA")
           this.obtieneInfoCronogramaCreado();
          this.cargaRegistro = false;
          this.$emit("emit-obtener-Cronograma");
        })
        .catch((err) => console.log(err));

    },
    async modificarfechaCronograma() {
      var variable = {};
      await axios
        .get(
          "/Cronograma/BusquedaPorId?id_cronograma="+this.Cronograma.id
        )
        .then((res) => {
          this.variable = res.data;
        
        })
        .catch((err) => console.log(err));
      if (this.fechaInicio == null) {
        await this.mensaje(
          "error",
          "Error",
          "POR FAVOR ELIJA UNA FECHA DE INICIO"
        );
      } else {
        var a = new Date(this.fechaInicio).toISOString();
        this.variable.gestion.fecha_de_inicio_programada = this.fechaInicio;

        await axios
          .put("/Cronograma/ModificarCronograma", this.variable)
          .then((x) => {
            this.listaE = x.data;
            this.$emit("emit-obtener-Cronograma");
            this.abrirDialogoModulo();
            this.cargaRegistro = false;
          })
          .catch((err) => console.log(err));
      }
    },
    async actualizaFecha() {
      var variable = {};
      await axios
        .get(
           "/Cronograma/BusquedaPorId?id_cronograma="+this.Cronograma.id
        )
        .then((res) => {
          variable = res.data;
          variable.gestion.fecha_de_inicio_programada = this.fechaInicio;
        })
        .catch((err) => console.log(err));

      if (variable.modulo[0] == null) {
        console.log("NO HACE NADA");
      } else {
        let listaModulos = [];
        let listaSubModulos = [];
        let listaActividades = [];
        listaModulos = variable.modulo;
      variable.modulo[0].fecha_inicio= this.fechaInicio;
        this.cargaRegistro = true;
        
         await axios
        .put("/Cronograma/ModificarCronograma", variable)
        .then((x) => {
          this.listaE = x.data;
         
          this.$emit("emit-obtener-Cronograma");
          this.cargaRegistro = false;
        })
        .catch((err) => console.log(err));
        
          await axios
        .get("/Cronograma/Fechas_Hito?id=" + variable.id)
        .then((x) => {
          this.listaF = x.data;
          console.log("SI CAMBIA")
          this.cargaRegistro = false;
          this.$emit("emit-obtener-Modulo");
        })
        .catch((err) => console.log(err));
         this.obtieneInfoCronogramaCreado();
      }
     
    },
    async actualizarEstado() {
      var variable = {};
      await axios
        .get(
           "/Cronograma/BusquedaPorId?id_cronograma="+this.Cronograma.id
        )
        .then((res) => {
          this.variable = res.data;
        })
        .catch((err) => console.log(err));
      this.variable.estado = "Pendiente de Evaluacion";
      let listaE = [];
      this.cargaRegistro = true;

      await axios
        .put("/Cronograma/ModificarCronograma", this.variable)
        .then((x) => {
          this.listaE = x.data;

          this.$emit("emit-obtener-Cronograma");
          this.$emit("close-dialog-Registrar");
          this.cargaRegistro = false;
        })
        .catch((err) => console.log(err));
      await this.mensaje(
        "success",
        "Listo",
        "Cronograma registrado satisfactoriamente",
        "<strong>Se redirigira a la interfaz de Gestionar Cronograma<strong>"
      );
    },
    async estadoCronograma() {
      var variable = {};
      await axios
        .get(
           "/Cronograma/BusquedaPorId?id_cronograma="+this.Cronograma.id
        )
        .then((res) => {
          this.variable = res.data;
          this.estadoCrono = this.variable.gestion.fecha_de_inicio_programada;
        })
        .catch((err) => console.log(err));
    },
    condicionEstado() {
      this.estadoCronograma();
      if (this.estadoCrono == null) {
        return true;
      } else {
        return false;
      }
    },
    async traeInfoNombre(nombre) {
      var variable = {};
      this.Cronogramaid.nombre = nombre;
      this.cargaRegistro = true;
      await axios
        .get(
          "/Cronograma/Get_Modulo?id=" + this.Cronograma.id + "&name=" + nombre
        )
        .then((res) => {
          variable = res.data.modulo[0];

          variable.fecha_inicio = res.data.modulo[0].fecha_inicio.split("T")[0];
          variable.fecha_fin = res.data.modulo[0].fecha_fin.split("T")[0];
        })
        .catch((err) => console.log(err));
      this.cargaRegistro = false;
      return variable;
    },

    async obtieneInfoCronogramaCreado() {
    
      var variable = {};
      await axios
        .get(
          "/Cronograma/BusquedaPorId?id_cronograma="+this.Cronograma.id
        )
        .then((res) => {
          variable = res.data;
    
          this.Cronogramaid.id = variable.id;
          var b = res.data.gestion.fecha_de_fin_programada.split("T")[0];
          this.fechaFin = b;
        })
        .catch((err) => console.log(err));
      this.setListaModulo(variable.modulo);
      return variable;
    },
    async abrirDialogoModulo() {
      this.dialogoRegistrarModulo = !this.dialogoRegistrarModulo;
      this.Modulo = await this.obtieneInfoCronogramaCreado();
      //  this.Modulo= await
    },
    async abrirModificarModulo(nombre) {
      this.dialogoModificarModulo = !this.dialogoModificarModulo;
      
      this.ModificarModulo2 = await this.traeInfoNombre(nombre);
   
      //this.ModificarModulo = await this.obtieneInfoCronogramaCreado();
      //  this.ModificarModulo= await
    },
    async abrirDialogoDetalle(nombre) {
      this.dialogoVisualizarModulo = !this.dialogoVisualizarModulo;
      this.ModificarModulo2 = await this.traeInfoNombre(nombre);

    },

    closeDialogRegistrarModulo() {
      this.obtieneInfoCronogramaCreado();
      this.dialogoRegistrarModulo = false;
    },
    closeDialogModificarModulo() {
      this.dialogoModificarModulo = false;
    },
    closeDialogVisualizarModulo() {
      this.dialogoVisualizarModulo = false;
    },

    estadoActual(array) {
      if (array === "listo") {
        return false;
      } else {
        return true;
      }
    },
  },
  computed: {
 
    ...mapGetters("Cronograma", ["ListModulo"]),
    ...mapGetters("Authentication", ["user"]),
    getMinDateInicio(){
      return new Date();
    },
  },
  validations() {
    return {
      fechaInicio: { required },
      
    };
  },
};
</script>
<style lang="scss" scoped>
.title-card {
  font-size: 25px;

  padding-top: 7%;
  text-align: center;
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
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.container-Cronograma {
  margin: 0px;
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
