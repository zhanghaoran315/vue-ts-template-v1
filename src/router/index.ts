import { createRouter, createWebHashHistory } from 'vue-router'

import { localCache } from '@/utils/cache'
import { CACHE_USER_INFO } from '@/global/constants'

import home from './modules/home'
import task from './modules/task'
import statisticalAnalysis from './modules/statisticalAnalysis'
import logManage from './modules/logManage'

import { useRouterStore } from '@/stores/router'

export const routeList = [home, task, statisticalAnalysis, logManage]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layout/layout.vue'),
      redirect: routeList[0].path,
      children: routeList
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/notFound/notFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  const routerStore = useRouterStore()

  if (to.path !== '/login' && !localCache.getItem(CACHE_USER_INFO)) {
    return '/login'
  }

  if (!routerStore.hasRoutes) routerStore.updateRoutes(routeList)
  if (!routerStore.allPermPaths.includes(to.path)) return routerStore.getFirstRoutePath
})

export default router
