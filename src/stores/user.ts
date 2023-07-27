import { defineStore } from 'pinia';
import { userLoginByAccount, checkToken, getUserInfo } from '@/api/login';
import CONFIG from '@/global'
import { crypto } from '@/utils/crypto'
import { CACHE_TOKEN, CACHE_USER_INFO, CACHE_PERMISSIONS } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { useSystemStore } from './system'

interface IAccount {
  username: string
  password: string
  appKey: string
}


export const useUserStore = defineStore('user', () => {

  async function loginAction(data: IAccount) {

    try {
      const systemStore = useSystemStore()

      const params1 = {
        ...data
      }
      const resLogin = await userLoginByAccount(params1)

      // console.log('resLogin', resLogin);
      const token = resLogin.data.gmsso_cli_ec_key

      const params2 = {
        token
      }

      const resToken = await checkToken(params2)

      localCache.setItem(CACHE_TOKEN, token)

      // console.log('resToken', resToken);

      const params3 = {
        userId: resToken.data.userId
      }

      const resUser = await getUserInfo(params3)

      const resUserData = resUser.data

      const userInfo = {
        userId: resUserData.id,
        loginName: resUserData.loginName,
        realName: resUserData.realName,
        areaName: resUserData.areaNames,
        jgdm: resUserData.organizations[0]?.code,
        jgmc: resUserData.organizations[0]?.name
      }

      const permissions = resUserData.permissions.map((item: any) => item.permValue)

      localCache.setItem(CACHE_USER_INFO, userInfo)
      localCache.setItem(CACHE_PERMISSIONS, permissions)

      await systemStore.systemInitAction()
    } catch (error) {
      throw new Error(error as string)
    }

  }

  return {
    loginAction
  }
})