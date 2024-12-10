import { LocationTool } from '../../common/tools/location.tool'
import { VideoGPSWindowBusiness } from './window-video-gps.business'
import { VideoGPSWindowHtmlController } from './window-video-gps.html.controller'
import { VideoGPSWindowMessage } from './window-video-gps.message'

export namespace VideoGPSWindow {
  class Controller {
    constructor() {
      this.regist()
      this.init()
      this.load()
    }
    private html = new VideoGPSWindowHtmlController()
    private message = new VideoGPSWindowMessage()
    private business = new VideoGPSWindowBusiness()

    get query() {
      return LocationTool.query.decode(location.search)
    }

    regist() {
      this.html.event.on('close', this.onclose.bind(this))
      this.html.event.on('error', (e) => {
        this.message.result({
          index: 0,
          result: false,
          message: e.message,
          inner: true,
        })
      })
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

    load() {
      this.business.load(this.query.title).then((x) => {
        this.html.position.load(x)
      })
    }

    onclose() {
      this.message.close()
    }
  }

  const controller = new Controller()
}
