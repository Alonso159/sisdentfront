<template>
<div class="post d-flex flex-column-fluid text-right p-0" id="kt_post">
    <div id="kt_content_container" class="container-xxl">
      <h2 class="text-muted mb-4">Principales</h2>
        <div class="bg-white pt-7 pb-7 text-left" style="border-radius: 2rem;">
            
            <div class="d-flex flex-wrap justify-content-center align-items-flex-start">
                <a asp-controller="RegistrationRequest" asp-action="Index" class="btn btn-light-success btn-hover-scale m-2 d-flex flex-column align-items-center justify-content-center" style="border-radius: 2.5rem;width: 10rem; height: 8.5rem;">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M18 22C19.7 22 21 20.7 21 19C21 18.5 20.9 18.1 20.7 17.7L15.3 6.30005C15.1 5.90005 15 5.5 15 5C15 3.3 16.3 2 18 2H6C4.3 2 3 3.3 3 5C3 5.5 3.1 5.90005 3.3 6.30005L8.7 17.7C8.9 18.1 9 18.5 9 19C9 20.7 7.7 22 6 22H18Z" fill="currentColor" />
                        <path d="M18 2C19.7 2 21 3.3 21 5H9C9 3.3 7.7 2 6 2H18Z" fill="currentColor" />
                        <path d="M9 19C9 20.7 7.7 22 6 22C4.3 22 3 20.7 3 19H9Z" fill="currentColor" />
                    </svg>
                    <spam class="mt-2" style="line-height: 0.9rem"><small>Solicitudes de Inscripción</small></spam>
                </a>
                <a asp-controller="RegistrationRequest" asp-action="RejectedRequests" class="btn btn-light-success btn-hover-scale m-2 d-flex flex-column align-items-center justify-content-center" style="border-radius: 2.5rem; width: 10rem; height: 8.5rem;">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M18 22C19.7 22 21 20.7 21 19C21 18.5 20.9 18.1 20.7 17.7L15.3 6.30005C15.1 5.90005 15 5.5 15 5C15 3.3 16.3 2 18 2H6C4.3 2 3 3.3 3 5C3 5.5 3.1 5.90005 3.3 6.30005L8.7 17.7C8.9 18.1 9 18.5 9 19C9 20.7 7.7 22 6 22H18Z" fill="currentColor" />
                        <path d="M18 2C19.7 2 21 3.3 21 5H9C9 3.3 7.7 2 6 2H18Z" fill="currentColor" />
                        <path d="M9 19C9 20.7 7.7 22 6 22C4.3 22 3 20.7 3 19H9Z" fill="currentColor" />
                    </svg>
                    <spam class="mt-2" style="line-height: 0.9rem"><small>Solicitud Rechazadas</small></spam>
                </a>
                <a asp-controller="Error" asp-action="Index" class="btn btn-light-success btn-hover-scale m-2 d-flex flex-column align-items-center justify-content-center" style="border-radius: 2.5rem; width: 10rem; height: 8.5rem;">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M18 22C19.7 22 21 20.7 21 19C21 18.5 20.9 18.1 20.7 17.7L15.3 6.30005C15.1 5.90005 15 5.5 15 5C15 3.3 16.3 2 18 2H6C4.3 2 3 3.3 3 5C3 5.5 3.1 5.90005 3.3 6.30005L8.7 17.7C8.9 18.1 9 18.5 9 19C9 20.7 7.7 22 6 22H18Z" fill="currentColor" />
                        <path d="M18 2C19.7 2 21 3.3 21 5H9C9 3.3 7.7 2 6 2H18Z" fill="currentColor" />
                        <path d="M9 19C9 20.7 7.7 22 6 22C4.3 22 3 20.7 3 19H9Z" fill="currentColor" />
                    </svg>
                    <spam class="mt-2" style="line-height: 0.9rem"><small>Inscripcioness</small></spam>
                </a>
                <a asp-controller="Competitor" asp-action="Index" class="btn btn-light-success btn-hover-scale m-2 d-flex flex-column align-items-center justify-content-center" style="border-radius: 2.5rem; width: 10rem; height: 8.5rem;">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z" fill="currentColor" />
                        <rect opacity="0.3" x="14" y="4" width="4" height="4" rx="2" fill="currentColor" />
                        <path d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z" fill="currentColor" />
                        <rect opacity="0.3" x="6" y="5" width="6" height="6" rx="3" fill="currentColor" />
                    </svg>
                    <spam class="mt-2" style="line-height: 0.9rem"><small>Participantes</small></spam>
                </a>
                
            </div>
        </div>
    </div>
</div>
 
</template>
<script>


import axios from "axios";
import { mapMutations , mapActions, mapGetters} from "vuex";


export default {
  name: "Tratamientos",
  components: {   
  },
  data() {
    return {
      search: "",
     headers: [

         {text:"Nombre", align: "start", sortable: false, value:"nombre"},
        { text: "Código", value: "codigo" },
        { text: "Estado", value: "estado" },
        { text: "Descripción", value: "descripcion" },
        
        
         { text: "", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
     
             
    };

    
  },
  async created() {
    this.obtenerTratamientos();
  
  },
  methods:{
    ...mapActions("Tratamientos", ["setListaTratamientos"]),
     //cerrar dialogo 
      estadoActual(array){
      if(array === 'listo'){
        return false
      }else{
        return true
      }
    },
     async abrirDialogo(id) {
    //  this.Especialidad = await this.loadUsuarioEspecialidad(id);
      this.dialogoRegistrar= !this.dialogoRegistrar;
    },
    
 //obtener todos los tratamientos del sistema
    async obtenerTratamientos() {
      await axios
        .get("/Tratamiento/GetAllTratamiento")
        .then((x) => {
          let listaE=[];
          this.listaE = x.data;
           this.setListaTratamientos(this.listaE);
        })
        .catch((err) => console.log(err));
    },
    async loadUsuarioEspecialidad(id) {
      var user = {};
      await axios
        .get("/Especialidad/Id?id=" + id)
        .then((res) => {
          console.log(res);
          user = res.data;
          console.log(user)
        })
        .catch((err) => console.log(err));
      console.log(user);     
      return user;
    },    
   
  },
 
  computed: {
     ...mapMutations("Tratamientos", ["ListaTratamientos"]),
    ...mapGetters("Tratamientos",["listaTratamientos"]),
  computedItems() {
      // return this.items.map(this.mapItem);
      let permisos = [];
       axios
        .get("/Tratamiento/GetAllTratamiento")
        .then((x) => {
          let listaE=[];
          listaE = x.data;
      //    this.setListaTratamientos(listaE);
           permisos= this.listaE
           console.log({permisos})
        })
        .catch((err) => console.log(err));
      return permisos;
    },
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>