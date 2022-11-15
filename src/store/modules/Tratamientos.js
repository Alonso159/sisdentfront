const state = {
    listaTratamientos: [],
  };
  
  const getters = {
    listaTratamientos: (state) => {
      return state.listaTratamientos;
    },
  };
  
  const actions = {
    //Cronograma
    setListaTratamientos: (context, value) => {
      context.commit('setStateTratamiento', value);
    },
    addTratamiento: (context, value) => {
      context.commit('addElemStateTratamiento', value);
    },
    replaceTratamiento: (context, value) => {
      context.commit('editElemStateTratamientoById', value);
    },
  };
  
  const mutations = {
    //Cronograma
    setStateTratamiento: (state, value) => {
      state.listaTratamientos = value;
    },
    addElemStateTratamiento: (state, value) => {
      state.listaTratamientos.push(value);
    },
    editElemStateTratamientoById: (state, value) => {
      var index = state.listaTratamientos.findIndex((x) => x.id == value.id);
      state.listaTratamientos.splice(index, 1, value);
    },
  };
  
  export default {
    //Agregar namespaced (ejemplo en Cronograma.js)
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };
  
  