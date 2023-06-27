<template>
    <v-data-table style="margin-top:10px;width: 100%;"
        :headers="headers"
        :items="actividades"
        class="elevation-0 class-on-data-table table"
    >
        <template v-slot:top>
        <v-toolbar
            flat
        >
            <v-spacer></v-spacer>
           
            <v-dialog
            v-model="dialog"
            max-width="30%"
            persistent
            >
                <v-card>
                    <v-card-title>
                    <span class="justify-center headline">{{ formTitle }}</span>
                    </v-card-title>    
                    <v-card-text>
                        <v-container>
                            <v-text-field 
                                v-model="editedItem.caracteristica"
                                color="success"
                                label="Ingrese la caracteristica"    
                            ></v-text-field>
                            <v-textarea
                                v-model="editedItem.descripcion"
                                color="success"
                                label="Escriba el detalle"
                            ></v-textarea>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                   
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save()"
                    >
                        <v-icon dark>
                        mdi-checkbox-marked-circle
                        </v-icon>
                        <span style="margin-left:2%">Guardar</span>
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="30%">
                <v-card>
                    <v-card-title class="justify-center headline">¿Seguro que quiere eliminar esta característica?</v-card-title>
                    <v-card-actions style="margin-top:3%">
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            disabled
        >
            mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
             disabled
        >
            mdi-delete
        </v-icon>
        </template>
        <template v-slot:no-data>
        <span>Agregue una observación</span>
        </template>
    </v-data-table>
</template>
<script>
import Vuelidate from "vuelidate";
import { required } from "vuelidate/lib/validators";
//Para una sola palabra o frase
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
export default { 
  name:'TablaCaracteristicas',
  props:["actividades"],
  data(){
    return{
      editedItem: {
        caracteristica:"",
        descripcion:""
      },
      defaultItem: {
        caracteristica:"",
        descripcion:""
      },
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Prioridad',
          align: 'start',
          sortable: false,
          value: 'actividades.prioridad',
          width: 50
        },
        {
          text: 'Nombre   ',
          align: 'start',
          sortable: false,
          value: 'actividades.nombre',
          width: 50
        }, {
          text: 'Costo',
          align: 'start',
          sortable: false,
          value: 'actividades.costo',
          width: 50
        }, {
          text: 'Horas estimadas',
          align: 'start',
          sortable: false,
          value: 'actividades.horas_estimadas',
          width: 50
        },
      ],
      editedIndex: -1,
    }
  },
  
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  computed:{
    formTitle () {
      return this.editedIndex === -1 ? 'Registrar una caracteristica' : 'Editar una caracteristica'
    },
  },
   async created(){

  },
  methods:{
    AbrirModalCaracteristicas(){
      this.dialog=true;
    },

    deleteItem (item) {
      this.editedIndex = this.lista_caracteristicas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    editItem (item) {
      this.editedIndex = this.lista_caracteristicas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItemConfirm () {
      this.lista_caracteristicas.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close(){
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)   
      this.editedIndex = -1
    },
    closeDelete (){
      this.dialogDelete = false
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem) 
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.lista_caracteristicas[this.editedIndex], this.editedItem)       
      } else {
        this.lista_caracteristicas.push(this.editedItem)
      }
      this.close();
    },
  }
}
</script>

<style>
.class-on-data-table table {
    table-layout: fixed;
}
.headline{
    color: rgba(2, 62, 138, 1) !important;
}
</style>