import { LocationTool } from '../../common/tools/location.tool'
import { PictureWindowHtmlController } from './window-picture.html.controller'
import { PictureWindowMessage } from './window-picture.message'

export namespace PictureWindow {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new PictureWindowHtmlController()
    private message = new PictureWindowMessage()

    get query() {
      return LocationTool.query.decode(location.search)
    }

    regist() {
      this.html.event.on('close', this.onclose.bind(this))
    }

    init() {
      let title = this.query.title
      let img = this.query.img
      let areas = []
      if (this.query.areas) {
        areas = JSON.parse(this.query.areas)
      }
      this.html.load(title, img, areas)
    }

    onclose() {
      this.message.close()
    }
  }

  const controller = new Controller()
}
