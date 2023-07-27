// 自动打包插件
import type { PluginOption } from 'vite'
import { resolve } from 'path';
import compressing from 'compressing';

export default function ({ env }: { env: Record<string, string> }): PluginOption {
  return {
    name: 'vite-plugin-auto-zip',
    apply: 'build',
    closeBundle: async () => {
      await compressing.zip.compressDir(
        resolve(__dirname, '../dist'),
        resolve(__dirname, `../package/${env.VITE_PACKAGE_NAME}.zip`)
      )
      console.log('✓ 压缩打包完成');
    }
  }
}