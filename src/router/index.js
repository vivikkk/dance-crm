import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Login from '../views/Login'
import Students from '../views/Students'
import Events from '../views/Events'
import Attendance from '../views/Attendance'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/students',
    name: 'Students',
    component: Students
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: Attendance
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
