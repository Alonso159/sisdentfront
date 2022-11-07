<template>
    <div id="pagePrincipal">
      <template>
        <v-app class="app app-admin-wrap-layout-6" style="background-color:#f2f3f8">
          <app-drawer :drawer="drawer"></app-drawer>
          <app-toolbar class="app--toolbar"></app-toolbar>
          <base-view />
        </v-app>
      </template>
    </div>
  </template>
  
  <script>
  import Drawer from "@/views/Layout/Drawer.vue";
  import AppBar from "@/views/Layout/AppBar.vue";
  import { mapGetters, mapActions } from "vuex";
  
  export default {
      name: "AppPrincipal",
      
      components: {
          BaseView: () => import("./View"),
          appDrawer: Drawer,
          appToolbar: AppBar
      },
      data: () =>({
        cards: ['Today', 'Yesterday'],
        drawer: null
      }),
      methods: {
        ...mapActions("Global",['setGlobIdProjectWhenStart']),
        ...mapActions("Authentication",['fetchUser','tryAutoLogin'])
      },
      async created() {
      
        await this.setGlobIdProjectWhenStart();  
        this.tryAutoLogin();        
        this.fetchUser();            
      
      },
      computed:{
        ...mapGetters("Global",["GlobIdProject"])
      } 
  }
  </script>
  <style lang="scss">
  .app-admin-wrap-layout-6 {
    .sidebar-six {
      &.theme--dark.v-navigation-drawer {
        background-color: #111827;
        // background-color: #111827;
      }
  
      // .top-toolbar {
      //   background-color: #111827;
      // }
    }
  }
  div.theme--dark .v-navigation-drawer {
    background-color: #272727 !important;
  }
  </style>