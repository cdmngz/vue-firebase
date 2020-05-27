import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

console.log('router/index.js')

Vue.use(VueRouter)

console.log('Llamando user desde router/index: '+store.state.user)

let routes = []

if(true) {
routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/home',
    name: 'Home2',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/activities',
    name: 'Activities',
    component: () => import('../views/Activities.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/feelings',
    name: 'Feelings',
    component: () => import('../views/Feelings.vue')
  },
]
} else {
  routes = [
    {
      path: '*',
      name: 'Home',
      component: Home
    }
  ]
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
