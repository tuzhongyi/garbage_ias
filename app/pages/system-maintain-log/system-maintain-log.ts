import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { SystemMaintainLogBusiness } from './system-maintain-log.business'
import { SystemMaintainLogHtmlController } from './system-maintain-log.html.controller'

export namespace SystemMaintainLog {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new SystemMaintainLogHtmlController()
    private business = new SystemMaintainLogBusiness()

    private load(date: Date) {
      this.html.clear()
      this.business
        .load(date)
        .then((x) => {
          this.html.load(x)
        })
        .catch((e) => {
          MessageBar.warning('没找到当天日志')
        })
    }

    private regist() {
      this.html.event.on('search', (date) => {
        this.load(date)
      })
      this.html.event.on('download', (date) => {
        this.business.download(date)
      })
    }
  }

  let controller = new Controller()
}
