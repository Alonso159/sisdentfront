import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GestionarEspecialidades from '../views/Especialidades/Tratamientos.vue';
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
    redirect: "/dashboard-management",
    component: () =>
      import ('../views/Layout/Principal.vue'),
      children: [{
        path: 'dashboard-management',
        name: "dashboard-management",
        component: () => import("@/views/Dashboard/Dashboard-management"),
      },
      {
        path: "dashboard-project",
        name: "dashboard-project",
        component: () => import("@/views/Dashboard/Dashboard-project"),
      },   
      {
        path: "gestionarCronograma",
        name: "gestionarCronograma",
        component: () => import("@/views/gestionarCronograma/gestionarCronograma"),
      },
      {
        path: '/Tratamientos',
        name: 'Tratamientos',
        component: () => import('@/views/Especialidades/Tratamientos.vue')
    
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
