<template>
  <base-card>
        <v-card-text class>
          <div class="mb-5">
            <v-card-title class="px-0 pt-0 pb-3">
              <div class="card-title ma-0">Resumen de Cronograma</div>
            </v-card-title>
            <v-card-text>
             
            </v-card-text>
          </div>
        </v-card-text>
      </base-card>
</template>
<script>
import axios from "axios";
import moment from "moment";


import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderTitle from "@/components/base/HeaderTitle";


function getDate(hours) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(
    currentYear,
    currentMonth,
    currentDay,
    0,
    0,
    0
  ).getTime();
  console.log(new Date(timeStamp + hours * 60 * 60 * 1000));
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}
//
const tasks = [
  {
    id: 1,
    label: "Módulo 1",
    start:  moment("2022-07-12").toDate(),
    duration: 96 * 60 * 60 * 1000,
    type: "project",
  },
  {
    id: 2,
    label: "SubMódulo 1",
    start: moment("2022-07-12").toDate(),
    duration: 48 * 60 * 60 * 1000,
    parentId: 1,
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0",
      },
    },
    type: "task",
  },
  {
    id: 3,
    label: "Actividad 1",
    start:  moment("2022-07-12").toDate(),
    duration: 24 * 60 * 60 * 1000,
    parentId: 2,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
    type: "task",
  },
  {
    id: 4,
    label: "Actividad 2",
    start:  moment("2022-07-13").toDate(),
    duration: 24 * 60 * 60 * 1000,
    parentId: 2,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
    type: "task",
  },
  {
    id: 5,
    label: "SubMódulo 2",
    start:  moment("2022-07-14").toDate(),
    duration: 48 * 60 * 60 * 1000,
    parentId: 1,
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0",
      },
    },
    type: "task",
  },
  {
    id: 6,
    label: "Actividad 1",
    start:  moment("2022-07-14").toDate(),
    duration: 24 * 60 * 60 * 1000,
    parentId: 5,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
    type: "task",
  },
  {
    id: 7,
    label: "Actividad 2",
    start:  moment("2022-07-15").toDate(),
    duration: 24 * 60 * 60 * 1000,
    parentId: 5,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
    type: "task",
  },
  {
    id: 8,
    label: "Hito 1",
    start:  moment("2022-07-16").toDate(),
    duration: 24 * 60 * 60 * 1000,
    style: {
      base: {
        fill: "#1EBC61",
        stroke: "#0EAC51",
      },
    },
    type: "milestone",
  },
  {
    id: 9,
    label: "Módulo 2",
    start:  moment("2022-07-17").toDate(),
    duration: 96 * 60 * 60 * 1000,
    type: "project",
  },
  {
    id: 10,
    label: "SubMódulo 1",
    start: moment("2022-07-17").toDate(),
    duration: 48 * 60 * 60 * 1000,
    parentId: 9,
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0",
      },
    },
    type: "task",
  },
  {
    id: 11,
    label: "Actividad 1",
    start:  moment("2022-07-17").toDate(),
    duration: 24 * 60 * 60 * 1000,
    parentId: 10,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
    type: "task",
  },
  {
    id: 12,
    label: "Actividad 2",
    start:  moment("2022-07-18").toDate(),
    duration: 24 * 60 * 60 * 1000,
    parentId: 10,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
    type: "task",
  },
  {
    id: 13,
    label: "SubMódulo 2",
    start:  moment("2022-07-19").toDate(),
    duration: 48 * 60 * 60 * 1000,
    parentId: 9,
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0",
      },
    },
    type: "task",
  },
  {
    id: 14,
    label: "Actividad 1",
    start:  moment("2022-07-19").toDate(),
    duration: 24 * 60 * 60 * 1000,
    parentId: 9,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
    type: "task",
  },
  {
    id: 15,
    label: "Actividad 2",
    start:  moment("2022-07-20").toDate(),
    duration: 24 * 60 * 60 * 1000,
    parentId: 9,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
    type: "task",
  },

];
let options = {
  maxRows: 100,
  maxHeight: 300,
  title: {
    label: "Your project title as html (link or whatever...)",
    html: false,
  },
  row: {
    height: 24,
  },
  calendar: {
    hour: {
      display: false,
    },
  },
  chart: {
    progress: {
      bar: false,
    },
    expander: {
      display: true,
    },
  },
  taskList: {
    expander: {
      straight: false,
    },
    columns: [
      {
        id: 1,
        label: "Descripción",
        value: "label",
        width: 200,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            alert("description clicked!\n" + data.label);
          },
        },
      },
      {
        id: 2,
        label: "Fecha Inicio",
        value: (task) => moment(task.start).format("YYYY-MM-DD"),
        width: 100,
      },
      {
        id: 3,
        label: "Tipo",
        value: (task) => {
          if(task.type == "project"){
            return "Módulo"
          }
          if(task.type == "milestone"){
            return "Hito"
          }
          if(task.type == "task" && task.style.base.fill=="#0287D0"){
            return "SubMódulo"
          }
          if(task.type == "task" && task.style.base.fill=="#8E44AD"){
            return "Actividad"
          }
        },
        width: 80,
      },
    ],
  },
  locale:{
    name: 'pl', // name String
    weekdays: 'Lunes_Martes_Miercoles_Jueves_Viernes_Sabado_Domingo'.split('_'), // weekdays Array
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'), // months Array
  }
};

export default {
  name: "FormularioContrato",
  props: ["Cronograma"],
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Formulario Contrato",
  },
  components: {
    HeaderTitle,
 // or Header
   
  },
  data(){
    return{
      tasks: tasks.map((task) => Object.assign({}, task)),
      prueba:[],
      options,
      dynamicStyle: {
        "task-list-header-label": {
          "font-weight": "bold",
        },
      },
      destroy: false,
      completeStep: 1,
      listRedirections: [
        {
          text: "Bandeja",
          url: "/GestionarContratos"
        },
        {
          text: "Formulario",
          url: "#"
        }
      ],
      nowDate: new Date().toISOString().slice(0,10),
      
    }
  },
  watch:{
    
  },
  async created() {
    console.log(this.Cronograma)
    this.obtieneCronograma();
  },
  methods: {  
    async obtieneCronograma(){
      var contador=0;
      var cronograma={};
       await axios
        .get("/Cronograma/BusquedaPorId?id_cronograma="+this.Cronograma.id)
        .then((res) => {
          cronograma = res.data;
        })
        .catch((err) => console.log(err));
        let listaModulo=[];
        listaModulo=cronograma.modulo
        //Modulos
        for(let i=0;i<listaModulo.length;i++){
          contador++;
          var moduloPrueba={ id:"",label:"",start:"",duration:0,type:"project"};
          moduloPrueba.id=contador
          moduloPrueba.label=cronograma.modulo[i].nombre
          moduloPrueba.start=cronograma.modulo[i].fecha_inicio
          moduloPrueba.duration=cronograma.modulo[i].horas_estimadas * 60 * 60 * 1000
         
          this.prueba.push(moduloPrueba)
          let listaSubModulo=[];
          listaSubModulo=cronograma.modulo[i].submodulos;
          //Submodulos
          for(let j=0;j<listaSubModulo.length;j++)
          {
            var submoduloPrueba={ id:"",label:"",start:"",duration:0,type:"task",ParentId:0,style:{base:{fill:"#0287D0",stroke: "#0077C0"}}};
            contador++;
            submoduloPrueba.id=contador
            submoduloPrueba.label=cronograma.modulo[i].submodulos[j].nombre
            submoduloPrueba.start=cronograma.modulo[i].submodulos[j].fecha_inicio
            submoduloPrueba.duration=cronograma.modulo[i].submodulos[j].horas_estimadas* 60 * 60 * 1000
            submoduloPrueba.ParentId=moduloPrueba.id;
             this.prueba.push(submoduloPrueba)
            let listaActividades=[];
            listaActividades=cronograma.modulo[i].submodulos[j].actividades;
            //Actividades
            for(let k=0;k<listaActividades.length;k++)
            {
            var actividadPrueba={ id:"",label:"",start:"",duration:0,type:"task",ParentId:0,style:{base:{fill:"#8E44AD",stroke: "#7E349D"}}};
            contador++;
            actividadPrueba.id=contador
            actividadPrueba.label=cronograma.modulo[i].submodulos[j].actividades[k].nombre
            actividadPrueba.start=cronograma.modulo[i].submodulos[j].actividades[k].fecha_inicio
            actividadPrueba.duration=cronograma.modulo[i].submodulos[j].actividades[k].horas_estimadas* 60 * 60 * 1000
            actividadPrueba.ParentId=submoduloPrueba.id;
            this.prueba.push(actividadPrueba)
            }
          }
          contador++
            var hito={id:"",label:"",start:"",duration:0,type:"milestone",style:{base:{fill:"#1EBC61",stroke: "#0EAC51"}}}
            hito.id=contador;
            hito.label="HITO del "+ moduloPrueba.label
            hito.start=cronograma.modulo[i].hito.fecha_hito
            hito.duration=24 * 60 * 60 * 1000;
            this.prueba.push(hito)
        }
    },
    mensaje(icono, titulo, texto, footer) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    getDate(hours) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      const timeStamp = new Date(`${currentYear}-${currentMonth}-${currentDay} 00:00:00`).getTime();
      return new Date(timeStamp + hours * 60 * 60 * 1000);
    }
  },
  computed: {
    ...mapGetters("Authentication", ["user"]),
    getMaxDateInicio(){
      let fecha_inicio_vigencia = this.selectedCronogramaPagos.fecha_incio;
      return (fecha_inicio_vigencia) ? fecha_inicio_vigencia : new Date().toISOString().slice(0,10);
    },
    getMinDateFin(){
      let fecha_fin_vigencia = this.selectedCronogramaPagos.fecha_fin;
      return (fecha_fin_vigencia) ? fecha_fin_vigencia : new Date().toISOString().slice(0,10);
    }
  },
}
</script>

<style scoped>
.v-stepper__header {
  box-shadow: none;
} 
.stepper-margin-custom{
  margin: 0px 200px 0px 200px;
}
</style>