import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    redirect: "/login",
    component: () =>
      import ('../views/Layout/Principal.vue'),
      children: [{
        path: 'dashboard-management',
        name: "dashboard-management",
        component: () => import("@/views/Dashboard/Dashboard-management"),
      },
     
      {
        path: "gestionarCitaMedico",
        name: "gestionarCitaMedico",
        component: () => import("@/views/gestionarCitas/gestionarCitaMedico"),
      },
      {
        path: "gestionarTratamientos",
        name: "gestionarTratamientos",
        // component: () => import("@/components/GestionarEspecialidad/RegistrarEspecialidad"),
        component: () => import("@/views/gestionarTratamientos/gestionarTratamientos"),
      },
      {
        path: "gestionarCitaRecepcionista",
        name: "gestionarCitaRecepcionista",
        component: () => import("@/views/gestionarCitas/gestionarCitaRecepcionista"),
      },
      {
        path: "gestionarCitaPaciente",
        name: "gestionarCitaPaciente",
        component: () => import("@/components/GestionarCitas"),
      },
      {
        path: '/Tratamientos',
        name: 'Tratamientos',
        component: () => import('@/views/Especialidades/Tratamientos.vue')
    
    },
    {
      path: '/Pagar',
      name: 'PagarCita',
      component: () => import('@/views/Pagar.vue')
  
  },
      
      
    ]
  },
  {
    path: '/login',
    name: "Login Usuario",
    component: () => import('@/views/Login/LoginSistema.vue')
  },
  
 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
