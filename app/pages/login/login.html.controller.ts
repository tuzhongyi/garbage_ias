import { EventEmitter } from '../../common/event-emitter'
import { ILoginEvent } from './login.event'
import './login.less'

export class ArmLoginHtmlController {
  element = {
    username: document.querySelector('.login-username') as HTMLInputElement,
    password: document.querySelector('.login-password') as HTMLInputElement,
    submit: document.querySelector('.login-submit') as HTMLDivElement,
  }

  event: EventEmitter<ILoginEvent> = new EventEmitter()

  constructor() {
    this.regist()
    this.init()
  }

  regist() {
    if (this.element.submit) {
      this.element.submit.addEventListener('click', () => {
        this.login()
      })
    }
    window.addEventListener('keypress', (e) => {
      if (e.keyCode == 13) {
        this.login()
      }
    })
  }

  login() {
    if (this.check) {
      this.event.emit('login', {
        username: this.element.username.value,
        password: this.element.password.value,
      })
    }
  }

  init() {}

  get check() {
    if (!this.element.username) {
      return false
    }
    if (!this.element.username.value) {
      return false
    }
    if (!this.element.password) {
      return false
    }
    if (!this.element.password.value) {
      return false
    }
    return true
  }
}
