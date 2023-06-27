<template>
  <v-card outlined color="transparent">
    <v-card-text class="py-0 pl-0">
       <v-timeline
        dense
      >
        <v-timeline-item
          v-for="(item, index) in etapas" :key="index"
          :color="colorState"
          :icon="(item.actualState ? item.avatar : '')"
          fill-dot
          :small="!item.actualState"
          :large="item.actualState"
        >
          <v-card>
            <v-card-text>
              <div class="d-flex align-center mb-3">
                <v-avatar class="mr-3" :color="item.avatarColor" rounded>
                  <v-icon :class="item.avatarIconColor">
                    {{
                    item.avatar
                    }}
                  </v-icon>
                </v-avatar>
                <div>
                  <p class="card-title mb-0">{{ item.title }}</p>
                  <span class="">
                    {{
                    item.subTitle
                    }}
                  </span>
                </div>
              </div>
              <v-card>
                <v-card-title class="pt-1 px-1 pb-0">
                  <p class="body-1">{{ item.paragraph }}</p>
                </v-card-title>
              </v-card>
              <v-divider class="py-2"></v-divider>
              <div class="d-flex justify-space-between">
                <div></div>
                <!-- <avatar-group-card class="ml-3"></avatar-group-card> -->
                <div>
                  <v-btn v-if="verificarSoporte(item.modal)" block @click="showModalDetail(item.modal, idCronogramaPagos= item.idCronogramaPagos, idContrato = item.idContrato)" color="primary">
                    <span>Forzar Soporte</span>
                  </v-btn>
                  <v-btn v-if="verificarFinalizacion(item.modal)" block @click="showModalDetail(item.modal, idCronogramaPagos= item.idCronogramaPagos, idContrato = item.idContrato)" color="primary">
                    <span>Forzar Finalización</span>
                  </v-btn>
                   <!-- <v-btn v-if="item.actualState" block @click="showModalDetail(item.modal, idCronogramaPagos= item.idCronogramaPagos, idContrato = item.idContrato)" color="primary">
                    <span>Ver</span>
                  </v-btn> -->
                  <v-btn v-else class="ml-2" bg-color="primary lighten-5" textColor="primary--text"  @click="showModalDetail(item.modal, idCronogramaPagos= item.idCronogramaPagos, idContrato = item.idContrato)"> <span>Ver Detalle</span></v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
      <v-dialog persistent v-model="dialogDetail" max-width="880px">
        <ViewDetailProyect
          @close-dialog-detail="closeModalDetail()"
        ></ViewDetailProyect>
      </v-dialog>
      <v-dialog persistent v-model="dialogodetallePago" max-width="880px">
       
      </v-dialog>
      <v-dialog v-model="dialogPasarDesarrollo" max-width="30%">
        <v-card class="pa-4">
          <v-card-title >¿Seguro que quiere pasar el proyecto a desarrollo?</v-card-title>
          <v-card-actions class="headline" style="margin-top:3%">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogPasarDesarrollo=false">Cancelar</v-btn>
            <v-btn color="blue darken-1" :loading="loadingBtn" text @click="cambiarProyectoADesarrollo">Aceptar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogPasarSoporte" max-width="30%">
        <v-card class="pa-4">
          <v-card-title >¿Seguro que quiere pasar el proyecto a soporte?</v-card-title>
          <v-card-actions class="headline" style="margin-top:3%">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogPasarSoporte=false">Cancelar</v-btn>
            <v-btn color="blue darken-1" :loading="loadingBtn" text @click="cambiarProyectoASoporte">Aceptar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogPasarFinalizado" max-width="30%">
        <v-card class="pa-4">
          <v-card-title >¿Seguro que quiere finalizar el proyecto?</v-card-title>
          <v-card-actions class="headline" style="margin-top:3%">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogPasarFinalizado=false">Cancelar</v-btn>
            <v-btn color="blue darken-1" :loading="loadingBtn" text @click="cambiarProyectoAFinalizado">Aceptar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";              
import ViewDetailProyect from "../Dashboard/ViewDetailProyect.vue"; 
import avatarGroupCard from "@/components/Cards/AvatarGroupCard";
export default {
  props: ['colorState', 'etapas', 'proyecto'],
  components:{
    avatarGroupCard,
    ViewDetailProyect,
  
  },
  data: () => ({
      dialogPasarDesarrollo: false,
      dialogPasarSoporte: false,
      dialogPasarFinalizado: false,

      dialogDetail:false,
      dialogodetallePago: false,
      loadingBtn:false,
      Pagos: {} 
    }),
  methods: {
    async showModalDetail(modal, idCronogramaPagos, idContrato){
      console.log("Presione:", modal);
      if(modal=="pasar_desarrollo"){
        this.dialogPasarDesarrollo = true; return;
      }
      if(modal=="detalle_pago"){
        this.Pagos = await this.loadPago(idCronogramaPagos);
        this.dialogodetallePago = true; return;
      }
      if(modal=="detalle_contrato"){
        this.dialogPasarDesarrollo = true; return;
      }
      if(modal=="desarrollo"){
        this.dialogPasarSoporte = true;return;
      }
      if(modal=="soporte"){
        this.dialogPasarFinalizado = true;return;
      }
    },
    closeDialogDetalle(){
      this.dialogodetallePago = false;
    },
    
    async cambiarProyectoADesarrollo(){
      this.loadingBtn = true;
      console.log("IDCronograma para pasar a desarrollo", this.proyecto.idcronograma);
      await axios
        .post("/Actividades/CreateActivities?idCronograma=" + this.proyecto.idcronograma + "&idProyecto=" + this.proyecto.id + "&nuevoEstado=Desarrollo")
        .then((res) => {
          const actividades = res.data;
          console.log(actividades);
          this.$router.go();

        })
        .catch((err) => console.log(err))
        .finally((res) => this.loadingBtn = true);
      // return proyectoDATA;
    },
    async cambiarProyectoASoporte(){
      this.loadingBtn = true;
      await axios
        .get("/Proyecto/CambiarEstadoProyecto?idProyecto=" + this.proyecto.id  + "&nuevoEstado=Soporte")
        .then((res) => {
          const actividades = res.data;
          this.$router.go();
        })
        .catch((err) => console.log(err))
        .finally((res) => this.loadingBtn = true);
      // return proyectoDATA;
    },
    async cambiarProyectoAFinalizado(){
      this.loadingBtn = true;
      await axios
        .get("/Proyecto/CambiarEstadoProyecto?idProyecto=" + this.proyecto.id  + "&nuevoEstado=Finalizado")
        .then((res) => {
          const actividades = res.data;
          this.$router.go();
        })
        .catch((err) => console.log(err))
        .finally((res) => this.loadingBtn = true);
      // return proyectoDATA;
    },
    async loadPago(id) {
      let pago = {};
      await axios
        .get("/CronogramaPagos/ObtenerPorId?id=" + id)
        .then((res) => {
          
          // for(let i = 0;i < res.data.ListCronogramaPago.lenght;i++){
          //   var fecha = res.data.ListCronogramaPago[i].datos.fecha_nacimiento.split("T");
          //   res.data.ListCronogramaPago[i].datos.fecha_nacimiento=fecha[0];
          // } 
          var fecha = res.data.fecha_incio.split("T");
          res.data.fecha_incio=fecha[0]
           var fecha_fin = res.data.fecha_fin.split("T");
          res.data.fecha_fin=fecha_fin[0]      
           var fecha_inicio_vigencia = res.data.pagos_programados[0].fecha_inicio_vigencia.split("T");
          res.data.pagos_programados[0].fecha_inicio_vigencia=fecha_inicio_vigencia[0]
           var fecha_fin_vigencia = res.data.pagos_programados[0].fecha_fin_vigencia.split("T");
          res.data.pagos_programados[0].fecha_fin_vigencia=fecha_fin_vigencia[0]   
           var fecha_pago = res.data.pagos_programados[0].voucher.fecha_pago.split("T");
          res.data.pagos_programados[0].voucher.fecha_pago=fecha_pago[0]          
          pago = res.data;
            console.log("esto es")
          console.log(pago)
        })
        .catch((err) => console.log(err));
      return pago;
    },
    verificarSoporte(estado){
      console.log(estado);
      if(estado == "desarrollo"){
        return true;
      }
      else{
        return false;
      }
    },
    verificarFinalizacion(estado){
      console.log(estado);
      if(estado == "soporte"){
        return true;
      }
      else{
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>