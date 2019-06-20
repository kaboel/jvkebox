<template>
    <div class="footer">
        <v-footer color="purple darken-4" class="justify-center">
            <div class="text-xs-center purple--text text--lighten-4">
                <span>&copy; {{ new Date().getFullYear() }}. </span>
                <b>Kodeskillet.</b>
            </div>
        </v-footer>
    </div>
</template>

<script>
    export default {
        name: 'footer'
    }
</script>

<style scoped>

</style>
