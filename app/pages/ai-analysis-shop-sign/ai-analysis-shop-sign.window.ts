import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export class AIAnalysisShopSignWindow {
  confirm = new ConfirmWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  clear() {
    this.id = undefined
  }
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  message: string = ''
  id?: string
}
