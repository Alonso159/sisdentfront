<template>
  <v-dialog v-model="mostrarDialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Modificar Materiales</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div v-for="(material, index) in materiales" :key="index">
            <v-text-field v-model="material.id_inventario" label="ID de Inventario" required></v-text-field>
            <v-text-field v-model="material.cantidad" label="Cantidad" type="number" required></v-text-field>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" text @click="cancelarModificacion">Cancelar</v-btn>
        <v-btn color="green" text @click="guardarModificacion" :disabled="!valid">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    materiales: {
      type: Array,
      required: true,
    },
    mostrarDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
    };
  },
  methods: {
    cancelarModificacion() {
      this.$emit('close-dialog');
    },
    guardarModificacion() {
      if (this.valid) {
        axios
          .post('/Tratamiento/ModificarMateriales', this.materiales)
          .then(response => {
            this.$emit('materiales-modificados', this.materiales);
            this.$emit('close-dialog');
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
  },
};
</script>
