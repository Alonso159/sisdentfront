const state = {
  listaCronograma: [],
};

const getters = {
  ListCrono: (state) => {
    return state.listaCronograma;
  },
};

const actions = {
  //Cronograma
  setListaCronograma: (context, value) => {
    context.commit('setStateCronograma', value);
  },
  addCronograma: (context, value) => {
    context.commit('addElemStateCronograma', value);
  },
  replaceCronograma: (context, value) => {
    context.commit('editElemStateCronogramaById', value);
  },
};

const mutations = {
  //Cronograma
  setStateCronograma: (state, value) => {
    state.listaCronograma = value;
  },
  addElemStateCronograma: (state, value) => {
    state.listaCronograma.push(value);
  },
  editElemStateCronogramaById: (state, value) => {
    var index = state.listaCronograma.findIndex((x) => x.id == value.id);
    state.listaCronograma.splice(index, 1, value);
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

