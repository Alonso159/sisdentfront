<template>
  <v-card>
    <v-card-title class="justify-center">Registro dexx</v-card-title>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Step 1 </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2"> Step 2 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-card-text>

            
             </v-card-text>

               <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
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
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="container-user">
            
            <v-card-text>

            
             </v-card-text>
         
              <v-divider class="divider-custom"></v-divider>
              <v-row>
                <v-col>
                  <v-btn block @click="step = 1" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Registrar Reunion</span>
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
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>

export default {
  name: "ViewDetailProyect",

   components: {
    
  },
data() {
    return {
      step: 1,
     
    };
  },
   methods: {
     
    
   cerrarDialogo() {
      this.step = 1;
    
      this.$emit("close-dialog-detail");
    },


   },
   computed: {
  


  },
}
</script>

<style>

</style>