<template>
    <v-dialog v-model="dialog" max-width="600px" @click:outside="cancelar">
      <v-card>
        <v-card-title>Modificar Tratamiento</v-card-title>
        <v-card-text>
          <!-- Formulario para modificar el tratamiento -->
          <v-form ref="form" @submit.prevent="modificarTratamiento">
            <v-text-field v-model="tratamiento.descripcion" label="Descripción"></v-text-field>
            <v-text-field v-model="tratamiento.duracion" label="Duración"></v-text-field>
            <v-text-field v-model="tratamiento.costo" label="Costo"></v-text-field>
            <v-text-field v-model="tratamiento.complejidad" label="Complejidad"></v-text-field>
  
            <v-card>
              <v-card-title>Materiales</v-card-title>
              <v-card-text>
                <!-- Lista de materiales -->
                <v-list>
                  <v-list-item v-for="(material, index) in tratamiento.materiales" :key="index">
                    <v-text-field v-model="material.id_inventario" label="ID de Inventario"></v-text-field>
                    <v-text-field v-model="material.cantidad" label="Cantidad"></v-text-field>
                    <v-btn icon @click="eliminarMaterial(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list>
  
                <!-- Botón para agregar un nuevo material -->
                <v-btn @click="agregarMaterial">Agregar Material</v-btn>
              </v-card-text>
            </v-card>
  
            <v-card-actions>
              <v-btn color="primary" type="submit">Guardar</v-btn>
              <v-btn color="red" @click="cancelar">Cancelar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      dialog: {
        type: Boolean,
        required: true,
      },
      tratamiento: {
        type: Object,
        required: true,
      },
    },
    methods: {
      modificarTratamiento() {
        // Realizar la llamada a la API para modificar el tratamiento
        axios
          .put('/Tratamiento/ModificarTratamiento', this.tratamiento)
          .then(response => {
            console.log('Tratamiento modificado correctamente');
            this.$emit('tratamiento-modificado');
            window.location.reload();
          })
          .catch(error => {
            console.error(error);
          });
      },
      cancelar() {
        this.$emit('close-dialog');
      },
      agregarMaterial() {
        this.tratamiento.materiales.push({
          id_inventario: '',
          cantidad: 0,
        });
      },
      eliminarMaterial(index) {
        this.tratamiento.materiales.splice(index, 1);
      },
    },
  };
  </script>
  