import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { IWindowQuery, WindowModel } from '../window/window.model'

export class UserManagerListWindow {
  details = new DetailsWindow()
  confirm = new ConfirmWindow()
}

interface DetailsWindowQuery extends IWindowQuery {
  id?: string
}

class DetailsWindow extends WindowModel<DetailsWindowQuery> {
  clear() {
    this.query.id = undefined
  }
  style = {
    width: '600px',
    height: '382px',
  }
  url: string = '../user-manager-details/user-manager-details.html'
}
class ConfirmWindow extends ConfirmWindowModel {
  clear() {
    this.ids = []
  }
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  ids: string[] = []
}
