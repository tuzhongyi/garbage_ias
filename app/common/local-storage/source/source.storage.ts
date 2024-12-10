import { IStorage } from '../local-storage.model'

interface IMapSourceStorage {
  amap_red: string
  amap_blue: string
  default: string
}

class MapSourceStorage implements IStorage<IMapSourceStorage> {
  key: string = 'map-source'
  get(): IMapSourceStorage {
    let str = localStorage.getItem(this.key)
    if (str) {
      return JSON.parse(str)
    }
    throw new Error('MapSourceStorage not found')
  }
  save(v: IMapSourceStorage): void {
    let str = JSON.stringify(v)
    localStorage.setItem(this.key, str)
  }
  clear(): void {
    localStorage.removeItem(this.key)
  }
}

export class SourceStorage {
  static map = new MapSourceStorage()
}
