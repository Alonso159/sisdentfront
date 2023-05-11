const state = {
    listaInventario:[],
  };
  
  const getters = {
    ListInventario: (state) => {
      return state.listaInventario;
    },
    
  };
  
  const actions = {
    setListaInventario: (context, value) => {
      context.commit('setStateInventario', value);
    },
    addInventario: (context, value) => {
      context.commit('addElemStateInventario', value);
    },
    replaceInventario: (context, value) => {
      context.commit('editElemStateInventario', value);
    },
    
  };
  
  const mutations = {
    setStateInventario: (state, value) => {
      state.listaInventario = value;
    },
    addElemStateInventario: (state, value) => {
      state.listaInventario.push(value);
    },
    editElemStateInventario: (state, value) => {
      var index = state.listaInventario.findIndex((x) => x.id == value.id);
      state.listaInventario.splice(index, 1, value);
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };
  
  