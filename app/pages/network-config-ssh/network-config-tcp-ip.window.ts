import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export class NetworkConfigSSHWindow {
  confirm = new ConfirmWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  message: string = '是否保存SSH配置？'
}
