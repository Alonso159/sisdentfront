<template>
  <v-row>
    <v-col v-if="user.rol=='5'" cols="12" md="4">
      <v-card class="card-container">
        <div class="card-content">
          <div class="label">Usuario:</div>
          <v-label>{{ generatedUser }}</v-label>
          <div class="label">Contraseña:</div>
          <v-label>{{ generatedPassword }}</v-label>
          <div class="message">IMPORTANTE: Anote estos datos de usuario.Serán usados para futuras consultas.</div>
          <div class="message"></div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="8" lg="4">
      <div class="home-columns">
        <p v-if="user.rol == '4' || user.rol == '5'">
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardManagement",
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Dashboard",
  },
  components: {
    CardReserva,
    CardPagosPendientes,
  },
  data() {
    return {
      generatedUser: '',
      generatedPassword: ''
    };
  },
  async created() {
    await this.fetchUser();
  },
  mounted() {
    this.generateUser();
  },
  methods: {
    ...mapActions("Authentication", ["fetchUser"]),
    generateUser() {
      this.generatedUser = this.user.usuario;
      this.generatedPassword = this.user.clave;
    },
  },
  computed: {
    ...mapGetters("Authentication", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-content {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.message {
  font-weight: bold;
  color: #ff5722;
  margin-bottom: 5px;
}

.home-columns {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
}
</style>
