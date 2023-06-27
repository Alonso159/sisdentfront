<template>
  <v-card elevation="3" class="card-c">
    <div class="div_reservar">
      <v-btn
      class="button-89"
      @click="reservarCita()">
      RESERVE SU CITA
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
//import CardCita from "@/components/GestionarCitas/CardCita.vue";
export default {
  name: "CardCitas",
  components: {
   // CardCita, 
  },
  props: ["user"],
  data: () => ({
    dialogReservarCita: false,
    listaCitas: [],
    hoy: moment().format("L").replaceAll("/", "-"),
    fecha: "",
  }),
  async created() {
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
  },
  methods: {
    openDialogReservarCita() {
      this.dialogReservarCita = true;
    },
    closeDialogReservarCita() {
      this.dialogReservarCita = false;
    },
    reservarCita() {
      this.$router.push(`tratamientos`);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-c {
  padding: 1%;
  border-radius: 200px;
}

.button-89 {
  --b: 3px;   
  --s: .45em;
  --color: #373B44;
  padding: calc(.5em + var(--s)) calc(.9em + var(--s));
  color: var(--color);
  --_p: var(--s);
  background:
    conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
    var(--_p) var(--_p)/calc(100% - var(--b) - 2var(--_p)) calc(100% - var(--b) - 2*var(--_p));
  transition: .3s linear, color 0s, background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: .6em;
  font-size: 45px;

  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-89:hover,
.button-89:focus-visible{
  --_p: 0px;
  outline-color: var(--color);
  outline-offset: .05em;
}

.button-89:active {
  background: var(--color);
  color: #fff;
}

h2 {
  font-size: 18px;
  margin-top: 5%;
}

.div_reservar {
  display: flex;
}
.item-cita {
  margin: 4% 0;
}
</style>

