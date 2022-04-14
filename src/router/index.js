import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/content',
    name: 'Content',
    component: () => import('@/views/Content.vue')
  },
  {
    path: '/inner',
    name: 'Inner',
    redirect: 'Content',
    component: () => import('@/views/Inner.vue'),
    children: [
      {
        path: 'merchants',
        name: 'Merchants',
        component: () => import('@/views/Merchants.vue')
      },
      {
        path: 'merchantDetail',
        name: 'MerchantDetail',
        component: () => import('@/views/MerchantDetail.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
