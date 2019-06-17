<template>
    <div id="register">
        <v-flex md6 offset-md3>
            <v-form class="white elevation-2" ref="form" v-model="valid" >
                <v-toolbar flat dense class="deep-purple" dark>
                    <v-toolbar-title style="margin: 0 auto">
                        Sign Up
                    </v-toolbar-title>
                </v-toolbar>

                <form class="pt-4">
                    <v-text-field
                            color="purple darken-2"
                            class="mb-2 px-5"
                            v-model="name"
                            :rules='[rules.required, rules.min, rules.max]'
                            label="Name"
                            :counter="32"
                            required
                            clearable
                    ></v-text-field>

                    <v-text-field
                            color="purple darken-2"
                            class="mb-2 px-5"
                            type="email"
                            v-model="email"
                            :rules='[rules.required, rules.email]'
                            label="Email Address"
                            required
                            clearable
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
                            clearable
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
                            clearable
                    ></v-text-field>

                    <div class="pb-5 pt-3">
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
                }
            },
            async register() {
                if(this.valid) {
                    await AuthService.register({
                        email: this.email,
                        password: this.password
                    })
                        .then(() => {
                            this.alertOpen('success', 'Registration Successful')
                            this.formReset()
                        })
                        .catch(err => {
                            this.alertOpen('warning', err.response.data.error)
                            this.formReset()
                        });
                }
            }
        }
    }
</script>

<style scoped>
    #register {
        margin-top: 7%;
    }
    form {
        text-align: center;
    }
</style>
