const items = [
  {
    divider: "Principal",
    title: "Inicio",
    icon: "mdi-view-dashboard",
    to: "dashboard-management",
  },
  {
    divider: "Principal",
    title: "Inicio",
    name: "Inicio",
    href: "/dashboard-management",
  },
  {
    title: "Mis Proyectos",
    icon: "mdi-view-dashboard",
    to: "mis-proyectos",
  },
  {
    divider: null,
    title: "Gestionar Especialidades",

    name: "GestionarEspecialidades",
    href: "/gestionarEspecialidad",
  },
  {
    title: "Contacto",
    icon: "mdi-view-dashboard",
    to: "mensajes-rep-ac",
  },
  {
    title: "Gestionar Cliente",
    icon: "mdi-view-dashboard",
    to: "gestionarcliente",
  },
  {
    title: "Gestionar Pagos",
    icon: "mdi-view-dashboard",
    to: "gestionarCronogramaPagos",
  },
  {
    title: "Evaluar Pagos",
    icon: "mdi-view-dashboard",
    to: "evaluarpago",
  },
  {
    title: "Gestionar Contratos",
    icon: "mdi-view-dashboard",
    to: "GestionarContratos",
  },
  {
    title: "Evaluar Contratos",
    icon: "mdi-view-dashboard",
    to: "evaluarContratos",
  },
  {
    title: "Gestionar Solicitudes",
    icon: "mdi-view-dashboard",
    to: "gestionarsolicitudes",
  },
  {
    title: "Tareas",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Listado de Tareas",
        to: "gestiontareas",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    title: "Cronograma",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Progreso de Cronograma",
        to: "gestionarCronograma",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    title: "Reuniones",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Gestion de Reuniones",
        to: "gestionreunion",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    title: "EvaluarCronograma",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Evaluar Cronograma",
        to: "evaluarCronograma",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    title: "Evaluar Cotizaciones",
    icon: "mdi-view-dashboard",
    to: "evaluarcotizacion",
  },
  
  {
    hide: true,
    identifier: "cronograma-item",
    title: "Cronograma",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Gestión de Cronograma",
        to: "gestionarCronograma",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    hide: true,
    identifier: "cotizacion-item",
    title: "Cotización",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Gestionar Cotizacion",
        to: "gestioncotizacion",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    divider: "Sistema",
    title: "Usuarios",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Gestión de Usuarios",
        to: "gestionusuarios",
        icon: "mdi-circle-medium",
      },
      {
        title:"Modificar Perfil",
        to: "ModificarPerfil",
        icon: "mdi-circle-medium",
      },
    ],
  }
  
];

const itemsCliente = [
  {
    divider: "Principal",
    title: "Inicio",
    icon: "mdi-view-dashboard",
    to: "dashboard-cliente",
  },
  {
    title: "Mis Proyectos",
    to: "dashboard-cliente",
    icon: "mdi-circle-medium",
  },
  {
    title: "Mis Cronogramas",
    to: "evaluarCronograma",
    icon: "mdi-circle-medium",
  },
  {
    title: "Mis Solicitudes",
    to: "mis-solicitudes",
    icon: "mdi-circle-medium",
  },
  {
    title: "Mis Contratos",
    to: "mis-contratos",
    icon: "mdi-circle-medium",
  },
  {
    title: "Mis Pagos",
    to: "realizarPago",
    icon: "mdi-circle-medium",
  },
  {
    title: "Mis Cronogramas",
    to: "evaluarCronograma",
    icon: "mdi-circle-medium",
  },
  {
    title: "Reuniones",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Gestion de Reuniones",
        to: "reuniones-client",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    title: "Evaluar Cotizaciones",
    icon: "mdi-view-dashboard",
    to: "evaluarcotizacion",
  },
 
  {
    hide: true,
    identifier: "cronograma-item",
    title: "Cronograma",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Gestión de Cronogramas",
        to: "historial-cronogramas-client",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    hide: true,
    identifier: "cotizacion-item",
    title: "Cotización",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Gestión de Cotizaciones",
        to: "historial-cotizaciones-client",
        icon: "mdi-circle-medium",
      },
    ],
  },
  {
    divider: "Sistema",
    title: "Usuarios",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Gestión de Usuarios",
        to: "usuarios-client",
        icon: "mdi-circle-medium",
      },
    ],
  }
];

export {
  items,
  itemsCliente
}