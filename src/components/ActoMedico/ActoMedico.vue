<template>
    <v-card>

    
    <v-row style="display: flex; flex-direction: column;">
      <v-col cols="48" md="48" lg="32">
        <div class="home-columns">
          <CardModificarPaciente v-if="['4', '5'].includes(user.rol)" :user="user" />   
        </div>
      </v-col>
      <v-col cols="48" md="48" lg="32">
        <div class="home-columns">
          <CardCitasAtendidas v-if="['4', '5'].includes(user.rol)" :user="user" />
        </div>
      </v-col>
      <v-col cols="48" md="48" lg="32">
        <div class="home-columns">
          <Odontograma v-if="['4', '5'].includes(user.rol)" :user="user" />
        </div>
      </v-col>
    </v-row>
</v-card>
</template>
    <script>
    import { mapGetters, mapActions } from "vuex";
    import CardCitasAtendidas from "@/components/HistoriaClinica/CardCitasAtendidas.vue";
    import Odontograma from "@/components/HistoriaClinica/Odontograma.vue";
    import CardModificarPaciente from "@/components/ModificarPerfil/CardModificarPaciente.vue";

  //import Odontograma from "@components/HistoriaClinica/Odontograma.vue"
    export default {
      name: "HistoriaClinica",
      metaInfo: {
        title: "HistoriaClinica",
      },
      components: {
      CardModificarPaciente,
      CardCitasAtendidas,
      Odontograma
      //Odontograma
  },
      data() {
        return {
        };
      },
      async created() {
        await this.fetchUser();
        
      },
      methods: {
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
  
