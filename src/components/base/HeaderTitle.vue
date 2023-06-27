<template>
  <v-card class="px-4 py-1">
    <v-card-title class="py-0 my-3"
      >{{ this.titleText }} </v-card-title
    >
    <v-card-text class="pb-0 mt-2">
      <p class="body-2" v-if="listRedirections.length > 0">
        <span v-for="(item, index) in listRedirections" :key="index">
          <a :href="item.url">
            <span>{{ item.text }}</span>
          </a>
          <span
            style="color: #2196f3"
            v-if="index != Object.keys(listRedirections).length - 1"
          >
            /
          </span>
        </span>
      </p>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    titleText: {
      type: String,     
    },
    listRedirections: {
      type: Array,
      default() {
        return [];
      },
    },
  }, 
  computed: {
    ...mapGetters("Authentication", ["user"]),   
  },
};
</script>
