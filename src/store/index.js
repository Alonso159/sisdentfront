import Vue from 'vue'
import Vuex from 'vuex'
import themeConfig from './modules/themeConfig'
import Clientes from './modules/Clientes'
import Global from './modules/Global'
import Authentication from './modules/Authentication'
import Cronograma from './modules/Cronograma'

Vue.use(Vuex)

export default new Vuex.Store({ 
  modules: {
    Cronograma,
    Clientes, 
    Global,
    Authentication,
    themeConfig
  }
})
