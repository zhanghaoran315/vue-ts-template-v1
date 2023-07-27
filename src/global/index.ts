import { crypto } from '@/utils/crypto'


let CONFIG = window.CONFIG

if (import.meta.env.PROD) {
  CONFIG = JSON.parse(crypto.decryptByDES(window.CONFIG))

  console.log('生产环境的配置：', CONFIG);
}


export default CONFIG