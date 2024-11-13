import { IStorage } from './local-storage.model'

export class LogoutStorage implements IStorage<Date | undefined> {
  key: string = 'logout'
  get(): Date | undefined {
    let str = localStorage.getItem(this.key)
    if (str) {
      return new Date(str)
    }
    return undefined
  }
  save(v: Date): void {
    let str = v.toISOString()
    localStorage.setItem(this.key, str)
  }
  clear(): void {
    localStorage.removeItem(this.key)
  }
}
