import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { CACHE_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import CONFIG from '@/global'
import { API } from '@/api/login'
import { requestHandle, decryptData } from './ctypto-tools'

const requestNoToken = [API.getCode, API.login, API.tokenCheck]



class HrRequest {
  private instance: AxiosInstance
  private controller: AbortController

  constructor() {
    this.controller = new AbortController()

    this.instance = axios.create({
      signal: this.controller.signal
    })

    this.instance.interceptors.request.use(
      (config) => {
        // 需要token的接口
        if (!requestNoToken.includes(config.url as string)) {
          const token = localCache.getItem(CACHE_TOKEN)
          if (token) {
            config.headers.token = token
          } else {
            this.controller.abort('token获取失败！')
          }
        }
        
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        if (requestHandle.includes(response.config.url as string)) {
          return decryptData(response.data)
        }
        return response.data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 两个泛型 T为response.data D为 config.data
  public request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
    return this.instance(config)
  }

  public get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.instance.get(url, config)
  }

  public post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.instance.post(url, data, config)
  }

  public delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.instance.delete(url, config)
  }
}


export default new HrRequest()
