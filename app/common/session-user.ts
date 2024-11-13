import { User } from '../data-core/models/user/user.model'

export class SessionUser {
  constructor() {}

  private readonly key = {
    user: 'User',
    name: 'name',
    password: 'password',
  }

  set User(val: User) {
    localStorage.setItem(this.key.user, JSON.stringify(val))
  }

  get User() {
    const val = localStorage.getItem(this.key.user)

    return JSON.parse(val!)
  }

  set name(val: string | undefined) {
    localStorage.setItem(this.key.name, val ?? '')
  }

  get name() {
    let val = localStorage.getItem(this.key.name)
    if (val) {
      return val
    }
    return undefined
  }

  set pwd(val: string | undefined) {
    localStorage.setItem(this.key.password, val ?? '')
  }

  get pwd() {
    return localStorage.getItem(this.key.password) ?? undefined
  }
}
