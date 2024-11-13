import { EventEmitter } from '../../common/event-emitter'
import { SSH } from '../../data-core/models/arm/ssh.model'
import { NetworkConfigSSHEvent } from './network-config-ssh.event'

import './network-config-ssh.less'

export class NetworkConfigSSHHtmlController {
  event: EventEmitter<NetworkConfigSSHEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private element = {
    Enabled: document.getElementById('Enabled') as HTMLSelectElement,
    save: document.getElementById('save') as HTMLButtonElement,
  }
  private regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }
  load(data: SSH) {
    this.element.Enabled.value = JSON.stringify(data.Enabled)
  }
  get(data: SSH) {
    data.Enabled = JSON.parse(this.element.Enabled.value)
    return data
  }
}
