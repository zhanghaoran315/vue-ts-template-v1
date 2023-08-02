import { crypto } from './crypto'
import { API as ckrwAPI } from '@/api/ckrw'

export const requestHandle = [
  ckrwAPI.cxrwList,
  ckrwAPI.cxrwId
]

export const decryptData = (data: string) => {
  try {
    const str = data.replace('gmjmks', '')
    const result = crypto.decryptByDES(str)
    return JSON.parse(result) // 如果d是number，可能会精度缺失，比如证件号
  } catch (error) {
    console.error(new Error(error as string))
    return data
  }
}
