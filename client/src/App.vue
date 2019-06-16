<template>
    <div id="app">
        <v-app>
            <Header />
            <v-content>
                <v-container fluid>
                    <router-view/>
                </v-container>
            </v-content>
            <Footer />
        </v-app>
    </div>
</template>

<script>
    import Header from "./components/layouts/Header";
    import Footer from "./components/layouts/Footer";
    export default {
        name: 'app',
        components: {Footer, Header}
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap');

    * {
        font-family: 'Saira Semi Condensed', sans-serif;
    }

    a {
        text-decoration: none !important;
    }
</style>
