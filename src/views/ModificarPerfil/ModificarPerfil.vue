<template>
  <v-row>
    <v-col cols="48" md="48" lg="32">
      <div class="home-columns">
        <ModificarPerfilPaciente v-if="['4', '5'].includes(user.rol)" :user="user" />
        <ModificarPerfilTrabajador v-else-if="['0','1', '2', '3'].includes(user.rol)" :user="user" />
      </div>
    </v-col>
  </v-row>
</template>

  <script>
  import { mapGetters, mapActions } from "vuex";
import ModificarPerfilPaciente from "./ModificarPerfilPaciente.vue";
import ModificarPerfilTrabajador from "./ModificarPerfilTrabajador.vue";
  export default {
    name: "ModificarPerfil",
    metaInfo: {
      title: "ModificarPerfil",
    },
    components: {
    ModificarPerfilPaciente,
    ModificarPerfilTrabajador
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