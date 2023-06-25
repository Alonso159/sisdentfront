const itemsAdministrador = [
  {
    divider: "Principal",
    title: "Inicio",
    icon: "mdi-tooth",
    href: "/dashboard-management",
  },
  {
    divider: "Principal",
    title: "Gestionar Inventario",
    icon: "mdi-tooth",
    href: "/gestionarInventario",
  },
  {
    title: "Gestionar Orden de compra",
    icon: "mdi-view-dashboard",
    href: "/gestionarOrden",
  },
  {
    title: "Gestionar Usuarios",
    icon: "mdi-view-dashboard",
    href: "/gestionarUsuario",
  },
  {
    title: "Gestionar tratamientos",
    icon: "mdi-view-dashboard",
    href: "/gestionarTratamientos",
  },
  {
    title: "Modificar Perfil",
    icon: "mdi-view-dashboard",
    href: "/ModificarPerfil",
  },
  
  {
    title: "Tareas",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "Listado de Tareas",
        href: "/gestionarCitaPaciente",
        icon: "mdi-circle-medium",
      },
    ],
  },
 
  
  
  
  
];
const itemsMedico = [
  {
    divider: "Principal",
    title: "Inicio",
    icon: "mdi-tooth",
    href: "/dashboard-management",
  },
  {
    divider: "Principal",
    title: "Modificiar Mi Perfil",
    icon: "mdi-tooth",
    href: "/ModificarPerfil",
  },
  {
    title: "Gestionar Prescripción",
    icon: "mdi-tooth",
    href: "/gestionarPrescripción",
  },
  {
    title: "Gestionar Turnos",
    icon: "mdi-tooth",
    href: "/gestionarCitaMedico",
  },
  {
    title: "Consultar Pacientes",
    icon: "mdi-tooth",
    href: "/consultarPacientes",
  },
  {
    title: "Consultar Citas",
    icon: "mdi-tooth",
    href: "/gestionarPrescripción",
  },
  {
    title: "Modificar Perfil",
    icon: "mdi-view-dashboard",
    href: "/ModificarPerfil",
  },
  
];
const itemsRecepcionista = [
  {
    divider: "Principal",
    title: "Inicio",
    icon: "mdi-tooth",
    href: "/dashboard-management",
  },
  {
    divider: "Principal",
    title: "Modificiar Mi Perfil",
    icon: "mdi-tooth",
    href: "/ModificarPerfil",
  },
  {
    title: "Consultar Citas",
    icon: "mdi-tooth",
    href: "/gestionarPrescripción",
  },
  {
    title: "Visualizar Turnos",
    icon: "mdi-tooth",
    href: "/gestionarCitaRecepcionista",
  },  
  {
    title: "Modificar Perfil",
    icon: "mdi-view-dashboard",
    href: "/ModificarPerfil",
  },
];
const itemsAsistente = [
  {
    divider: "Principal",
    title: "Inicio",
    icon: "mdi-tooth",
    href: "/dashboard-management",
  },
  {
    divider: "Principal",
    title: "Modificiar Mi Perfil",
    icon: "mdi-tooth",
    href: "/ModificarPerfil",
  },
  {
    title: "Consultar Citas",
    icon: "mdi-tooth",
    href: "/gestionarPrescripción",
  },
  {
    title: "Modificar Perfil",
    icon: "mdi-view-dashboard",
    href: "/ModificarPerfil",
  },
  
];
const itemsPacienteTemp = [
  {
    divider: "Principal",
    title: "Inicio",
    icon: "mdi-tooth",
    href: "/dashboard-management",
  },  

];
const itemsPaciente = [
  {
    divider: "Principal",
    title: "Inicio",
    icon: "mdi-tooth",
    href: "/dashboard-management",
  },
  {
    divider: "Odontograma",
    title: "Inicio",
    icon: "mdi-tooth",
    href: "/components/HistoriaClinica/odontograma.js",
  },
  {
    divider: "Principal",
    title: "Modificiar Mi Perfil",
    icon: "mdi-tooth",
    href: "/ModificarPerfil",
  },
  {
    title: " Mi historia clinica",
    icon: "mdi-tooth",
    href: "/historiaClinica",
  },
  {
    title: " Subir Resultados",
    icon: "mdi-tooth",
    href: "/gestionarPrescripción",
  },
  {
    title: " Mis recetas",
    icon: "mdi-tooth",
    href: "/gestionarPrescripción",
  },
];

export {
  itemsAdministrador,itemsMedico,itemsRecepcionista,itemsAsistente,itemsPacienteTemp, itemsPaciente
}
