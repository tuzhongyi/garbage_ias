import { IStorage } from './local-storage.model'

export interface ILogin {
  username: string
  token?: string
}

export class LoginStorage implements IStorage<ILogin | undefined> {
  key: string = 'login'
  get(): ILogin | undefined {
    let item = localStorage.getItem(this.key)
    if (item) {
      return JSON.parse(item)
    }
    return undefined
  }
  save(v: ILogin): void {
    localStorage.setItem(this.key, JSON.stringify(v))
  }

  clear() {
    localStorage.removeItem(this.key)
  }
}
