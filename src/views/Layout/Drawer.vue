<template>
  <v-navigation-drawer v-model="getThemeMode.verticalSidebarDrawer" class="sidebar-six" dark height="100%" width="280px"
    :mobile-breakpoint="960" :floating="true" app>
    <vue-perfect-scrollbar :settings="{ suppressScrollX: true, wheelPropagation: false }" class="ps" style="height: 100%">
      <div class="mb-1 ml-3 pa-4 top-toolbar">
        <v-avatar size="36">
          <v-img src="@/assets/images/usuario-de-perfil.png"></v-img>
        </v-avatar>
      </div>
      <div class="pa-3 rounded-lg mx-4 white--text bg-sidebar-six d-flex space-between">
        <div class="flex-1">
          <p v-if="typeUser" class="subtitle-1 mb-0 text-capitalize">{{ typeUser.nameSis }}</p>
          <p class="mt-2 text-subtitle-2 mb-0 grey--text text--lighten-1">
            <span v-if="typeUser">{{ typeUser.type }}</span>
          </p>
        </div>
      </div>

      <v-divider class="my-5"></v-divider>
      <v-list class="py-0 mx-4" dense>
        <!--     <v-list-item v-for="item in computedItems">
          <v-list-item-title>

          </v-list-item-title>
          <v-list-group :value="true">
            <template v-slot:activator>
              <v-list-item-content>{{ titulos }}</v-list-item-content>
            </template>
            <v-list-item>
              <v-list-item-title>Hijo de arriba</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item-icon><v-icon>mdi-book</v-icon></v-list-item-icon>
        </v-list-item>-->

      </v-list>
      <v-list class="py-0 mx-4" dense>
        <template v-for="item in computedItems">
          <v-list-item color="primary" class="list-item" :to="item.href ? item.href : null" ripple="ripple"
            :disabled="item.disabled" :target="item.target" rel="noopener">
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
        <v-btn depressed class="ma-1" color="error" plain @click="logOut()" absolute>
          <v-icon left> mdi-logout </v-icon>
          Cerrar Sesion
        </v-btn>
      </div>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { itemsAdministrador, itemsMedico, itemsRecepcionista, itemsAsistente, itemsPacienteTemp, itemsPaciente } from "../../data/Navigation/navigationThree";
import { mdiTooth } from "@mdi/js";
import { integer } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      books: ['History', 'Fiction', 'Philosophy'],
      titulos: "",
      group: null,
      showMenu: false,
    };
  },
  async created() {
    await this.fetchUser();
    this.asignandoTitulos();
    //this.$notificationHub.sessionOpened("users_logged");
  },
  computed: {
    ...mapGetters(["getThemeMode"]),
    ...mapGetters("Authentication", ["user", "typeUser"]),
    computedItems() {

      // return this.items.map(this.mapItem);
      let permisos = [
        /*  {
            title: "Dashboard",
            icon: mdiTooth,
            name: "Dashboard",
            href: "/dashboard-management",
          },
          {
            title: "Gestionar Citas Paciente",
            icon: mdiTooth,
            name: "Dashboard",
            href: "/gestionarCitaPaciente",
          },
          {
            title: "Gestionar Citas Medico",
            icon: mdiTooth,
            name: "GestionarCitaMedico",
            href: "/gestionarCitaMedico",
          },
          {
            title: "Gestionar Citas Recepcionista",
            icon: mdiTooth,
            name: "GestionarCitaRecepcionista",
            href: "/gestionarCitaRecepcionista",
          },
         
         /* {
            title: "Gestionar Medicos",
            icon: mdiTooth,
            name: "GestionarEspecialida<<",
            href: "/gestionarEspecialidades",
          },*/
      ]

      if (this.user.rol == "5") {
        permisos = itemsPacienteTemp;
      }
      if (this.user.rol == "4") {
        permisos = itemsPaciente;
      }
      if (this.user.rol == "3") {
        permisos = itemsMedico;
      }
      if (this.user.rol == "1") {
        permisos = itemsAsistente;
      }
      if (this.user.rol == "2") {
        permisos = itemsRecepcionista;
      }
      if (this.user.rol == "0") {
        permisos = itemsAdministrador
      }


      return permisos;
    },
  },
  methods: {
    ...mapActions(["changeVerticalSidebarDrawer"]),
    ...mapActions("Authentication", ["logOut", "fetchUser"]),
    toggleSidebar() {
      this.changeVerticalSidebarMini();
      this.expandOnHover = !this.expandOnHover;
      // this.$emit("update:mini-variant");
      // console.log("check");
    },
    asignandoTitulos() {

      for (let i = 0; i < itemsAdministrador.length; i++) {
        let a = itemsAdministrador[i].title
        this.titulos = a
      }

    },
  },
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
