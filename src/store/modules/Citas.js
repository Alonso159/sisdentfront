const state = {
    listaCitas:[],
  };
  
  const getters = {
    listaCitas: (state) => {
      return state.listaCitas;
    },
    
  };
  
  const actions = {
    setListaCitas: (context, value) => {
      context.commit('setStateCitas', value);
    },
    addCitas: (context, value) => {
      context.commit('addElemStateCitas', value);
    },
    replaceCitas: (context, value) => {
      context.commit('editElemStateCitasById', value);
    },
    
  };
  
  const mutations = {
    setStateCitas: (state, value) => {
      state.listaCitas = value;
    },
    addElemStateCitas: (state, value) => {
      state.listaCitas.push(value);
    },
    editElemStateCitasById: (state, value) => {
      var index = state.listaCitas.findIndex((x) => x.id == value.id);
      state.listaCitas.splice(index, 1, value);
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };
  
  