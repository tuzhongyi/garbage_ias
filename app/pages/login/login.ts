import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { LoginBusiness } from './login.business'
import { ILoginEventArgs } from './login.event'
import { ArmLoginHtmlController } from './login.html.controller'

export namespace ArmLogin {
  class Controller {
    constructor() {
      this.regist()
    }

    private html = new ArmLoginHtmlController()
    private business = new LoginBusiness()

    timeout() {
      const date = LocalStorageService.logout.get()
      if (date) {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        if (diff > 1000 * 60 * 60 * 1) {
          LocalStorageService.navigation.clear()
        }
      }
    }

    regist() {
      this.html.event.on('login', (data: ILoginEventArgs) => {
        this.timeout()
        this.business
          .login(data.username, data.password)
          .then((x) => {
            location.href = '/main/main.html'
          })
          .catch((e) => {
            MessageBar.error('用户名或密码错误')
          })
      })
    }
  }

  const controller = new Controller()
}
