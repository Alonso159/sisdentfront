<template>
 
</template>
<script>
import DatosEstadoNegociacion from '@/components/Dashboard/DatosEstadoNegociacion'
import DashboardProjectState from "@/components/Cards/DashboardProjectState";
import HeaderTitle from "@/components/base/HeaderTitle";
import axios from "axios";
import {
  jmPieChartOne
} from "@/data/DashboardProject/Charts";

export default {
  name: "DashboardProject",
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Proyecto",
  },
  components: {
    DashboardProjectState,
    DatosEstadoNegociacion,
    HeaderTitle
  },
  data() {
    return {
      etapas: [],
      proyecto:{},
      titulo:"",
      jefe:{},
      miembros:[],
      colorState: "primary",
      bgCardColor: "",
      mainIconTextColor: "",
      listRedirections: [
        {
          text: "Proyectos",
          url: "#"
        },
        {
          text: "Detalle del Proyecto",
          url: "#"
        }
      ],
      jmPieChartOne,
    }
  },
  async created(){
    console.log("DASHBOARD")
    this.cargarProyecto();
    //this.cargarMiembros();
    this.bgCardColor = `${this.colorState} pb-2`
    this.mainIconTextColor = `${this.colorState}--text text--lighten-2`
  },
  methods:{
    async cargarProyecto(){
      let id=localStorage.getItem("glob_id_project");
      console.log(id);
      let proyectoDATA = {};
      await axios
        .get("/Proyecto/BusquedaPorIdv2?id_proyecto=" + id)
        .then((res) => {
          proyectoDATA = res.data;
          this.proyecto=proyectoDATA;
          this.titulo = "["+proyectoDATA.nombreCliente + "] " + proyectoDATA.nombre;
          console.log(this.proyecto);
          this.cargarProyectoEtapas(id);
        })
        .catch((err) => console.log(err));
      // return proyectoDATA;
    },
    async cargarProyectoEtapas(id){
      await axios
        .get("/Proyecto/GetProyectoListo?idproyecto=" + id)
        .then((res) => {
          const etapasProyecto = res.data;
          console.log(etapasProyecto);
          this.GetEtapas(etapasProyecto);

        })
        .catch((err) => console.log(err));
      // return proyectoDATA;
    },
    async cargarMiembros(){
      let id=localStorage.getItem("glob_id_project");
      await axios
        .get("/Proyecto/ListaMiembrosProyecto?idProyecto=" + id)
        .then((res) => {
          this.miembros=res.data;
          this.jefe = res.data.id_rol_sistemastado.some(x=>x.id_rol_sistema=='625e08a7ea90c88b04a54dfe');
        })
        .catch((err) => console.log(err));
    },
    GetEtapas(etapas){
      this.etapas.push({
        title: "Creación del Proyecto",
        subTitle: "Estado: Culminado",
        paragraph:
          "Se registraron todos los datos del proyecto.",
        avatar: "mdi-view-dashboard",
        avatarColor: "primary lighten-5",
        avatarIconColor: "primary--text text--darken-1",
        actualState: true,
        modal: ""
      });
      if(etapas.cronogramaActivo){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Creación del Cronograma de Actividades",
          subTitle: "Estado: Cronograma Aprobado",
          paragraph:
            "Se registró el Cronograma y fue aprobado por el Jefe de Proyectos y el Cliente.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: ""
        });
      }else{
        if(etapas.cronograma == null){
          return;
        }
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Creación del Cronograma de Actividades",
          subTitle: "Estado: Pendiente de Aprobación",
          paragraph:
            "El cronograma se encuentra pendiente de aprobación.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: ""
        });
        return;
      }
      if(etapas.haycotizacion){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Creación de la Cotización",
          subTitle: "Estado: Cotización Aprobada",
          paragraph:
            "Se registró la cotización y fue aprobada por el Jefe de Proyectos y el Cliente.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: ""
        });
      }else{
         if(etapas.cotizacion == null){
          return;
        }
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Creación de la Cotización",
          subTitle: "Estado: Pendiente de Aprobación",
          paragraph:
            "La cotización se encuentra pendiente de aprobación.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: ""
        });
        return;
      }
      if(etapas.cronogramaPagos == null)return;
      if(etapas.primerPago){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Primer Pago programado",
          subTitle: "Estado: Realizado",
          paragraph:
            "El Cliente ha realizado el primer pago del cronograma asignado al proyecto.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: "detalle_pago",
          idCronogramaPagos: etapas.cronogramaPagos.id
        });
      }else{
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Primer Pago programado",
          subTitle: "Estado: Pendiente",
          paragraph:
            "El Cliente aún no ha realizado el pago del primer cronograma",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: ""
        });
        
      }
      if(etapas.contratoAprobado){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Contrato del Proyecto",
          subTitle: "Estado: Aprobado",
          paragraph:
            "El Cliente ha enviado el contrato firmado.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: "",
          idCronogramaPagos: etapas.cronogramaPagos.id
        });
      }else{
        if(etapas.primerPago){
          this.etapas.forEach(etapa => etapa.actualState = false)
        }
        this.etapas.push({
          title: "Contrato del Proyecto",
          subTitle: "Estado: Pendiente",
          paragraph:
            "El Cliente aún no ha realizado el envío del contrato firmado.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: ""
        });
      }
      if(etapas.contratoAprobado && etapas.contratoAprobado){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Pase a etapa de Desarrollo",
          paragraph:
            "El proyecto está listo para pasar a la etapa de Desarrollo.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: "pasar_desarrollo"
        });
      }
      if(etapas.etapa == "Desarrollo"){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Etapa de Desarrollo",
          paragraph:
            "El proyecto está en la etapa de Desarrollo.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: "desarrollo"
        });
      }
      else if (etapas.etapa == "Soporte" || etapas.etapa == "Finalizado"){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Etapa de Desarrollo",
          paragraph:
            "El proyecto culminó la etapa de Desarrollo.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: ""
        });
      }
      if(etapas.etapa == "Soporte"){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Etapa de Soporte",
          paragraph:
            "El proyecto está en la etapa de Soporte.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: "soporte"
        });
      }
      else if(etapas.etapa == "Finalizado"){
        this.etapas.forEach(etapa => etapa.actualState = false)
        this.etapas.push({
          title: "Etapa de Soporte",
          paragraph:
            "El proyecto culminó la etapa de Soporte.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: ""
        });
        this.etapas.push({
          title: "Etapa de Finalizado",
          paragraph:
            "El proyecto a sido culminado.",
          avatar: "mdi-view-dashboard",
          avatarColor: "primary lighten-5",
          avatarIconColor: "primary--text text--darken-1",
          actualState: true,
          modal: "finalizado"
        });
      }
      
    },
  },
};
</script>
<style scoped>
.v-application .caption-personalized {
    font-size: 1.25rem !important;
}
</style>