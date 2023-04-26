//Para el uso del axios en las acciones
import axios from 'axios';

//Para el uso de rutas en las acciones
import router from '../../router/index.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const KEY_LS_ID_PROY = "glob_id_project"

const state = {
  globIdProject: ''
};

const getters = {
  GlobIdProject: (state) => {
    return state.globIdProject;
  }
};

const actions = {
  setGlobIdProject: async (context, value) => {
    const idproyecto = localStorage.getItem(KEY_LS_ID_PROY);
    if (idproyecto) {
      localStorage.removeItem(KEY_LS_ID_PROY);
    }
    Swal.showLoading() 
    await axios.get('/Proyecto/BusquedaPorId?id_proyecto='+ value)
    .then((res) => {
      context.commit('setStateGlobIdProject', value);
      console.log(res.data);
      localStorage.setItem(KEY_LS_ID_PROY, value);
      localStorage.setItem("GlobProyecto", JSON.stringify(res.data));
      //router.push({ name: 'dashboard' })
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'No se pudo abrir el proyecto',
            text: 'Inténtelo nuevamente'
        })
        
    }).finally(()=>{
      Swal.close()
    });
    
  },
  setGlobIdProjectWhenStart: async (context) => {
    const idproyecto = localStorage.getItem(KEY_LS_ID_PROY);
    if (!idproyecto) {
      return;
    }

    const existProject = async (idproyecto) =>{
      let exist = true;
      const url = `/Proyecto/BusquedaPorId?id_proyecto=${idproyecto}`
      await axios.get(url)
        .then((res) => {
          if(res.status === 204){
            console.warn(res);
            exist = false; //204: No Content
          }
        })
        .catch((error) => {
          console.error(error);
        });
      return exist;
    };

    if(await existProject(idproyecto)){
      context.commit('setStateGlobIdProject', idproyecto);
    }else{
      localStorage.removeItem(KEY_LS_ID_PROY);
    }
    
  }
};

const mutations = {
  setStateGlobIdProject: (state, value) => {
    state.globIdProject = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

