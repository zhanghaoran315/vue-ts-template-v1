import CONFIG from '@/global'
import qs from 'qs'
import hrRequest from '@/utils/request'

export const API = {
  // 登录
  login: CONFIG.login + 'login',
  // 检查token
  tokenCheck: CONFIG.login + 'tokenCheck',
  // 获取用户信息
  getUserInfo: CONFIG.uums + 'user/get',
  // 获取应用信息（拿到appId请求字典）
  getAppInfo: CONFIG.uums + 'app/get',
  // 获取字典
  getDicInfo: CONFIG.uums + 'dict/tree',
  // 获取机构
  getOrgInfo: CONFIG.uums +  'organization/tree',
  // 获取区域
  getAreaInfo: CONFIG.uums + 'area/tree'
}

interface IAccount {
  username: string
  password: string
  appKey: string
}

export const userLoginByAccount = (data: IAccount) => {
  return hrRequest.post(API.login, qs.stringify(data))
}

export const checkToken = (params: any) => {
  return hrRequest.get(API.tokenCheck, { params })
}

export const getUserInfo = (params: any) => {
  return hrRequest.get(API.getUserInfo, { params })
}

// 获取app信息
export const getAppInfo = (params: any) => {
  return hrRequest.get(API.getAppInfo, { params })
}

// 获取字典
export const getDicInfo = (params: any) => {
  return hrRequest.get(API.getDicInfo, { params })
}

// 获取机构
export const getOrgInfo = () => {
  return hrRequest.get(API.getOrgInfo)
}

// 获取区域
export const getAreaInfo = () => {
  return hrRequest.get(API.getAreaInfo)
}
