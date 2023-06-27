const state = {
  listaClientes:[],
};

const getters = {
  ListCliente: (state) => {
    return state.listaClientes;
  },
  
};

const actions = {
  setListaClientes: (context, value) => {
    context.commit('setStateClientes', value);
  },
  addClientes: (context, value) => {
    context.commit('addElemStateClientes', value);
  },
  replaceClientes: (context, value) => {
    context.commit('editElemStateClientesById', value);
  },
  
};

const mutations = {
  setStateClientes: (state, value) => {
    state.listaClientes = value;
  },
  addElemStateClientes: (state, value) => {
    state.listaClientes.push(value);
  },
  editElemStateClientesById: (state, value) => {
    var index = state.listaClientes.findIndex((x) => x.id == value.id);
    state.listaClientes.splice(index, 1, value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

