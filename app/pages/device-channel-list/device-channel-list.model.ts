import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { PictureWindowModel } from '../window-picture/window-picture.model'
import { IWindowQuery, WindowModel } from '../window/window.model'

export class DeviceChannelListWindow {
  details = new DetailsWindow()
  discover = new DiscoverWindow()
  confirm = new ConfirmWindow()
  picture = new PictureWindow()
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
    height: '620px',
  }
  url: string = '../device-channel-details/device-channel-details.html'
}
class DiscoverWindow extends WindowModel {
  style = {
    width: '75%',
    height: '75%',
  }
  url: string = '../device-channel-discover/device-channel-discover.html'
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

class PictureWindow extends PictureWindowModel {
  style = {
    width: '50%',
    height: '50%',
  }
  url: string = '../window-picture/window-picture.html'
}
