import { IStorage } from './local-storage.model'

export class NavigationNetworkFrpStorage implements IStorage<number> {
  key: string = 'navigation_network_frp'
  get(): number {
    let plain = localStorage.getItem(this.key)
    let index = 0
    if (plain) {
      index = parseInt(plain)
    }
    return index
  }
  clear() {
    localStorage.removeItem(this.key)
  }
  save(v: number): void {
    localStorage.setItem(this.key, v.toString())
  }
}
