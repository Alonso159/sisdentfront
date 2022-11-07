<template>
    <v-card class="h-full">
        <v-card-title class="d-flex justify-space-between">
            <div class="mb-0 mr-4">
                <p class="card-title mb-0">{{ title }}</p>
            </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <slot name="chart"></slot>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        buttonText: {
            type: String,
            default: 'More'
        }
    }
}
</script>
