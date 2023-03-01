import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'baseCesium',
      component: () => import('../views/BaseCesium.vue')
    },
    {
      path: '/CustomMapLayer',
      name: 'CustomMapLayer',
      component: () => import('../views/CustomMapLayer.vue')
    }
  ]
})

export default router
