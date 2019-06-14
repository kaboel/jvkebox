<template>
    <div id="register">
        <h1>Register</h1>
        <input type="email" name="email" placeholder="email" v-model="email">
        <br>
        <input type="password" name="password" placeholder="password" v-model="password">
        <br>
        <button @click="register" type="button">Register</button>
    </div>
</template>

<script>
    import AuthService from "../services/AuthService";
    export default {
        name: 'register',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async register() {
                const response = await AuthService.register({
                    email: this.email,
                    password: this.password
                });
                // eslint-disable-next-line
                console.log(response.data);
            }
        }
    }
</script>

<style scoped>

</style>
