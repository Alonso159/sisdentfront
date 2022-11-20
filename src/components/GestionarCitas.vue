<template>
  <v-card height:10px class="card" style="margin: 10px auto 0; width: 100%">
      <v-data-table
        expand-icon="$expand"
        :headers="headers"
        :items="listaCitas"
        :search="search"
        class="elevation-1"
      >
         <template v-slot:item.estado_cita="{ item }">
            <v-chip
        :color="getColor(item.estado_cita)"
        dark
      >
        {{ item.estado_cita }}
      </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row>
            <v-btn
              color="info"
              small
              dark
              :disabled="verificaEstado(item.estado_cita)"
              class="ml-4"
              @click="abrirModalVisualizarReunion(item.cronograma.id)"
            >
              <v-icon left> mdi-file-eye </v-icon>
              <span>Pagar</span>
            </v-btn>
            <v-btn
              color="info"
              small
              dark
              
              class="ml-4"
              @click="abrirModalVisualizarReunion(item.cronograma.id)"
            >
              <v-icon left> mdi-file-eye </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>

import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GestionarCronograma",
  components: {
   
  },
  data() {
    return {
      search: "",
      headers: [

        { text: "Estado", value: "estado_cita" },
        { text: "Tratamiento", value: "id_tratamiento" },
        { text: "Fecha", value: "fecha_cita" },
        { text: "Acciones", value: "actions", sortable: false },

      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
       dialogocambio: false,
      dialogodetalle: false,
    };
  },
  async created() {
    await this.obtenerCitas();
  },
  async mounted(){
  },
  methods: {
     ...mapActions("Citas", ["setListaCitas"]),
          //obtener los citas listados
    async obtenerCitas() {
     await axios
        .get(
          "/Cita/GetAllCitas?id_paciente=" + this.user.infoUser.id
        )
        .then((x) => {
          const listaCita = x.data;
          for(var i=0;i<listaCita.length;i++)
            {listaCita[i].fecha_cita=x.data[i].fecha_cita.split("T")[0]}
          this.setListaCitas(listaCita);
        })
        .catch((err) => console.log(err));
    },
     getColor(estadoCita){
        if(estadoCita=="Sin pagar")  return "red"   
        else if (estadoCita=="Por atender") return "green"
        else if(estadoCita==null) "black"
      },
      verificaEstado(estadoCita)
      {
        if(estadoCita=="Sin pagar")return false;
        else return true
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
    ...mapGetters("Authentication", ["user"]),
    ...mapGetters("Citas", ["listaCitas"])
  },
};
</script>
<style scoped>
.card {
  margin: 200 px;
}
</style>

