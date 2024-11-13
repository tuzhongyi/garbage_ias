import { SystemStatusProcessBusiness } from './system-status-process.business'
import { SystemStatusProcessHtmlController } from './system-status-process.html.controller'

export namespace SystemStatusProcess {
  class Controller {
    constructor() {
      this.load()
    }
    private html = new SystemStatusProcessHtmlController()
    private business = new SystemStatusProcessBusiness()
    private load() {
      this.loading()
      setTimeout(() => {
        this.load()
      }, 1000 * 5)
    }

    private loading() {
      return this.business.load().then((status) => {
        this.html.element.table.clear()
        this.html.element.table.load(status)
      })
    }
  }

  let controller = new Controller()
}
