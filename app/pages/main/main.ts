import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { LocationTool } from '../../common/tools/location.tool'
import { ArmMainConfirm } from './main-windows/main.confirm'
import { ArmMainWindow } from './main-windows/main.window'
import { ArmMainBusiness } from './main.business'
import { ArmMainHtmlController } from './main.html.controller'
import { ArmMainMessage } from './main.message'

export namespace ArmMain {
  export class Controller {
    private html = new ArmMainHtmlController()
    private business = new ArmMainBusiness()

    private window = new ArmMainWindow()
    confirm = new ArmMainConfirm()
    private message = new ArmMainMessage(
      this.html.element.iframe,
      this.window,
      this.confirm
    )

    get token() {
      if (location.search.length === 0) return undefined
      let querys = LocationTool.query.decode(location.search)
      return querys.token
    }
    get username() {
      if (location.search.length === 0) return undefined
      let querys = LocationTool.query.decode(location.search)
      return querys.username
    }

    constructor() {
      this.init()
      this.regist()
    }
    private init() {
      if ((this.username, this.token)) {
        this.business.login(this.username, this.token)
      }
    }
    regist() {
      this.html.event.on('logout', () => {
        LocalStorageService.login.clear()
        location.href = '/'
      })

      window.addEventListener('beforeunload', () => {
        LocalStorageService.logout.save(new Date())
      })
      window.addEventListener('load', () => {
        let info = LocalStorageService.login.get()
        if (info) {
          this.html.load(info.username)
        }
      })
    }
  }
  const controller = new Controller()
}
