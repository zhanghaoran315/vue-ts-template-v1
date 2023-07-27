import type { PluginOption } from 'vite'

export default function (): PluginOption {
  return {
    name: 'vite-plugin-auto-script',
    apply: 'build',
    transformIndexHtml(html: string) {
      return html.replace('src="/config.min.js"', 'src="/config.js"')
    },
    closeBundle() {
      console.log('✓ 配置文件替换成功')
    }
  }
}
