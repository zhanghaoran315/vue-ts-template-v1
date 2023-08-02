import CONFIG from '@/global'
import hrRequest from '@/utils/request'

export const API = {
  // 查询任务列表
  cxrwList: CONFIG.phcics + 'cxrw/list',
  // 查询任务详情
  cxrwId: CONFIG.phcics + 'cxrw/{cxrwId}',
}

export const cxrwList = (params: any) => hrRequest.get(API.cxrwList, { params })

export const cxrwDetail = (params: any) => hrRequest.get(API.cxrwId, { params })
