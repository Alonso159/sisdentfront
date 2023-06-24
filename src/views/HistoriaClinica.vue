<template>
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
      beforeCreate() {
        this.loadStyles();
        this.loadScripts();
      },
      methods: {
        ...mapActions("Authentication", ["fetchUser"]),
        loadStyles() {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
          document.head.appendChild(link);
          
          const link2 = document.createElement('link');
          link2.rel = 'stylesheet';
          link2.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
          document.head.appendChild(link2);

          const link3 = document.createElement('link');
          link3.rel = 'stylesheet';
          link3.href = '../../assets/css/styleodo.css';
          document.head.appendChild(link3);
        },
        loadScripts() {

          const script3 = document.createElement('script');
          script3.src = '../../assets/js/app/odontograma.js';
          document.head.appendChild(script3);
          
          // eval(script3.textContent); // Ejecutar el contenido del script utilizando eval()

          const script1 = document.createElement('script');
          script1.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js';
          script1.async = true;
          document.body.appendChild(script1);
        }
      },
      computed: {
        ...mapGetters("Authentication", ["user"]),
      },
      
    };
    </script>
    <style lang="scss" scoped>
    .home-columns {
    
      display: flex;
      flex-direction: row;
      justify-content: left;
      flex-wrap: nowrap;
    }
    </style>
  
