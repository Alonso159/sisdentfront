<template>
  <v-row>
    <v-col cols="48" md="48" lg="32">
      <div class="home-columns">
        <CardModificarPaciente v-if="['4', '5'].includes(user.rol)" :user="user" />
        <CardModificarTrabajador v-else-if="['0','1', '2', '3'].includes(user.rol)" :user="user" />
      </div>
    </v-col>
  </v-row>
</template>

  <script>
  import { mapGetters, mapActions } from "vuex";
import CardModificarPaciente from "@/components/ModificarPerfil/CardModificarPaciente.vue";
import CardModificarTrabajador from "@/components/ModificarPerfil/CardModificarTrabajador.vue";
  export default {
    name: "ModificarPerfil",
    metaInfo: {
      title: "ModificarPerfil",
    },
    components: {
    CardModificarPaciente,
    CardModificarTrabajador
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
