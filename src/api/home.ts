import CONFIG from '@/global'
import hrRequest from '@/utils/request'

export const API = {
  // 接入情况
  sxjrqk: CONFIG.phcics + 'tj/sxjrqk',
}

export const sxjrqk = () => hrRequest.get(API.sxjrqk)