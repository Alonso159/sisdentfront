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
        path: "visualizarCitas",
        name: "visualizarCitas",
        component: () => import("@/views/gestionarCitas/gestionarCitaMedico"),
      },
      {
        path: "gestionarTratamientos",
        name: "gestionarTratamientos",
        // component: () => import("@/components/ComponenteGestionarCronograma/RegistrarCronograma.vue"),
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
        path: "/components/HistoriaClinica/odontograma.js",
        name: "/components/HistoriaClinica/odontograma.js",
        component: () => import("@/components/HistoriaClinica/odontograma.js"),
      },
      {
        path: "historiaClinica",
        name: "historiaClinica",
        component: () => import("@/views/HistoriaClinica.vue"),
      },
      {
        path: "ModificarPerfil",
        name: "ModificarPerfil",
        component: () => import("@/views/ModificarPerfil/ModificarPerfil"),
      },
      {
        path: '/Tratamientos',
        name: 'Tratamientos',
        component: () => import('@/views/Especialidades/Tratamientos.vue')
    
    },
    {
      path: '/gestionarInventario',
      name: 'gestionarInventario',
      component: () => import('@/views/GestionarInventario/gestionarInventario.vue')
  
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
  {
    path: "/UsuarioInvitado",
    name: "UsuarioInvitado",
    component: () => import("@/views/UsuarioInvitado/UsuarioInvitado"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
