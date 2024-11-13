import { LocationTool } from '../../common/tools/location.tool'
import { VideoWindowHtmlController } from './window-video.html.controller'
import { VideoWindowMessage } from './window-video.message'

export namespace VideoWindow {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new VideoWindowHtmlController()
    private message = new VideoWindowMessage()

    get query() {
      return LocationTool.query.decode(location.search)
    }

    regist() {
      this.html.event.on('close', this.onclose.bind(this))
    }

    init() {
      let title = this.query.title
      let src = this.query.src
      let areas = []
      if (this.query.areas) {
        areas = JSON.parse(this.query.areas)
      }
      this.html.load(title, src, areas)
    }

    onclose() {
      this.message.close()
    }
  }

  const controller = new Controller()
}
