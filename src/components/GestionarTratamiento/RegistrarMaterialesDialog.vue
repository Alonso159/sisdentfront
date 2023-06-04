<template>
  <v-dialog v-model="dialog" max-width="500px" @click:outside="cancelar">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">          
          <v-text-field v-model="cantidad" label="Cantidad" type="number" required></v-text-field>
          <v-text-field v-model="idInventario" label="ID de Inventario" required :value="defaultIdInventario"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" text @click="cancelar">Cancelar</v-btn>
        <v-btn color="primary" :disabled="!valid" @click="registrar">Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      formTitle: 'Registrar Material',
      valid: false,
      materialSeleccionado: null,
      cantidad: null,
      idInventario: '',
      materialesDisponibles: [], // Almacena los materiales disponibles del inventario
      defaultIdInventario: '643f35adfe1246b78a8c8dcf', // Valor por defecto del campo "ID de Inventario"
    };
  },
  methods: {
    cancelar() {
      this.$emit('close-dialog');
      this.resetForm();
    },
    registrar() {
      if (this.$refs.form.validate()) {
        const material = {
          cantidad: parseInt(this.cantidad),
          idInventario: this.idInventario,
          materialSeleccionado: this.materialSeleccionado,
        };
        this.$emit('material-registrado', material);
        this.resetForm();
      }
    },
    resetForm() {
      this.valid = false;
      this.materialSeleccionado = null;
      this.cantidad = null;
      this.idInventario = '';
      this.$refs.form.reset();
    },
    fetchMaterialesInventario() {
      axios.get('/Inventario/GetAllInventario')
        .then(response => {
          const materialesInventario = response.data;
          this.materialesDisponibles = materialesInventario;
        })
        .catch(error => {
          console.error(error);
        });
    },
    openRegistrarMaterialesForm() {
      this.materialesFormVisible = true;
      this.fetchMaterialesInventario();
    },
  },
};
</script>

<style scoped></style>
