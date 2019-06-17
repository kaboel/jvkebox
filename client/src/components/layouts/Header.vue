<template>
    <v-toolbar fixed color="purple darken-4">
        <v-toolbar-title>
            <a class="purple--text text--lighten-5" href="/">
                <i><b>J</b>vkebox</i>
            </a>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items v-show="!this.$store.getters.getStatus">
            <v-btn flat dark to="/login">
                Login
            </v-btn>
            <v-btn flat dark to="/register">
                Sign Up
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        name: 'header'
    }
</script>

<style scoped>

</style>
