<template>
  <v-row>
    <v-col >
      <div class="home-columns">
        <CardReserva :user="this.user" />
      
      </div>
      <div class="home-columns">
       
        <CardCitas :user="this.user" />
      </div>
    </v-col>
  </v-row>
</template>
<script>

import CardReserva from "@/components/CardReserva.vue";
import CardCitas from "@/components/CardCitas.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardManagement",
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Dashboard",
  },
  components: {
    CardReserva,
    CardCitas
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
    ...mapActions("Global", ["setGlobIdProject"]),
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

.home-columns {

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 1% 3%;
}
</style>