const state = {
    listaMedico:[],
  };
  
  const getters = {
    listaMedico: (state) => {
      return state.listaMedico;
    },
    
  };
  
  const actions = {
    setListaMedico: (context, value) => {
      context.commit('setStateMedico', value);
    },
    addMedico: (context, value) => {
      context.commit('addElemStateMedico', value);
    },
    replaceMedico: (context, value) => {
      context.commit('editElemStateMedicoById', value);
    },
    
  };
  
  const mutations = {
    setStateMedico: (state, value) => {
      state.listaMedico = value;
    },
    addElemStateMedico: (state, value) => {
      state.listaMedico.push(value);
    },
    editElemStateMedicoById: (state, value) => {
      var index = state.listaMedico.findIndex((x) => x.id == value.id);
      state.listaMedico.splice(index, 1, value);
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };
  