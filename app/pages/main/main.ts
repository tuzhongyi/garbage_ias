import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmMainConfirm } from './main-windows/main.confirm'
import { ArmMainWindow } from './main-windows/main.window'
import { ArmMainHtmlController } from './main.html.controller'
import { ArmMainMessage } from './main.message'

export namespace ArmMain {
  export class Controller {
    private html = new ArmMainHtmlController()
    client = new HowellHttpClient.HttpClient()

    private window = new ArmMainWindow()
    confirm = new ArmMainConfirm()
    private message = new ArmMainMessage(
      this.html.element.iframe,
      this.window,
      this.confirm
    )
    constructor() {
      this.regist()
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
