import Vue from 'vue'
import Vuex from 'vuex'
import themeConfig from './modules/themeConfig'
import Clientes from './modules/Clientes'
import Global from './modules/Global'
import Authentication from './modules/Authentication'

Vue.use(Vuex)

export default new Vuex.Store({ 
  modules: {
   
    Clientes, 
    Global,
    Authentication,
    themeConfig
  }
})
