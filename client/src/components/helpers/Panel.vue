<template>
    <div id="songs">
        <div class="white elevation-2">
            <v-toolbar flat dense class="deep-purple" dark>
                <v-toolbar-title>{{ title || "No title defined." }}</v-toolbar-title>
                <slot name="actions" />
            </v-toolbar>
            <slot>
                <div style="text-align: center" class="pt-3 pb-3">No content defined.</div>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'panel',
        props: {
            title: String
        }
    }
</script>

<style scoped>
</style>
