<template>
  <v-row>
    <v-col cols="12" md="12" lg="8">
      <div class="home-columns">
        <CardReserva :user="this.user" />
      
      </div>
    
    </v-col>
  </v-row>
</template>
<script>

import CardReserva from "@/components/CardReserva.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardManagement",
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Dashboard",
  },
  components: {
    CardReserva,
   
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
  justify-content: center;
  flex-wrap: nowrap;
  margin: 1% 3%;
}
</style>