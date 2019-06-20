<template>
    <v-flex md6 offset-md3 id="register">

        <Panel title="Register">
            <v-form class="pt-4" ref="form" v-model="valid">
                <v-text-field
                        color="purple darken-2"
                        class="mb-2 px-5"
                        v-model="name"
                        :rules='[rules.required, rules.min, rules.max]'
                        label="Name"
                        :counter="32"
                ></v-text-field>

                <v-text-field
                        color="purple darken-2"
                        class="mb-2 px-5"
                        type="email"
                        v-model="email"
                        :rules='[rules.required, rules.email]'
                        label="Email Address"
                ></v-text-field>

                <v-text-field
                        color="purple darken-2"
                        class="mb-4 px-5"
                        v-model="password"
                        :append-icon="showPassA ? 'visibility' : 'visibility_off'"
                        :rules="[rules.required, rules.min, rules.max]"
                        :type="showPassA ? 'text' : 'password'"
                        label="Password"
                        :counter="32"
                        @click:append="showPassA = !showPassA"
                ></v-text-field>

                <v-divider/>

                <v-text-field
                        color="purple darken-2"
                        class="mb-4 mt-4 px-5"
                        v-model="passwordVer"
                        :append-icon="showPassB ? 'visibility' : 'visibility_off'"
                        :rules="passwordConfirmation"
                        :type="showPassB ? 'text' : 'password'"
                        label="Password Confirmation"
                        :counter="32"
                        @click:append="showPassB = !showPassB"
                ></v-text-field>

                <div class="pb-5 pt-3" style="text-align: center">
                    <v-btn :disabled="!valid"
                           color="purple--text"
                           @click="register">
                        Register
                    </v-btn>

                    <v-btn color="red--text"
                           @click="formReset">
                        Clear
                    </v-btn>
                </div>
            </v-form>
        </Panel>

        <v-alert :value="alert.value"
                 :type="alert.type"
                 transition="scale-transition">
            {{ alert.msg || "No message defined." }}
        </v-alert>
    </v-flex>
</template>

<script>
    import Panel from "./helpers/Panel";
    import AuthService from "../services/AuthService";
    export default {
        name: 'register',
        components: {Panel},
        data() {
            return {
                valid: false,
                name: '',
                email: '',
                password: '',
                passwordVer: '',

                rules: {
                    required: val => !!val || 'This field is required.',
                    min: val => val.length >= 8 || 'Minimum characters are 8.',
                    max: val => val.length <= 32 || 'Maximum characters are 32.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'Email address is invalid.'
                    }
                },

                showPassA: false,
                showPassB: false,

                alert: {
                    value: false,
                    type: null,
                    msg: null
                }

            }
        },
        computed: {
            passwordConfirmation() {
                return [
                    val => !!val || 'Password confirmation is required.',
                    val => val.length >= 8 || 'Minimum characters are 8.',
                    val => val.length <= 32 || 'Maximum characters are 32.',
                    () => (this.password === this.passwordVer) || 'Password does not match.'
                ];
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
                };
                setTimeout(() => {
                    this.alert.value = false;
                }, 5000)
            },
            async register() {
                if(this.valid) {
                    try {
                        const store = this.$store;
                        const response = await AuthService.register({
                            name: this.name,
                            email: this.email,
                            password: this.password
                        });

                        store.dispatch('Login', response.data)
                            .then(() => {
                                this.alertOpen('success', `Registration Successful. Welcome ${store.getters.getUser.name}.`);
                                this.formReset()
                            }).catch(err => {
                                this.alertOpen('error', err.response.data.error);
                                this.formReset()
                            })
                    } catch (err) {
                        this.alertOpen('error', err.response.data.error);
                        this.formReset()
                    }
                }
            }
        }
    }
</script>

<style scoped>
</style>
