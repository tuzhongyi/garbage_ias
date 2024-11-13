import { IStorage } from './local-storage.model'

export class VideoGPSConfigStorage implements IStorage<boolean> {
  key: string = 'video-gps-config'
  get(): boolean {
    let str = localStorage.getItem(this.key)
    if (str) {
      return JSON.parse(str)
    }
    return false
  }
  save(v: boolean): void {
    let str = JSON.stringify(v)
    localStorage.setItem(this.key, str)
  }
  clear(): void {
    localStorage.removeItem(this.key)
  }
}
