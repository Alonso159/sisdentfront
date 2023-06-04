<template>
  <v-dialog v-model="dialog" max-width="500px" @click:outside="cancelar">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="descripcion" label="Descripción" :rules="formRules.descripcion"></v-text-field>
          <v-text-field v-model="duracion" label="Duración" :rules="formRules.duracion"></v-text-field>
          <v-combobox v-model="complejidad" :items="complejidades" label="Complejidad"
            :rules="formRules.complejidad"></v-combobox>
          <v-divider></v-divider>
          <div class="materiales-container material-item">
            <h2>Materiales</h2>
            <v-btn class="add-material-btn" color="primary" @click="openRegistrarMaterialesForm">Agregar Material</v-btn>
          </div>
          <div v-for="(material, index) in materiales" :key="index">
            <div>Cantidad: {{ material.cantidad }}</div>
            <div>ID de Inventario: {{ material.idInventario }}</div>
            <v-btn icon small class="delete-material-btn" @click="eliminarMaterial(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
          <v-text-field v-model="costo" label="Costo" type="number" :rules="formRules.costo"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" text @click="cancelar">Cancelar</v-btn>
        <v-btn class="register-btn" :disabled="!valid || materiales.length === 0" @click="registrar"
          style="background-color: #45a049; color:#fff">Registrar</v-btn>
      </v-card-actions>
    </v-card>
    <registrar-materiales-dialog :dialog="materialesFormVisible" @close-dialog="materialesFormVisible = false"
      @material-registrado="registrarMaterial"></registrar-materiales-dialog>
  </v-dialog>
</template>

<script>
import RegistrarMaterialesDialog from './RegistrarMaterialesDialog.vue';
import axios from 'axios';

export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      formTitle: 'Registrar Tratamiento',
      valid: false,
      descripcion: '',
      duracion: '',
      complejidad: '',
      materiales: [],
      complejidades: [1, 2, 3],
      materialesFormVisible: false,
      costo: null,
    };
  },
  methods: {
    openRegistrarMaterialesForm() {
      this.materialesFormVisible = true;
    },
    cancelar() {
      this.$emit('close-dialog');
      this.resetForm();
    },
    registrar() {
      if (this.$refs.form.validate()) {
        const tratamiento = {
          descripcion: this.descripcion,
          duracion: parseFloat(this.duracion),
          materiales: this.materiales,
          costo: parseFloat(this.costo),
          complejidad: parseInt(this.complejidad),
        };

        axios
          .post('/Tratamiento/RegistrarTratamiento', tratamiento)
          .then(response => {
            console.log(response.data);
            this.$emit('tratamiento-registrado', tratamiento);
            this.resetForm();
            window.location.reload();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },

    eliminarMaterial(index) {
      this.materiales.splice(index, 1);
    },
    resetForm() {
      this.valid = false;
      this.descripcion = '';
      this.duracion = '';
      this.complejidad = '';
      this.materiales = [];
      this.costo = null;
      this.$refs.form.reset();
    },
    registrarMaterial() {
      this.tratamiento.materiales.push({
        id_inventario: '',
        cantidad: 0,
      });
    },    
  },
  components: {
    RegistrarMaterialesDialog,
  },
  computed: {
    formRules() {
      return {
        descripcion: [
          v => !!v || 'El campo Descripción es obligatorio',
        ],
        duracion: [
          v => !!v || 'El campo Duración es obligatorio',
        ],
        complejidad: [
          v => !!v || 'El campo Complejidad es obligatorio',
        ],
        costo: [
          v => !!v || 'El campo Costo es obligatorio',
        ],
      };
    },
  },
};
</script>

<style scoped>
.material-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  margin-bottom: 16px;
}

.delete-material-btn {
  color: #f44336;
}

.delete-material-btn:hover {
  color: #d32f2f;
}

.register-btn {
  transition: all 200ms;
}</style>
