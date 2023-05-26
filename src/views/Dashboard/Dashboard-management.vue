<template>
  <v-row>
    <v-col cols="48" md="48" lg="32">
      <div class="home-columns">
        <p v-if="user.rol == '4'||user.rol=='5'">
          <CardReserva :user="this.user" />
          <CardPagosPendientes :user="this.user" />
        </p>
      </div>
    </v-col>
  </v-row>
</template>
<script>

import CardReserva from "@/components/CardReserva.vue";
import CardPagosPendientes from "@/components/CardPagosPendientes.vue";
//import CardTodo from "@/components/Todo.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardManagement",
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Dashboard",
  },
  components: {
    CardReserva, CardPagosPendientes,

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