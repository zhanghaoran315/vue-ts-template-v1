/// <reference types="vite/client" />


// 配置vue文件模块
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

// 生命全局的CONFIG
declare interface Window {
  CONFIG: any
}

declare module '*.mjs'

declare module '*.js'
