import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'root',
            component: () => import('./components/Home'),
            meta: {
                title: "Jvkebox | Your home to music."
            }
        },
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
            meta: {
                title: "Jvkebox | Sign In."
            }
        },
        {
            path: '/songs',
            name: 'songs',
            component: () => import('./components/Songs'),
            meta: {
                title: "Jvkebox | Browse for music."
            }
        },
        {
            path: '/song/add',
            name: 'addSong',
            component: () => import('./components/AddSong'),
            meta: {
                title: 'Jvkebox | Add new song.'
            }
        }
    ]
})
