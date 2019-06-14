import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register'),
            meta: {
                title: "Jvkebox | User Registration"
            }
        }
    ]
})
