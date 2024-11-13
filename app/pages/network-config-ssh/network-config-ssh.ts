import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { SSH } from '../../data-core/models/arm/ssh.model'
import { NetworkConfigSSHBusiness } from './network-config-ssh.business'
import { NetworkConfigSSHHtmlController } from './network-config-ssh.html.controller'
import { NetworkConfigSSHMessage } from './network-config-ssh.message'
import { NetworkConfigSSHWindow } from './network-config-tcp-ip.window'

export namespace NetworkConfigSSH {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new NetworkConfigSSHHtmlController()
    private business = new NetworkConfigSSHBusiness()
    private message = new NetworkConfigSSHMessage()
    private window = new NetworkConfigSSHWindow()

    data?: SSH

    async load() {
      this.data = await this.business.load()
      this.html.load(this.data)
    }

    regist() {
      this.html.event.on('save', () => {
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.onsave.bind(this))
    }

    onsave() {
      if (this.data) {
        this.data = this.html.get(this.data)
        this.business
          .update(this.data)
          .then((x) => {
            MessageBar.success('操作成功')
          })
          .catch((e) => {
            MessageBar.error('操作失败')
          })
      }
    }
  }

  const controller = new Controller()
}
