<template>
   <v-card elevation="3" class="card-c">
    <div class="div_reservar" >
        <v-btn
        class="button-cita"
        @click="reservarCita()">
        PAGAR
        </v-btn>
      </div>
   </v-card>
      
   
  </template>
  
  <script>
  import moment from "moment";
  import "moment/locale/es";
  import CardCita from "@/components/GestionarCitas/CardCita.vue";
  export default {
    name: "CardCitas",
    components: {
      CardCita, 
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
    border-radius: 10px;
   width:fit-content;
    
  }
  
  .button-cita {
  background: rgb(58, 123, 213);
  background: linear-gradient(
    0deg,
    rgba(58, 123, 213, 1) 0%,
    rgba(86, 146, 230, 1) 100%
  );
  width: 50vh;
  color: white;
  align-self: center;
  border-radius: 20px;
  height: 10vh;
  font-size: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
  img {
    padding: 2% 5% 0 5%;
  }
}
  

  
  .div_reservar {
    display: flex;
    justify-content:center
  }
  .item-cita {
    margin: 4% 0;
  }
  </style>
  
  