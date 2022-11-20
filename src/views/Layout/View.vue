<template>
  <v-main app >
    <div class="d-flex flex-column h-full">
      <v-container class="" style="width: fit-content">
        <transition mode="out-in">
          <router-view />
        </transition>
      </v-container>
      <div class="flex-grow-1"></div>
     <!--  <app-footer></app-footer> -->
    </div>
  </v-main>
</template>
<script>
export default {
  components: {
    //AppFooter: () => import("./Footer.vue"),
  },
};
</script>