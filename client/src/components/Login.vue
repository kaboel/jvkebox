<template>
    <div id="login">
        <v-flex md4 offset-md4>
            <v-form class="white elevation-2" ref="form" v-model="valid">
                <v-toolbar flat dense class="deep-purple" dark>
                    <v-toolbar-title style="margin: 0 auto">
                        Login
                    </v-toolbar-title>
                </v-toolbar>

                <form class="pt-3">
                    <v-text-field
                            color="purple darken-2"
                            class="px-4"
                            type="email"
                            v-model="email"
                            :rules='[rules.required, rules.email]'
                            label="Email Address"
                    ></v-text-field>

                    <v-text-field
                            color="purple darken-2"
                            class="mb-2 px-4"
                            v-model="password"
                            :append-icon="showPass ? 'visibility' : 'visibility_off'"
                            :rules="[rules.required, rules.min, rules.max]"
                            :type="showPass ? 'text' : 'password'"
                            label="Password"
                            :counter="32"
                            @click:append="showPass = !showPass"
                    ></v-text-field>

                    <div class="pb-4 pt-2">
                        <v-btn :disabled="!valid"
                               color="purple--text"
                               @click="login">
                            Login
                        </v-btn>
                    </div>
                </form>
            </v-form>
            <v-alert :value="alert.value"
                     :type="alert.type"
                     transition="scale-transition"
                     dismissible>
                {{ this.alert.msg }}
            </v-alert>
        </v-flex>

    </div>
</template>

<script>
    import AuthService from "../services/AuthService";
    export default {
        name: 'register',
        data() {
            return {
                valid: false,
                email: '',
                password: '',
                showPass: false,
                rules: {
                    required: val => !!val || 'This field is required.',
                    min: val => val.length >= 8 || 'Minimum characters are 8.',
                    max: val => val.length <= 32 || 'Maximum characters are 32.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'Email address is invalid.'
                    }
                },
                alert: {
                    value: false,
                    type: null,
                    msg: null
                }
            }
        },
        methods: {
            formReset() {
                this.$refs.form.reset();
                this.$refs.form.resetValidation();
            },
            alertOpen(type, msg) {
                this.alert = {
                    value: true,
                    type: type,
                    msg: msg
                }
            },
            async login() {
                if(this.valid) {
                    try {
                        const store = this.$store;
                        const response = await AuthService.login({
                            email: this.email,
                            password: this.password
                        });

                        store.dispatch('Login', response.data)
                            .then(() => {
                                this.alertOpen('success', `Welcome <b>${store.getters.getUser.name}</b>.`);
                                this.formReset();
                            }).catch(err => {
                                this.alertOpen('error', err.response.data.error);
                                this.formReset();
                            });
                    } catch (err) {
                        this.alertOpen('warning', err.response.data.error);
                        this.formReset();
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        margin-top: 7%;
    }
    form {
        text-align: center;
    }
</style>
