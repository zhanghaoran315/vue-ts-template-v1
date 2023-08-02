import './assets/css/index.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/utils/ctypto-tools'


const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import App from './App.vue'
import router from './router'

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
