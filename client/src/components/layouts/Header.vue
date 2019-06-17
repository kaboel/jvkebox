<template>
    <div>
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

            <v-toolbar-items v-show="this.$store.getters.getStatus">
                <v-btn flat dark @click="dialog = !dialog">
                    Logout
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-text>
                    <span style="font-size: 1.2rem">
                        Are you sure you want to leave?
                    </span>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text text--darken-4"
                           flat="flat"
                           @click="dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn class="purple--text text--darken-4"
                           flat="flat"
                           @click="logout">
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar.display"
                    :timeout="snackbar.timeout"
                    bottom right>
            {{ snackbar.text }}
            <v-btn class="purple--text text--lighten-4"
                   @click="snackbar.display = false"
                   flat>
                Ok
            </v-btn>
        </v-snackbar>

    </div>
</template>

<script>
    export default {
        name: 'header',
        data() {
            return {
                dialog: false,
                snackbar: {
                    display: false,
                    timeout: 3000,
                    text: ''
                }
            }
        },
        methods: {
            logout() {
                const store = this.$store;
                const data = {token: null, user: null};
                store.dispatch('Login', data)
                    .then(() => {
                        this.dialog = false;
                        this.snackbar = {
                            display: true,
                            text: 'You are now logged out.'
                        }
                    });
            }
        }
    }
</script>

<style scoped>

</style>
