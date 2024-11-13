import { Manager } from '../../data-core/requests/managers/manager'

export class SystemDeviceIndexCapability {
  constructor() {
    this.init()
  }
  private element = {
    NTPServer: document.getElementsByName('Capability.NTPServer'),
  }

  private inited = false

  private init() {
    Manager.capability.device
      .then((x) => {
        if (!x.NTPServer) {
          this.element.NTPServer.forEach((item) => {
            item.style.display = 'none'
          })
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }
}
