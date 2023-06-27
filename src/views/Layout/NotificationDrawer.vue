<template>
  <vue-perfect-scrollbar
    :settings="{ suppressScrollX: true, wheelPropagation: false }"
    class="h-100 rtl-ps-none ps scroll"
    style="height: 100%"
  >
    <div class="pa-5 relative">
      <v-app-bar class="pt-1" fixed flat>
        <div class="d-flex justify-space-between align-center w-full">
          <h6 class="ma-0">Notificaciones</h6>
          <slot name="notificationDrawerCloseButton"></slot>
        </div>
      </v-app-bar>
    </div>
    
    <div class="px-5 pt-5 mt-5">
      <v-chip
        class="mr-2"
        link
        :color="colorBadgeShowAll"
        @click="ShowListNotifications(showAll = true)"
      >Todos</v-chip>
      <v-chip
        link
        :color="colorBadgeShowPending"
        @click="ShowListNotifications(showAll = false)"
      >No Leídos</v-chip>
    </div>

    <div class="pa-5 mt-1">
      <!-- <div class="heading-label pa-0 mb-8">Notifications</div> -->

      <div v-for="(item, index) in processedNotifications" :key="index">
        <div class="mb-3">
          <div class="d-flex justify-space-between">
            <div class="d-flex justify-space-between">
              <v-badge
                size="40" class="mr-5 mt-3"
                :value="(item.estado.codigo == 'sin_leer') ? 1 : 0"
                dot
                
              >
                <v-icon large :class="item.icono_info.class_icono">{{ item.icono_info.nombre_icono }}</v-icon>
              </v-badge>

              <div @click="GoToUrl(url = item.url_formulario, setNotificationReaded = true)" style="cursor:pointer;">
                <p class="font-weight-medium body-2 ma-0">
                  {{ item.titulo }}
                </p>
                <div>
                  <span>
                    {{ item.cuerpo }}
                  </span><br>
                  <span class="text--disabled caption">{{ TiempoTranscurrido(item.fecha_creacion) }}</span>
                </div>
              </div>
            </div>
            <div>
              <v-menu left bottom>
                <template v-slot:activator="{on}">
                  <v-btn icon color v-on="on" class="mt-3">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>

                <v-list>
                    <v-list-item style="cursor:pointer;" @click="ChangeStateNotification(item.id)">
                      <v-icon class="body-1 mr-2">{{(item.estado.codigo == "leido") ? "mdi-eye-off" : "mdi-eye"}}</v-icon>
                      <v-list-item-title>Marcar como {{(item.estado.codigo == "leido") ? "no leído" : "leído"}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item style="cursor:pointer;" @click="GoToUrl(url = item.url_bandeja, setNotificationReaded = false)">
                      <v-icon class="body-1 mr-2">mdi-view-dashboard</v-icon>
                      <v-list-item-title>Ir a la bandeja</v-list-item-title>
                    </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>
        <v-divider class="py-2"></v-divider>
      </div>
    </div>
  </vue-perfect-scrollbar>
</template>
<script>
//import moment from "moment";
import axios from "axios";
export default {
  props: {
    notificaciones: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      timer: null,
      listNotificaciones: [],
      processedNotifications: [],
      colorBadgeShowAll: 'primary',
      colorBadgeShowPending: ''
    };
  },
  watch:{
    'notificaciones': async function (newVal){
      this.listNotificaciones = newVal;
      this.RefreshNotificationsTime();
    },
  },
  mounted() {
    this.listNotificaciones = this.notificaciones;
    this.timer = setInterval(() => {
      this.RefreshNotificationsTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods:{
    RefreshNotificationsTime(){
      this.processedNotifications = [];
      this.processedNotifications = this.listNotificaciones;
      console.log("Refrescado");
    },
    TiempoTranscurrido(fechaCreacion){
      var parsedFechaCreacion = Date.parse(fechaCreacion)
      var hoy = new Date()

      var tiempoPasado= hoy - parsedFechaCreacion
      var segs = 1000;
      var mins = segs * 60;
      var hours = mins * 60;
      var days = hours * 24;
      var months = days * 30.416666666666668;
      var years = months * 12;

      //calculo 
      var anos = Math.floor(tiempoPasado / years);

      tiempoPasado = tiempoPasado - (anos * years);
      var meses = Math.floor(tiempoPasado / months)

      tiempoPasado = tiempoPasado - (meses * months);
      var dias = Math.floor(tiempoPasado / days)

      tiempoPasado = tiempoPasado - (dias * days);
      var horas = Math.floor(tiempoPasado / hours)

      tiempoPasado = tiempoPasado - (horas * hours);
      var minutos = Math.floor(tiempoPasado / mins)

      tiempoPasado = tiempoPasado - (minutos * mins);
      var segundos = Math.floor(tiempoPasado / segs)

      let msg = "";
      if(anos == 0){
        if(meses == 0){
          if(dias == 0){
            if(horas == 0){
              if(minutos == 0){
                if(segundos < 30){
                  return "Hace un instante";
                }
                return `Hace ${segundos} ${(segundos == 1) ? "segundo" : "segundos"}.`
              }
              return `Hace ${minutos} ${(minutos == 1) ? "minuto" : "minutos"}.`
            }
            return `Hace ${horas} ${(horas == 1) ? "hora" : "horas"}.`
          }
          return `Hace ${dias} ${(dias == 1) ? "día" : "días"}.`
        }
        return `Hace ${meses} ${(meses == 1) ? "mes" : "meses"}.`
      }
      return `Hace ${anos} ${(anos == 1) ? "año" : "años"}.`
    },
    ShowListNotifications(showAll){
      if(showAll){
        this.listNotificaciones = this.notificaciones;
        this.colorBadgeShowPending = "";
        this.colorBadgeShowAll = "primary";
      }else{
        const notificaciones =  this.notificaciones;
        this.listNotificaciones = notificaciones.filter(notificacion => notificacion.estado.codigo == "sin_leer");
        this.colorBadgeShowPending = "primary";
        this.colorBadgeShowAll = "";
      }
      this.RefreshNotificationsTime();
    },
    async GoToUrl(url, setNotificationReaded){
      //this.$router.push({ path: `/GestionarContratos` }) 
      if(setNotificationReaded){

      }
      this.$router.push({ path: url }) 
    },
    async ChangeStateNotification(id){
       await axios
        .get(`/Notificaciones/ChangeStateNotification?id=${id}`)
        .then((res) => {
          const notificacionChanged = res.data;
          this.processedNotifications.map(notificacion => {
            if(notificacion.id == notificacionChanged.id){
              notificacion.estado = notificacionChanged.estado;
            }
          });
        })
        .catch((err) => {
          this.axiosLoad = false;
          this.mensaje(
            "error",
            "¡Ups! Ocurrió un error",
            "No se pudo registrar el contrato. Intente nuevamente.",
            ""
          );
          console.error(err);
        });
    }
  }
};
</script>
