<template>
  <v-row>
    <v-col cols="12" md="12" lg="8">
    </v-col>

    
  </v-row>
</template>
<script>
import DashboardNewProjectCard from "@/components/Cards/DashboardNewProjectCard";
import {
  welcomeProgressChart,
  studyChart,
} from "@/data/DashboardManagement/WelcomeProgressChart";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardManagement",
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Dashboard",
  },
  components: {
    DashboardNewProjectCard,
  },
  data() {
    return {
      iconClass:"dark--text text--lighten-4 info lighten-5",
      iconHito:"https://e7.pngegg.com/pngimages/556/638/png-clipart-project-management-computer-icons-the-noun-project-agile-process-icon-blue-text.png",
      fechaSetHito:"20-05-2021",
      listHitos:[],
      userId: "",
      welcomeProgressChart,
      studyChart,
      datachart:{},
      valueDeterminate: 50,
      valueDeterminate2: 80,
      items: [
        {
          icon: "mdi-flag",
          iconClass: "dark--text text--lighten-4 info lighten-5",
          title: "Entregable 1 - PROY-001",
          subtitle: "15 de mayo del 2022",
        },
        {
          icon: "mdi-flag",
          iconClass: "dark--text text--lighten-4 info lighten-5",
          title: "Entregable 2 | PROY-002",
          subtitle: "16 de mayo del 2022",
        },
        {
          icon: "mdi-flag",
          iconClass: "dark--text text--lighten-4 info lighten-5",
          title: "Entregable 3 | PROY-003",
          subtitle: "24 de mayo del 2022",
        },
      ],
      itemsTwo: [
        {
          icon: "mdi-book-alert",
          iconClass: "dark--text text--lighten-4 grey lighten-5",
          title: "Reuniones pendientes",
          subtitle: "23 Dec 2020",
        },
        {
          icon: "mdi-chart-bar",
          iconClass: "dark--text text--lighten-4 grey lighten-5",
          title: "Rendimiento mensual",
          subtitle: "23 Dec 2020",
        },
        {
          icon: "mdi-email-alert",
          iconClass: "dark--text text--lighten-4 grey lighten-5",
          title: "Correos sin leer",
          subtitle: "23 Dec 2020",
        },
        {
          icon: "mdi-order-bool-ascending-variant",
          iconClass: "dark--text text--lighten-4 grey lighten-5",
          title: "Tareas asignadas",
          subtitle: "23 Dec 2020",
        },
      ],
    };
  },
  async created(){
    console.log("DASHBOARD")
    //await this.fetchUser();
    //await this.obtenerProyectos();
    //await this.obtenerProyectosVSTareas();
   // await this.ObtenerHitos();
  },
  methods: {
    ...mapActions("Authentication", ["fetchUser"]),
    ...mapActions("Global", ["setGlobIdProject"]),
    ...mapActions("Proyecto", ["setListaProyectos"]),
    ...mapActions("Proyecto", ["setListaProyectos_vs_Tareas"]),

   /* async obtenerProyectos() {
      await axios
        .get("/Proyecto/ListaProyectos_Analista")
        .then((res) => {
          const listProyectos = res.data;
          console.log(listProyectos);
          this.setListaProyectos(listProyectos);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.isLoadingTable = false;
        });
    },*/
 /*   async obtenerProyectosVSTareas() {
      await axios
        .get("/Proyecto/ListaProyectosConTareasPorEstado")
        .then((res) => {
          this.setListaProyectos_vs_Tareas(res.data);
          let tasksChart = {
            series: [
              {
                name: "Tareas pendientes",
                data: res.data.map((x) => x.tareasPendientes),
              },
              {
                name: "Tareas en desarrollo",
                data: res.data.map((x) => x.tareasEnDesarrollo),
              },
              {
                name: "Tareas finalizadas",
                data: res.data.map((x) => x.tareasFinalizadas),
              },
              {
                name: "Tareas por corregir",
                data: res.data.map((x) => x.tareasCorregir),
              },
              {
                name: "Tareas por revisar",
                data: res.data.map((x) => x.tareasPorRevisar),
              },
            ],
            chartOptions: {
              chart: {
                type: "bar",
                stacked: true,
                toolbar: {
                  show: false,
                },
              },
              // tooltip: {
              //   theme: 'dark'
              // },
              legend: {
                position: "bottom",
                itemMargin: {
                  horizontal: 10,
                  vertical: 15,
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "20px",
                },
              },
              dataLabels: {
                enabled: false,
              },

              colors: ["#0081ff", "#e95455", "#e97d23"],
              xaxis: {
                axisBorder: {
                  show: false,
                },

                categories: res.data.map((x) => x.nombre),
              },
              yaxis: {
                show: false,
              },
              grid: {
                show: false,
              },
            },
          };
          this.datachart=tasksChart;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.isLoadingTable = false;
        });
    },*/
  /*  async ObtenerHitos(){
       await axios
        .get("/Cronograma/Get_CronogramaxHitos?days=90")
        .then((res) => {
          this.listHitos = res.data;
       
        })
        .catch((err) => {
          console.log(err)
        })
    },*/
    setGlobProject(idProyecto) {
      this.setGlobIdProject(idProyecto);
    },
  },
  computed: {
   
    ...mapGetters("Global", ["GlobIdProject"]),
    ...mapGetters("Authentication", ["user"]),
  },
};
</script>
<style lang="scss" scoped>
.p-phrase {
  font-family: "Segoe UI" !important;
  font-size: 1rem;
  line-height: 25px;
  font-style: italic;
}
</style>