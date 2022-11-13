<template>
  <div>
    <v-card height:10px class="card" style="margin: 10px auto 0; width: 100%">
     
      <v-data-table
        expand-icon="$expand"
        :headers="headers"
        :items="ListCrono"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              solo
              reverse
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              <v-toolbar flat>
                <v-btn
                  class="mr-4"
                  color="white darken-1"
                  @click="ejecutaMetodos()"
                >
                  <span>Registrar nuevo Paciente</span>
                </v-btn>
              </v-toolbar>
            </v-col>

            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center"	justify="space-around">
            <v-btn
              color="success"
              dark
              readonly
              :disabled="verificaSolicitud(item.id,item.estado)"
              @click="abrirRealizarCambios(item.id)"
            >
              <v-icon center> mdi-file-eye </v-icon>
              <span>Realizar Cambios</span>
            </v-btn>
            <v-btn
              color="primary"
              dark
              :disabled="obtenerEstadoModificar(item.estado)"
              @click="abrirModificarDetalle(item.id)"
            >
              <v-icon center> mdi-file-eye </v-icon>
              <span>Modificar</span>
            </v-btn>
            

            <v-btn
              v-if="estadoActual(item.id)"
              color="info"
              dark
              @click="abrirDialogoDetalle(item.id)"
            >
              <v-icon center> mdi-file-eye </v-icon>
              <span>Visualizar </span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Aqui llamo a los componentes de vuetify-->
      <v-dialog persistent v-model="dialogoRegistrar" max-width="880px">
        <RegistrarCronograma
          v-if="dialogoRegistrar"
          :Cronograma="Cronograma"
          @close-dialog-Registrar="closeDialogRegistrar()"
          @emit-obtener-Cronograma="obtenerCronograma()"
        >
        </RegistrarCronograma>
      </v-dialog>

      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarCronograma
          v-if="dialogoactualizacion"
          :Cronograma="Cronograma"
          @close-dialog-Modificar="closeDialogModificar()"
          @emit-obtener-Cronograma="obtenerCronograma()"
        >
        </ModificarCronograma>
      </v-dialog>
      <v-dialog persistent v-model="dialogocambio" max-width="880px">
    
      </v-dialog>

      <v-dialog persistent v-model="dialogodetalle" max-width="1000px">
        <VisualizarCronograma
          v-if="dialogodetalle"
          :Actividad="Actividad"
          :SubModulo="SubModulo"
          :Cronograma="Cronograma"
          @close-dialog-detalle="closeDialogDetalle()"
        >
        </VisualizarCronograma>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import RegistrarCronograma from "@/components/ComponenteGestionarCronograma/RegistrarCronograma.vue";
import ModificarCronograma from "@/components/ComponenteGestionarCronograma/ModificarCronograma.vue";
import VisualizarCronograma from "@/components/ComponenteGestionarCronograma/VisualizarCronograma.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GestionarCronograma",
  components: {
    RegistrarCronograma,
    ModificarCronograma,
    VisualizarCronograma,
  },
  data() {
    return {
      Actividad: {},
      SubModulo:{},
      idCronogramaIncompleto: "",
      idCronograma: "",
      search: "",
      sefija: "",
      verifica:"",
      cronogramas: {
        gestion: {
          fecha_de_inicio_programada: null,
          fecha_de_fin_programada: null,
          horas_estimadas: 0,
          costo_proyecto: 0,
        },
        modulo: [
          /*   {
            nombre: null,
            tipo: null,
            fecha_inicio: null,
            fecha_fin: null,
            horas_estimadas: null,
            actividades: [],
            costo: null,
          },*/
        ],
        id_cliente: "",
        id_proyecto: "",
        estado: "Borrador",
        fecha_creacion: null,
        fecha_modificacion: null,
        id_usuario_creador: "",
        id_usuario_modificador: "",
        observacion_cliente: [
          /*{
            contenido: "",
            tipo_observacion: "",
            titulo: "",
          },*/
        ],
        precio_cronograma: 0,
      },
      Cronograma: {},
      headers: [
        
        { text: "Estado", value: "estado" },
        { text: "Precio", value: "gestion.costo_proyecto" },
        { text: "Fecha de Inicio", value: "gestion.fecha_de_inicio_programada" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
       dialogocambio: false,
      dialogodetalle: false,
    };
  },
  async created() {
    await this.setGlobIdProjectWhenStart();
    this.obtenerCronograma();
    this.obtenerEstado();
  },
  methods: {
    ...mapActions("Cronograma", ["setListaCronograma"]),
    ...mapActions("Global", ["setGlobIdProjectWhenStart"]),
    
    async obtenerEstado() {
    /*  await axios
        .get(
          "/Cronograma/BusquedaEstadoCreador?usuario_creador=" +
            this.user.infoUser.id +
            "&estado=Borrador"
        )
        .then((res) => {
          this.sefija = res.data[0].estado;
        })
        .catch((err) => console.log(err));*/
      this.meaburri(this.sefija);
    },

    meaburri() {
      if (this.sefija == "Borrador") {
        return true;
      } else {
        return false;
      }
    },
    obtenerEstadoModificar(estado) {
      if (estado == "Rechazado" || estado == "Borrador") {
        return false;
      } else if (estado == "Pendiente de Evaluacion" || estado == "Activo"||"Pendiente de Aprobacion") {
        return true;
      }
    },
    async verificaSolicitudes(id){
        await axios
        .get("/Cronograma/Existe_Solicitud?id_cronograma=" + id)
        .then((x) => {    
          this.verifica = x.data;         
        });
       
    },
    verificaSolicitud(id,estado){  
      console.log(this.verifica)
      if(estado=="Activo"){return false}else{return true}
    },
    //obtener los cronogramas listados
    async obtenerCronograma() {
      var listaE = [];
      //trae la info del proyecto y setea su id en cronogramas y el nombre en Proyecto
      await axios
        .get("/Proyecto/BusquedaPorId?id_proyecto=" + this.GlobIdProject)
        .then((x) => {
          this.listaE = x.data;
          this.cronogramas.id_proyecto = this.GlobIdProject;
        });
      //trae la info del cliente y setea su id en cronogramas y el nombre en Proyecto
      await axios
        .get("/Cliente/BusquedaPorId?id_cliente=" + this.listaE.id_cliente)
        .then((x) => {
          var listaF = x.data;
        })
        .catch((err) => console.log(err));

      this.cronogramas.id_cliente = this.listaE.id_cliente;
      //trae la info del proyecto y setea su id en cronogramas y el nombre en Proyecto
      await axios
      .get(
          "/Cronograma/Get_CronogramaxProyecto?id_proyecto=" + this.GlobIdProject
        )
        .then((x) => {
        
         
         const listaCrono = x.data;
         for(let i=0;i<listaCrono.length;i++){
        listaCrono[i].gestion.fecha_de_inicio_programada =
            x.data[i].gestion.fecha_de_inicio_programada.split("T")[0];
         }
          this.setListaCronograma(listaCrono);
        })
        .catch((err) => console.log(err));
     /* await axios
        .get(
          "/Cronograma/BusquedaPorId?id_cronograma=" + this.listaE.idcronograma
        )
        .then((x) => {
          const listaCrono = x.data;
          var listaParaHeader = [];
          listaParaHeader.push(listaCrono);
          this.setListaCronograma(listaParaHeader);
        })
        .catch((err) => console.log(err));*/
    },
    async registraCronograma() {
    
     
     
    //  this.cronogramas.id_usuario_creador = this.user.infoUser.id;
      await axios
        .post("/Cronograma/RegistrarCronograma", this.cronogramas)
        .then((res) => {
        
         
        })
        .catch((err) => console.log(err));
    },
    async actualizaProyecto(idProyecto) {
    
      var infoProyecto = {};
      await axios
        .get("/Proyecto/BusquedaPorId?id_proyecto="+ idProyecto)
        .then((res) => {
            infoProyecto = res.data;
          this.cargaRegistro = false;
        })
        .catch((err) => console.log(err));
        
         infoProyecto.idcronograma=this.idCronograma;
          await axios
        .put("/Proyecto/Modificar", infoProyecto)
        .then((res) => {
        
          this.cargaRegistro = false;
        })
        .catch((err) => console.log(err));
         

     
    },
    async ejecutaMetodos() {
    +
      console.log("AAAAAAAAAAAAA")
   
        this.registraCronograma();
      
    
    
    },

    async obtenerInfoCronogramaporId(id) {
      var user = {};
      await axios
        .get("/Cita/GetAllCitas?id_paciente=" + id)
        .then((res) => {
          user = res.data;
        })
        .catch((err) => console.log(err));
      return user;
    },
    

    estadoActual(array) {
      if (array === "listo") {
        return false;
      } else {
        return true;
      }
    },
    async loadCronograma(id) {
      let reunion = {};
      await axios
        .get("/Cronograma/BusquedaPorId?id_cronograma=" + id)
        .then((res) => {
          reunion = res.data;
          reunion.gestion.fecha_de_inicio_programada =
            res.data.gestion.fecha_de_inicio_programada.split("T")[0];
             reunion.gestion.fecha_de_fin_programada =
            res.data.gestion.fecha_de_fin_programada.split("T")[0];
        })
        .catch((err) => console.log(err));
      return reunion;
    },
    async abrirDialogoDetalle(id) {
     
      console.log(id)
      this.Cronograma = await this.loadCronograma(id);
       this.SubModulo = await this.obtenerSubModulos();
      this.Actividad = await this.obtenerActividades();
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      this.Cronograma = await this.loadCronograma(id);
      console.log(this.Cronograma)
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },
     async abrirRealizarCambios(id) {
      this.Cronograma = await this.loadCronograma(id);
      console.log(this.Cronograma)
      this.dialogocambio = !this.dialogocambio;
    },
    async abrirDialogo(id) {
      this.Paciente = await this.obtenerInfoCronogramaporId(id);
      console.log(this.Cronograma)
      this.dialogoRegistrar = !this.dialogoRegistrar;
    },
     async obtenerSubModulos(){
      
      var user = {};
      await axios
        .get("/Cronograma/Get_SubModulos?idCronograma=" + this.Cronograma.id)
        .then((res) => {
          user = res.data;
        })
        .catch((err) => console.log(err));
      return user;

    },
    async obtenerActividades() {
      var user = {};
      await axios
        .get("/Cronograma/Get_Actividad?id=" + this.Cronograma.id)
        .then((res) => {
          user = res.data;
        })
        .catch((err) => console.log(err));
      return user;
    },
    
    closeDialogRegistrar() {
       this.dialogocambio = false;
      this.dialogoRegistrar = false;
    },
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogModificar() {
      this.dialogoactualizacion = false;
    },
    closeDialogCambio() {
      this.dialogocambio = false;
    },
  },

  computed: {
    ...mapGetters("Cronograma", ["ListCrono"]),
    ...mapGetters("Global", ["GlobIdProject"]),
    ...mapGetters("Authentication", ["user"]),
  },
};
</script>
<style scoped>
.card {
  margin: 200 px;
}
</style>
