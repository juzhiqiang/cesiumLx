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
    }, {
      path: '/3dTiles',
      name: '3dTiles',
      component: () => import('../views/3dTiles.vue')
    }, {
      path: '/Primitive',
      name: 'Primitive',
      component: () => import('../views/Primitive.vue')
    }, {
      path: '/PrimitiveMutual',
      name: 'PrimitiveMutual',
      component: () => import('../views/PrimitiveMutual.vue')
    }, {
      path: '/Material',
      name: 'Material',
      component: () => import('../views/Material.vue')
    }, {
      path: '/Shaders',
      name: 'Shaders',
      component: () => import('../views/Shaders.vue')
    }, {
      path: '/EntityShaders',
      name: 'EntityShaders',
      component: () => import('../views/EntityShaders.vue')
    }, {
      path: '/AddGeojson',
      name: 'AddGeojson',
      component: () => import('../views/AddGeojson.vue')
    }, {
      path: '/KmlDataSource',
      name: 'KmlDataSource',
      component: () => import('../views/KmlDataSource.vue')
    }
    , {
      path: '/CzmlData',
      name: 'CzmlData',
      component: () => import('../views/CzmlData.vue')
    }, {
      path: '/FlyLine',
      name: 'FlyLine',
      component: () => import('../views/FlyLine.vue')
    }, {
      path: '/3dTitlesXnJK',
      name: '3dTitlesXnJK',
      component: () => import('../views/3dTitlesXnJK.vue')
    }, {
      path: '/3dTitlesAddStyle',
      name: '3dTitlesAddStyle',
      component: () => import('../views/3dTitlesAddStyle.vue')
    }
    
  ]
})

export default router
