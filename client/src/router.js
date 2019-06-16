import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/register',
            name: 'register',
            component: () => import('./components/Register'),
            meta: {
                title: "Jvkebox | Sign up for a new account."
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./components/Login'),
            maeta: {
                title: "Jvkebox | Sign In"
            }
        }
    ]
})
