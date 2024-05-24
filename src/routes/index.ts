// vue-router
import { RouterOptions, createRouter, createWebHistory } from 'vue-router'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Layout.vue'),
    children: [
      {
        path: '/',
        redirect: '/user'
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/pages/User.vue')
      },
      {
        path: '/advice',
        name: 'advice',
        component: () => import('@/pages/Advice.vue')
      },
      {
        path: '/share',
        name: 'share',
        component: () => import('@/pages/Share.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/Register.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
