<template>
  <v-card>
    <v-card-title class="justify-center">Visualizar Cronograma</v-card-title>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Datos de los modulos
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">
          Datos de los SubModulos
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="4">
          Datos de las actividades
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <DiagramaGrant :Cronograma="Cronograma"> </DiagramaGrant>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="container-user">
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="borde-fino-expansion-panel margen-por-panel"
                  >Visualizar Modulos del Cronograma
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <TablaModulos :modulo="Cronograma.modulo"> </TablaModulos>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-divider class="divider-custom"></v-divider>
            <v-row>
              <v-col>
                  <v-btn block @click="step = 3" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="error">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
            </v-row>
          </div>
        </v-stepper-content>
        <v-stepper-content step="4">
          <div class="container-user">
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="borde-fino-expansion-panel margen-por-panel"
                  >Visualizar Actividades del
                  Cronograma</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <TablaActividades
                    :actividades="Actividad"
                  >
                  </TablaActividades>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-divider class="divider-custom"></v-divider>
            <v-row>
              <v-col>
                <v-btn block @click="cerrarDialogo()" color="primary">
                  <v-icon left>mdi-close-outline</v-icon>
                  <span>Cerrar</span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div class="container-user">
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="borde-fino-expansion-panel margen-por-panel"
                  >Visualizar Submodulos del
                  Cronograma</v-expansion-panel-header
                >
                 <v-expansion-panel-content>
                  <TablaSubModulos
                    :submodulo="SubModulo"
                  >
                  </TablaSubModulos>
                </v-expansion-panel-content>
               
               
              </v-expansion-panel>
            </v-expansion-panels>
            <v-divider class="divider-custom"></v-divider>
            <v-row>
              <v-col>
                  <v-btn block @click="step = 4" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              <v-col>
                <v-btn block @click="cerrarDialogo()" color="primary">
                  <v-icon left>mdi-close-outline</v-icon>
                  <span>Cerrar</span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-dialog persistent v-model="dialogoRegistrar" max-width="880px">
            <AgregarOpiniones
              v-if="dialogoRegistrar"
              :Opinion="Opinion"
              @close-dialog-detalle="closeDialogRegistrar()"
            >
            </AgregarOpiniones>
          </v-dialog>
          
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import axios from "axios";
import TablaModulos from "@/components/EvaluarCronograma/Tablas/TablaModulos.vue";
import TablaActividades from "@/components/EvaluarCronograma/Tablas/TablaActividades.vue";
import TablaSubModulos from "@/components/EvaluarCronograma/Tablas/TablaSubModulos.vue";
import DiagramaGrant from "@/views/gestionarCronograma/FormularioNuevoCronograma.vue";


export default {
  name: "VisualizarCronograma",
  props: ["Cronograma","Actividad","SubModulo"],
  components: {
    DiagramaGrant,
    TablaModulos,
    TablaActividades,
    TablaSubModulos,
  },
  data() {
    return {
      Opinion: {},
      dialogVistaPreviaDocumento: false,
      step: 1,
      cargaRegistro: false,
      dialogoRegistrar: false,
    };
  },
   async created() {
this.aaa();
  },
  methods: {   
      async aaa(){
      },
    closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    cerrarDialogo() {
      this.$emit("emit-obtener-Cronograma");
      this.step = 1;
      this.$emit("close-dialog-detalle");
    },

  },
};
</script>

<style>
.borde-fino-expansion-panel {
  border-color: rgba(2, 62, 138, 1) !important;
  background-color: rgba(202, 240, 248, 1) !important;
  color: rgba(2, 62, 138, 1) !important;
  border-style: solid !important;
  border-width: thin thin !important;
}
.title {
  color: rgba(2, 62, 138, 1) !important;
}
</style>
