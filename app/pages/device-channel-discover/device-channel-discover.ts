import { VideoSourceDescriptor } from '../../data-core/models/arm/video-source-descriptor.model'
import { DeviceChannelDiscoverBusiness } from './device-channel-discover.business'
import { DeviceChannelDiscoverHtmlController } from './device-channel-discover.html.controller'
import { DeviceChannelDiscoverMessage } from './device-channel-discover.message'

export namespace DeviceChannelDiscover {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceChannelDiscoverHtmlController()
    private business = new DeviceChannelDiscoverBusiness()
    private message = new DeviceChannelDiscoverMessage()
    private datas: VideoSourceDescriptor[] = []

    async load() {
      this.datas = await this.business.load()
      this.html.load(this.datas)
    }

    regist() {
      this.html.event.on('search', (text) => {
        this.onsearch(text)
      })
      this.html.event.on('refresh', () => {
        this.onrefresh()
      })
      this.html.event.on('ok', () => {
        this.onok()
      })
      this.html.event.on('cancel', () => {
        this.oncancel()
      })
    }

    onok() {
      if (this.html.selecteds.length > 0) {
        let datas = this.html.selecteds
        let info = this.html.confirm.get()
        this.business
          .create(datas, info.username, info.password)
          .then((x) => {
            this.message.result({
              result: true,
            })
            this.message.close()
          })
          .catch((e) => {
            this.message.result({ result: false })
          })
      }
    }
    oncancel() {
      this.message.close()
    }
    onrefresh() {
      this.datas = []
      this.html.clear()
      this.load()
    }

    onsearch(text: string) {
      this.html.clear()
      if (text) {
        let datas = this.datas.filter((x) =>
          x.HostAddress.toLowerCase().includes(text.toLowerCase())
        )
        this.html.load(datas)
      } else {
        this.html.load(this.datas)
      }
    }
  }

  let controller = new Controller()
}
