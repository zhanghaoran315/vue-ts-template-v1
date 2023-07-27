// 封装缓存工具
import CONFIG from '@/global';

class HrCache {
  private storage: Storage
  private namespace: string

  constructor(namespace = 'DEMO', isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
    this.namespace = namespace
  }

  private getStorage() {
    return JSON.parse(this.storage.getItem(this.namespace) || '{}')
  }

  setItem(key: string, value: any) {
    if (!value) return

    const stroage = this.getStorage()
    stroage[key] = value
    this.storage.setItem(this.namespace, JSON.stringify(stroage));
  }

  getItem(key: string) {
    return this.getStorage()[key]
  }

  removeItem(key: string) {
    const storage = this.getStorage()
    delete storage[key]

    if (!Object.keys(storage).length) this.clear()
    else this.storage.setItem(this.namespace, JSON.stringify(storage));
  }

  clear() {
    this.storage.removeItem(this.namespace)
  }
}

const localCache = new HrCache(CONFIG.APP_KEY);
const sessionCache = new HrCache(CONFIG.APP_KEY, false)

export { localCache, sessionCache };
