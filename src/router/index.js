import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'UserManagement',
    component: () => import('../views/UserManagement.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: '/admin-managment',
        name: 'AdminManagement',
        component: () => import('../views/AdminManagement.vue')
      },
      {
        path: '/DatasetManagement',
        name: 'DatasetManagement',
        component: () => import('../views/DatasetManagement.vue')
      },
      {
        path: '/manage-user',
        name: 'ManageUser',
        component: () => import('../views/ManageUser.vue')
      }
    ]
  },
  {
    path: '/editprofile',
    name: 'EditProfile',
    component: () => import('../views/EditProfile')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
