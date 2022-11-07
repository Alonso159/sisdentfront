<template>
  <v-navigation-drawer
    v-model="getThemeMode.verticalSidebarDrawer"
    class="sidebar-six"
    dark
    height="100%"
    width="280px"
    :mobile-breakpoint="960"
    :floating="true"
    app
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      class="ps"
      style="height: 100%"
    >
      <div class="mb-1 ml-3 pa-4 top-toolbar">
        <v-avatar size="36">
          <v-img src="@/assets/images/usuario-de-perfil.png"></v-img>
        </v-avatar>
      </div>
      <div
        class="
          pa-3
          rounded-lg
          mx-4
          white--text
          bg-sidebar-six
          d-flex
          space-between
        "
      >
        <div class="flex-1">
          <p  class="subtitle-1 mb-0 text-capitalize">{{typeUser.nameSis}}</p>
          <p class="mt-2 text-subtitle-2 mb-0 grey--text text--lighten-1">
            <span>{{TituloUsuario}}</span>
          </p>
        </div>
      </div>

      <v-divider class="my-5"></v-divider>

    <v-list dense expand >
      <template v-for="item in computedItems">
        <v-list-item
          class="list-item"
          :to="item.href ? item.href : null"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="item.name"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span>
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
      <v-divider></v-divider>
      <div class="px-6 mb-6 mt-6">
        <v-btn block class="text-capitalize" color="primary" @click="logOut()">
          Cerrar Sesión
        </v-btn>
      </div>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { items, itemsCliente } from "../../data/Navigation/navigationThree";
import { mdiTooth } from '@mdi/js';
export default {
  data() {
    return {
      selectedItem: 0,
      group: null,
      items: items,
      showMenu: false,
    };
  },
  async created(){
    console.log(this.typeUser)
    await this.fetchUser();
    
    //this.$notificationHub.sessionOpened("users_logged");
  },
  computed: {
    ...mapGetters(["getThemeMode"]),
    ...mapGetters("Global",["GlobIdProject"]),
    ...mapGetters("Authentication",['user','typeUser']),
    computedItems() {
      // return this.items.map(this.mapItem);
      let permisos = [{
        title: "Dashboard",
        icon: mdiTooth,
        name: "Dashboard",
        href: "/dashboard-management",
      },
      {
        title: "Visualizar Cronograma",
        icon: mdiTooth,
        name: "GestionarCronograma",
        href: "/gestionarCronograma",
      },
       {
        title: "Visualizar Citas Programadas",
        icon: mdiTooth,
        name: "GestionarCitasProgramadas",
        href: "/gestionarCronograma",
      },
       {
        title: "Gestionar Especialidades",
        icon: mdiTooth,
        name: "GestionarEspecialida<<",
        href: "/gestionarEspecialidades",
      },
       {
        title: "Gestionar Especialidades",
        icon: mdiTooth,
        name: "GestionarEspecialidad",
        href: "/gestionarEspecialidada",
      },
      ];
      return permisos;
    },
    TituloUsuario(){
      return "Paciente"
    }
  },
  methods: {
    ...mapActions(["changeVerticalSidebarDrawer"]),
    ...mapActions("Authentication",['logOut', 'fetchUser']),     
    toggleSidebar() {
      this.changeVerticalSidebarMini();
      this.expandOnHover = !this.expandOnHover;
      // this.$emit("update:mini-variant");
      // console.log("check");
    },
    mapItem(item) {
      return {
        ...item,
        hide: 
          (item.identifier === "cotizacion-item" || 
          item.identifier === "cronograma-item" ||
          item.identifier === "dashboard-proy-item" ) 
          ? false
          : item.hide
        // to: !item.to ? undefined : `/app/${this.item.group}/${item.to}`,
      };
    },
  }
};
</script>
<style lang="scss">
.bg-sidebar-six {
  background-color: #292f3d;
}
.theme--dark .v-navigation-drawer {
  .bg-sidebar-six {
    background-color: #3a3939;
  }
}
.sidebar-six {
  .v-list-item__icon {
    margin-right: 8px !important;
    // margin-bottom: 0;
    // margin-top: 0;
  }

  .v-list-item--link:before {
    border-radius: 8px;
  }
}
</style>
