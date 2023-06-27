<template>
  <v-card :class="bgCardColor">
    <v-card-text class="d-flex align-center h-full">
      <div
        class="d-flex flex-grow-1 justify-space-between align-center flex-wrap"
      >
        <div>
          <p class="white--text title-card">
            {{ heading }}
          </p>
          <div class="text-h5 white--text my-2">
            {{ subHeading }}
          </div>
        </div>
        <v-icon :class="mainIconTextColor" class="text-h3">
          <!-- mdi-numeric-9-plus-circle-outline -->
          {{ mainIconName }}
        </v-icon>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    bgCardColor: {
      type: String,
      default: "",
    },
    mainIconTextColor: {
      type: String,
      default: "",
    },
    mainIconName: {
      type: String,
      default: "",
    },
    heading: {
      type: String,
      default: "",
    },
    subHeading: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.title-card {
  font-weight: 400;
  margin-top: 7px;
  margin-bottom: 15px;
  font-size: 1rem;
}
</style>
