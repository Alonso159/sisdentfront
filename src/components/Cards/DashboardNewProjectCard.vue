<template>
    <div>
        <v-card :class="cardClass">
            <v-card-text class="px-1 py-1">
                <div class="d-flex justify-space-between align-center pa-2">
                    <div class="ml-2 flex-grow-1">
                        <h6 class="ma-0 white--text">
                            {{ text }}
                        </h6>
                    </div>
                    <div class="grid-button">
                        <v-btn
                          class="mx-2 shadow-none"
                          fab
                          dark
                          small
                          :class="btnColor"
                        >
                          <v-icon dark>
                              {{ btnIcon }}
                          </v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    props: {       
        cardClass: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        btnIcon: {
            type: String,
            default: ''
        },
        btnColor: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            hover: false
        }
    }
}
</script>
<style>
.badge {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
    line-height: 30px;
    font-size: 0.5rem;
    display: flex;
    align-items: baseline;
    justify-content: center;
    padding: 0px !important;
    border-radius: 50%;
}
</style>
