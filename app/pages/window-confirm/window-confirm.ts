import { ConfirmWindowHtmlController } from './window-confirm.html.controller'
import { ConfirmWindowMessage } from './window-confirm.message'

export namespace ConfirmWindow {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new ConfirmWindowHtmlController()
    private message = new ConfirmWindowMessage()

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
      this.message.event.on('confirm_open', (args) => {
        this.html.load(args)
      })
    }

    onok() {
      this.message.confirm_result({
        result: true,
      })
      this.message.confirm_close()
    }
    oncancel() {
      this.message.confirm_close()
    }
  }

  const controller = new Controller()
}
