import { defineStore } from 'pinia';
import { getAppInfo, getDicInfo, getOrgInfo, getAreaInfo } from '@/api/login';
import { CACHE_DIC, CACHE_ORG, CACHE_AREA } from '@/global/constants';
import { localCache } from '@/utils/cache';
import CONFIG from '@/global';
import { ref } from 'vue';

export const useSystemStore = defineStore('system', () => {

  const dic = ref<any[]>(localCache.getItem(CACHE_DIC) ?? [])

  const org = ref<any[]>(localCache.getItem(CACHE_ORG) ?? [])

  const area = ref<any[]>(localCache.getItem(CACHE_AREA) ?? [])

  async function systemInitAction() {

    try {
      const params1 = {
        name: CONFIG.APP_KEY
      }
      const appInfo = await getAppInfo(params1)

      const appId = appInfo.data.id

      const results = await Promise.all([
        getDicInfo({ appId }),
        getOrgInfo(),
        getAreaInfo()
      ])

      results.forEach((res, index) => {
        const data = res.data
        if (Array.isArray(data)) {
          if (index === 0) {
            dic.value = data
            localCache.setItem(CACHE_DIC, data)
          } else if (index === 1) {
            org.value = data?.[0].childrens ?? []
            localCache.setItem(CACHE_ORG, org.value)
          } else if (index === 2) {
            area.value = data?.[0].childrens ?? []
            localCache.setItem(CACHE_AREA, area.value)
          }
        }
      })
    } catch (error) {
      throw new Error(error as string)
    }

  }

  return {
    systemInitAction,
    dic
  }
})
