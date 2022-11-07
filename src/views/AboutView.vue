<template>
  <div id="pagePrincipal">
    <template>
      <v-app class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-main>
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
          <v-footer height="auto" class="pa-3 app--footer">
            <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"
              >😷
            </span>
          </v-footer>
        </v-main>
      </v-app>
    </template>
  </div>
</template>
