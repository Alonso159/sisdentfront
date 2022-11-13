<template>
  <v-row>
    <v-col cols="12" md="12" lg="8">
      <div class="home-columns">
        <div class="item-left">
        </div>
        <CardCitas :user="this.user" />
      </div>
    </v-col>
  </v-row>
</template>
<script>


import {
  welcomeProgressChart,
  studyChart,
} from "@/data/DashboardManagement/WelcomeProgressChart";
import CardCitas from "@/components/CardCitas.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardManagement",
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Dashboard",
  },
  components: {
    CardCitas,
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