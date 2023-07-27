// 自动打印版本信息插件
import type { PluginOption } from 'vite'
import child from 'child_process';

const exec = child.execSync

export default function ({ env }: { env: Record<string, string> }): PluginOption {
  const operator = exec('git config user.name').toString().trim() || '';
  const date = new Date();
  const y = date.getFullYear();
  const M = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');

  return {
    name: 'vite-plugin-version',
    apply: 'build',
    transformIndexHtml(html) {
      const buildInfoStr = `
        <script>
          console.group('%c┏ ---------------------------------', 'color: cornflowerblue;font-size:10px');
          console.log('%c【项目名称】:', 'color: dodgerblue;font-size:12px', '${env.VITE_APP_NAME_CN}');
          console.log('%c【当前版本】:', 'color: dodgerblue;font-size:12px', 'v0.1.${M}.${d}');
          console.log('%c【打包时间】:', 'color: dodgerblue;font-size:12px', '${y}-${M}-${d} ${h}:${m}:${s}');
          console.log('%c【打包人员】:', 'color: dodgerblue;font-size:12px', '@${operator}');
          console.log('%c--------------------------------- ┛', 'color: cornflowerblue;font-size:10px');
          console.groupEnd();
        </script>
      `;
      return html.replace('</html>', buildInfoStr + '</html>');
    },
    closeBundle() {
      console.log('✓ 版本信息已更新');
    }
  }
}