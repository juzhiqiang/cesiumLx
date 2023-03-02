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
    }, {
      path: '/Terrain',
      name: 'Terrain',
      component: () => import('../views/Terrain.vue')
    }, {
      path: '/CoordinateTransformation',
      name: 'CoordinateTransformation',
      component: () => import('../views/CoordinateTransformation.vue')
    }, {
      path: '/CameraSite',
      name: 'CameraSite',
      component: () => import('../views/CameraSite.vue')
    }


  ]
})

export default router
