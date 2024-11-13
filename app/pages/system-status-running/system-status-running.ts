import { SystemStatusRunningBusiness } from './system-status-running.business'
import { SystemStatusRunningHtmlController } from './system-status-running.html.controller'

export namespace SystemStatusRunning {
  class Controller {
    constructor() {
      this.init()
    }
    private html = new SystemStatusRunningHtmlController()
    private business = new SystemStatusRunningBusiness()
    private init() {
      this.business.load().then((status) => {
        this.html.load(status)
      })
    }
  }

  const controller = new Controller()
}
