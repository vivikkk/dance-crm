import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Login from '../views/Login'
import Students from '../views/Students'
import Events from '../views/Events'
import Attendance from '../views/Attendance'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/students',
    name: 'Students',
    component: Students,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: Attendance,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.requireAuth)

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
