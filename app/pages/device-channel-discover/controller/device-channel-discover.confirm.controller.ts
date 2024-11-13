import { EventEmitter } from '../../../common/event-emitter'

interface DeviceChannelDiscoverConfirmEvent {
  ok(): void
}
export class DeviceChannelDiscoverConfirmController {
  event = new EventEmitter<DeviceChannelDiscoverConfirmEvent>()
  constructor() {
    this.regist()
  }
  private element = {
    mask: document.getElementById('confirm_mask') as HTMLDivElement,
    username: document.getElementById('confirm_username') as HTMLInputElement,
    password: document.getElementById('confirm_password') as HTMLInputElement,

    ok: document.getElementById('btn_confirm_ok') as HTMLButtonElement,
    cancel: document.getElementById('btn_confirm_cancel') as HTMLButtonElement,
  }

  public get show(): boolean {
    return this.element.mask.style.display != 'none'
  }
  public set show(v: boolean) {
    this.element.mask.style.display = v ? '' : 'none'
  }

  private regist() {
    this.element.cancel.addEventListener('click', () => {
      this.show = false
    })
    this.element.ok.addEventListener('click', () => {
      this.show = false
      this.event.emit('ok')
    })
  }

  load(username: string = '', password: string = '') {
    this.element.username.value = username
    this.element.password.value = password
  }

  get() {
    return {
      username: this.element.username.value,
      password: this.element.password.value,
    }
  }
}
