import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { NTPTimeMode } from '../../data-core/enums/ntp-time-mode.enum'
import { NTPServer } from '../../data-core/models/arm/ntp-server.model'
import { SystemTime } from '../../data-core/models/arm/system-time.model'
import { SystemDeviceDatetimeBusiness } from './system-device-datetime.business'
import { SystemDeviceDatetimeHtmlController } from './system-device-datetime.html.controller'
import { SystemDeviceDatetimeMessage } from './system-device-datetime.message'
import { SystemDeviceDatetimeWindow } from './system-device-datetime.window'

export namespace SystemDeviceDatetime {
  class Controller {
    private html = new SystemDeviceDatetimeHtmlController()
    private business = new SystemDeviceDatetimeBusiness()
    private message = new SystemDeviceDatetimeMessage()
    private window = new SystemDeviceDatetimeWindow()
    constructor() {
      this.regist()
      this.load()
    }

    private regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存修改？'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.onsave.bind(this))
    }

    private data?: SystemTime

    private async load() {
      this.business
        .load()
        .then((data) => {
          this.data = data
          this.html.load(this.data)
        })
        .catch((x) => {
          MessageBar.error('系统时间读取失败')
        })
    }

    private onsave() {
      if (this.data) {
        this.data.TimeMode = this.html.element.NTPTimeMode.value as NTPTimeMode
        switch (this.data.TimeMode) {
          case NTPTimeMode.NTP:
            this.data.NTPServer = new NTPServer()
            this.data.NTPServer.HostAddress =
              this.html.element.NTPServer.HostAddress.value
            this.data.NTPServer.PortNo = parseInt(
              this.html.element.NTPServer.PortNo.value
            )
            this.data.NTPServer.SynchronizeInterval = parseInt(
              this.html.element.NTPServer.SynchronizeInterval.value
            )
            break
          case NTPTimeMode.Manual:
            this.data.LocalTime = new Date(
              `${this.html.element.LocalDate.value} ${this.html.element.LocalTime.value}`
            )

            break

          default:
            break
        }
        this.business
          .update(this.data)
          .then((x) => {
            MessageBar.success('操作成功')
            this.load()
          })
          .catch((e) => {
            console.error(e)
            MessageBar.error('操作失败')
          })
      }
    }
  }

  let controller = new Controller()
}
