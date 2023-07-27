import { defineStore } from 'pinia'

import { computed, ref } from 'vue'
import { CACHE_PERMISSIONS } from '@/global/constants'
import { localCache } from '@/utils/cache'

const kebabCaseToHump = (val: string) => {
  const f = val.split('-')
  let s = ''
  f.forEach((x) => {
    s += x[0].toUpperCase() + x.slice(1)
  })
  return s
}

export const useRouterStore = defineStore('router', () => {
  // 菜单路由
  const routes = ref<any[]>([])
  // 所有有权限的path(和菜单路由的区别，包含了不是菜单的路由)
  const allPermPaths = ref<string[]>([])
  // 缓存的组件名称数组
  const keepAliveList = ref<string[]>([])

  const getRoutes = computed(() => routes.value)
  const hasRoutes = computed(() => !!routes.value.length)
  const getFirstRoutePath = computed(() => routes.value[0]?.path)
  const getAllPermPaths = computed(() => allPermPaths.value)
  const getKeepAliveList = computed(() => keepAliveList.value)

  const updateRoutes = (data: any[]) => {
    const permissions = localCache.getItem(CACHE_PERMISSIONS)

    const _filterMenu = (data: any[]): any[] => {
      const _routes = []

      for (const item of data) {
        // 有权限
        if (!item.meta.permission || permissions?.includes(item.meta.permission)) {
          // 菜单
          if (item.meta.menuVisible) {
            let children = []

            if (item.children && item.children.length) {
              children = _filterMenu(item.children)
              // 如果子级为空，则父级也不会显示
              if (children.length) _routes.push({ ...item, children })
            } else {
              _routes.push(item)
            }
          }

          allPermPaths.value.push(item.path)
        }
      }

      return _routes
    }

    routes.value = _filterMenu(data)
  }

  const updateKeepAliveList = (name: string) => {
    const CpnName = kebabCaseToHump(name)
    // 涉及到添加、删除的数组操作最好用findIndex,这样删除的时候可以获取到索引
    const index = keepAliveList.value.findIndex(x => x === CpnName)
    if (index === -1) keepAliveList.value.push(CpnName)
    else keepAliveList.value.splice(index, 1)
  }

  return {
    routes,
    allPermPaths,
    keepAliveList,
    getRoutes,
    hasRoutes,
    getFirstRoutePath,
    getKeepAliveList,
    getAllPermPaths,
    updateRoutes,
    updateKeepAliveList
  }
})
