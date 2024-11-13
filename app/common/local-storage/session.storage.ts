import { IStorage } from './local-storage.model'

export class IDigestSession {
  realm: string = ''
  qop: string = ''
  nonce: string = ''
  opaque: string = '';
  [key: string]: string
}

export class SessionStorage implements IStorage<IDigestSession | undefined> {
  key: string = 'challenge'
  get(): IDigestSession | undefined {
    let item = localStorage.getItem(this.key)
    if (item) {
      return JSON.parse(item)
    }
    return undefined
  }
  save(v: IDigestSession): void {
    localStorage.setItem(this.key, JSON.stringify(v))
  }

  clear() {
    localStorage.removeItem(this.key)
  }
}
