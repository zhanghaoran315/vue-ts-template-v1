import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


import vitePluginAutoScript from './vitePlugin/vite-plugin-auto-script'
import vitePluginAutoZip from './vitePlugin/vite-plugin-auto-zip';
import vitePluginVersion from './vitePlugin/vite-plugin-version';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd())
  // .env在 dev 和 build时都会加载
  return {
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'] // 配置需要自动导入的库
        // dts: 'src/auto-imports.d.ts' // 自动引入生成api的地址
      }),
      AutoImport({
        // plus按需引入
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        // plus按需引入
        resolvers: [ElementPlusResolver()]
        // dts: 'src/components.d.ts' //自动引入生成的组件的地址
      }),
      vitePluginAutoScript(),
      vitePluginVersion({ env }),
      vitePluginAutoZip({ env })
    ],
    server: {
      open: true,
      port: 8067,
      host: '0.0.0.0',
      hmr: true
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
