import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "@/views/HelloWorld";
import Authenticated from "@/views/Authenticated";
import Register from "@/views/Auth/Register";
import Login from "@/views/Auth/Login";
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/authenticated', component: Authenticated },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = [
        '/',
        '/login',
        '/register'
    ]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = store.getters.isAuthenticated

    if (authRequired && !loggedIn) {
        return next('/login')
    }
    next()
})

export default router
