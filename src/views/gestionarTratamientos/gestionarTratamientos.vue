<template>
  <div class="container">
    <div class="data-container">
      <h1>Gestionar Tratamientos</h1>

      <!-- Botón Registrar Tratamiento -->
      <v-btn class="register-btn" color="primary" @click="openDialog">Registrar Tratamiento</v-btn>

      <!-- Componente de diálogo de registro de tratamiento -->
      <RegistroTratamientoDialog :dialog="dialog" @tratamiento-registrado="registrarTratamiento"
        @close-dialog="closeDialog" @open-registrar-materiales-form="openRegistrarMaterialesForm">
      </RegistroTratamientoDialog>

      <!-- Componente de diálogo de registro de materiales -->
      <RegistrarMaterialesDialog :dialog="dialogMateriales" @materiales-registrados="registrarMateriales"
        @close-dialog="closeRegistrarMaterialesDialog">
      </RegistrarMaterialesDialog>

    </div>

    <v-data-table :headers="headers" :items="tratamientos" :search="search" item-key="id">
      <template v-slot:item.actions="{ item }">
        <v-btn icon small color="red" @click="eliminarTratamiento(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon small color="blue" @click="modificarTratamiento(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small color="green" @click="mostrarTratamiento(item.id)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.materiales="{ item }">
        <div>
          <div v-for="material in item.materiales" :key="material.id_inventario">
            <div>ID de Inventario: {{ material.id_inventario }}</div>
            <div>Cantidad: {{ material.cantidad }}</div>
          </div>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="mostrarDialog" max-width="600px">
      <MostrarTratamiento :tratamiento-id="selectedTratamientoId" :mostrar-dialog="mostrarDialog"
        @close-dialog="closeMostrarTratamientoDialog">
      </MostrarTratamiento>
    </v-dialog>

    <!-- Diálogo para modificar tratamiento -->
    <ModificarTratamientoDialog :dialog="dialogModificar" :tratamiento="tratamientoSeleccionado"
      @close-dialog="closeModificarTratamientoDialog" @tratamiento-modificado="fetchTratamientos">
    </ModificarTratamientoDialog>
  </div>
</template>

<script>
import RegistroTratamientoDialog from '../../components/GestionarTratamiento/RegistroTratamientoDialog.vue';
import RegistrarMaterialesDialog from '../../components/GestionarTratamiento/RegistrarMaterialesDialog.vue';
import MostrarTratamiento from '../../components/GestionarTratamiento/mostrarTratamiento.vue';
import ModificarTratamientoDialog from '../../components/GestionarTratamiento/ModificarTratamientoDialog.vue';
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      dialogMateriales: false,
      dialogModificar: false,
      headers: [
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Duración', value: 'duracion' },
        { text: 'Materiales', value: 'materiales', sortable: false },
        { text: 'Costo', value: 'costo' },
        { text: 'Complejidad', value: 'complejidad' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      tratamientos: [],
      search: '',
      selectedTratamientoId: null,
      mostrarDialog: false,
      tratamientoSeleccionado: null,
      dialog: false,
      tratamiento: null,
    };
  },
  mounted() {
    this.fetchTratamientos();
  },
  methods: {
    openDialog() {
      this.tratamiento = {
        descripcion: '',
        duracion: '',
        costo: '',
        complejidad: '',
        materiales: [],
      };

      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.tratamiento = null;
    },
    openRegistrarMaterialesForm() {
      this.dialogMateriales = true;
    },
    closeRegistrarMaterialesDialog() {
      this.dialogMateriales = false;
    },
    registrarTratamiento(tratamiento) {
      this.tratamientos.push(tratamiento);
      this.closeDialog();
    },
    registrarMateriales(material) {
      this.closeRegistrarMaterialesDialog();
    },
    eliminarTratamiento(tratamiento) {
      if (!tratamiento || !tratamiento.id) {
        console.error('ID de tratamiento no válido');
        return;
      }

      // Mostrar confirmación antes de eliminar el tratamiento
      const confirmarEliminacion = confirm(`¿Estás seguro que deseas eliminar el tratamiento: ${tratamiento.descripcion}?`);
      if (!confirmarEliminacion) {
        return;
      }

      const tratamientoId = tratamiento.id;
      axios
        .delete('/Tratamiento/DeleteTratamiento', { params: { id: tratamientoId } })
        .then(response => {
          const index = this.tratamientos.findIndex(t => t.id === tratamientoId);
          if (index !== -1) {
            this.tratamientos.splice(index, 1);
          }
          console.log("Se ha eliminado correctamente");
        })
        .catch(error => {
          console.error(error);
        });
    },
    mostrarTratamiento(tratamientoId) {
      this.selectedTratamientoId = tratamientoId;
      this.mostrarDialog = true;
    },
    closeMostrarTratamientoDialog() {
      this.selectedTratamientoId = null;
      this.mostrarDialog = false;
    },
    modificarTratamiento(tratamiento) {
      this.tratamientoSeleccionado = tratamiento;
      this.dialogModificar = true;
    },
    closeModificarTratamientoDialog() {
      this.dialogModificar = false;
      this.tratamientoSeleccionado = null;
    },
    fetchTratamientos() {
      axios
        .get('/Tratamiento/getAlltratamiento')
        .then(response => {
          this.tratamientos = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  components: {
    RegistroTratamientoDialog,
    RegistrarMaterialesDialog,
    MostrarTratamiento,
    ModificarTratamientoDialog,
  },
};
</script>

<style>
.container {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.register-btn {
  background-color: #f44336;
  color: #ffffff;
}

.register-btn:hover {
  background-color: #d32f2f;
}
.data-container{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.data-container h1{
  color: green;
  text-shadow: 2px 2px 1px  #fff;
}
</style>
