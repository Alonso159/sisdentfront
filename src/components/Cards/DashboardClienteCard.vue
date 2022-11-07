<template>
  <v-card :class="bgCardClass">
    <v-card-text class="d-flex align-center h-full">
      <div
        class="d-flex flex-grow-1 justify-space-between align-center flex-wrap"
      >
        <div class="ml-3">
          <v-icon :class="mainIconTextColor" class="text-h2 my-3">
            <!-- mdi-numeric-9-plus-circle-outline -->
            {{ mainIconName }}
          </v-icon>
          <div :class="classHeading" class="">
            {{ heading }}
          </div>
          <p :class="classSubHeading" class="">
            {{ subHeading }}
          </p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    bgCardClass: {
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
    classHeading: {
      type: String,
      default: "",
    },
    classSubHeading: {
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
.title-card {
  font-weight: 400;
  margin-top: 7px;
  margin-bottom: 15px;
  font-size: 1rem;
}
.card-color-red{
  background-color: #EA4876 !important;
}
.card-color-green{
  background-color: #49C195 !important;
}
.card-color-yellow{
  background-color: #F7C326 !important;
}
.card-color-blue{
  background-color: #349AD5 !important;
}

.icon-color-red{
  color: #F291AD;
  caret-color: #F291AD ;
}
.icon-color-green{
  color: #85D5B8;
  caret-color: #85D5B8 ;
}
.icon-color-yellow{
  color: #FFE699;
  caret-color: #FFE699 ;
}
.icon-color-blue{
  color: #78BCE3;
  caret-color: #78BCE3 ;
}

</style>
