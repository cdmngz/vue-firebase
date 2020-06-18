import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/activities',
    name: 'Activities',
    component: () => import('../views/Activities.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/feelings',
    name: 'Feelings',
    component: () => import('../views/Feelings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const reqAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuth = firebase.auth().currentUser
  if(reqAuth && !isAuth) {
    next('/')
  } else if(reqAuth===false && isAuth) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
