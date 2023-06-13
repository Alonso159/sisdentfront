<template>
  <v-dialog v-model="mostrarDialog" max-width="600px" overlay>
    <v-card class="mostrar-tratamiento__card">
      <v-card-title class="mostrar-tratamiento__title">Detalles del Tratamiento</v-card-title>
      <v-card-text>
        <v-simple-table class="mostrar-tratamiento__table">
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="mostrar-tratamiento__label">Descripción:</td>
                <td>{{ tratamiento.descripcion }}</td>
              </tr>
              <tr>
                <td class="mostrar-tratamiento__label">Duración:</td>
                <td>{{ tratamiento.duracion }}</td>
              </tr>
              <tr>
                <td class="mostrar-tratamiento__label">MATERIALES:</td>
                <td>
                  <template v-for="material in tratamiento.materiales">
                    <div class="materiales-container">
                      <div class="materiales">
                        <div class="mostrar-tratamiento__sublabel">ID de Inventario:</div>
                        <div class="mostrar-tratamiento__sublabel__datos">{{ material.id_inventario }}</div>
                        <div class="mostrar-tratamiento__sublabel">Cantidad:</div>
                        <div class="mostrar-tratamiento__sublabel__datos">{{ material.cantidad }}</div>
                      </div>
                    </div>
                  </template>
                </td>
              </tr>
              <tr>
                <td class="mostrar-tratamiento__label">Costo:</td>
                <td>{{ tratamiento.costo }}</td>
              </tr>
              <tr>
                <td class="mostrar-tratamiento__label">Complejidad:</td>
                <td>{{ tratamiento.complejidad }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mostrar-tratamiento__close-btn" color="primary" text @click="closeDialog">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    tratamientoId: {
      type: String,
      required: true,
    },
    mostrarDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tratamiento: null,
    };
  },
  mounted() {
    this.obtenerDetallesTratamiento();
  },
  methods: {
    obtenerDetallesTratamiento() {
      const url = `/Tratamiento/GetIDTratamiento?id=${this.tratamientoId}`;

      axios
        .get(url)
        .then(response => {
          this.tratamiento = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    closeDialog() {
      this.$emit('close-dialog');
    },
  },
};
</script>

<style scoped>
.mostrar-tratamiento__card {
  background-color: white;
}

.mostrar-tratamiento__title {
  font-size: 24px;
  padding: 16px;
  margin-bottom: 16px;
}

.mostrar-tratamiento__table {
  margin-bottom: 20px;
}

.mostrar-tratamiento__label {
  font-weight: bold;
  width: 150px;
  padding: 8px;
}

.mostrar-tratamiento__sublabel {
  font-weight: bold;
  width: 150px;
  padding: 8px;
}

.mostrar-tratamiento__sublabel__datos {
  margin-left: 20px;
}

.materiales-container {
  margin-left: 5px;
  margin-top: 10px;
  border-bottom: 1px solid #00000020;
}

.materiales:hover {
  background-color: #00000020;
}

.materiales {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
