import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { DeviceInfo } from '../../data-core/models/arm/device-info.model'
import { SystemDeviceInfoBusiness } from './system-device-info.business'
import { SystemDeviceInfoHtmlController } from './system-device-info.html.controller'
import { SystemDeviceInfoMessage } from './system-device-info.message'
import { SystemDeviceInfoWindow } from './system-device-info.window'

export namespace SystemDeviceInfo {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new SystemDeviceInfoHtmlController()
    private business = new SystemDeviceInfoBusiness()
    private message = new SystemDeviceInfoMessage()
    private window = new SystemDeviceInfoWindow()
    private data?: DeviceInfo

    private async load() {
      try {
        this.data = await this.business.load()
        this.html.load(this.data)
      } catch (error) {
        MessageBar.error('设备信息读取失败')
      }
    }

    private regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存设备信息?'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.save.bind(this))
    }

    private save() {
      if (this.data) {
        this.data.Name = this.html.element.Name.value
        this.data.CustomizedInfo = this.html.element.CustomizedInfo.value
        this.business
          .update(this.data)
          .then((x) => {
            MessageBar.success('保存成功')
            this.load()
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }
  }

  const controller = new Controller()
}
