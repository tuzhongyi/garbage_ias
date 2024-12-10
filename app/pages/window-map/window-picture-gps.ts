import { LocationTool } from '../../common/tools/location.tool'
import { GisPoint } from '../../data-core/models/arm/gis-point.model'
import { PictureGPSWindowHtmlController } from './window-picture-gps.html.controller'
import { PictureGPSWindowMessage } from './window-picture-gps.message'

export namespace PictureGPSWindow {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new PictureGPSWindowHtmlController()
    private message = new PictureGPSWindowMessage()

    get query() {
      return LocationTool.query.decode(location.search)
    }

    regist() {
      this.html.event.on('close', this.onclose.bind(this))
    }

    init() {
      let title = this.query.title
      let img = this.query.img
      let point = new GisPoint()

      if (this.query.location) {
        point = JSON.parse(this.query.location)
      }
      let areas = []
      if (this.query.areas) {
        areas = JSON.parse(this.query.areas)
      }
      this.html.load(title, img, point, areas)
    }

    onclose() {
      this.message.close()
    }
  }

  const controller = new Controller()
}
