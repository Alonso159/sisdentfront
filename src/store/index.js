import Vue from 'vue'
import Vuex from 'vuex'
import themeConfig from './modules/themeConfig'
import Clientes from './modules/Clientes'
import Global from './modules/Global'
import Authentication from './modules/Authentication'
import Cronograma from './modules/Cronograma'
import Tratamientos from './modules/Tratamientos'
import Citas from './modules/Citas'
import Medico from './modules/Medico'
import Inventario from './modules/Inventario'

Vue.use(Vuex)

export default new Vuex.Store({ 
  modules: {
    Inventario,
    Citas,
    Medico,
    Tratamientos,
    Cronograma,
    Clientes, 
    Global,
    Authentication,
    themeConfig
  }
})
