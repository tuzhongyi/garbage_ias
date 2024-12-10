import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DeviceChannelDetailsBusiness } from './device-channel-details.business'
import { DeviceChannelDetailsHtmlController } from './device-channel-details.html.controller'
import { DeviceChannelDetailsMessage } from './device-channel-details.message'

export namespace DeviceChannelDetails {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new DeviceChannelDetailsHtmlController()
    private business = new DeviceChannelDetailsBusiness()
    private message = new DeviceChannelDetailsMessage()
    data?: InputProxyChannel
    async init() {
      if (this.id) {
        this.data = await this.business.load(this.id)
        if (this.data) {
          this.html.load(this.data)
        }
      }
    }

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    check(data: InputProxyChannel) {
      let args = CheckTool.InputProxyChannel(data)
      if (args.result) {
        return true
      }
      this.message.result(args)
      return false
    }

    oncancel() {
      this.message.close()
    }
    onok() {
      if (!this.check(this.html.get())) return
      let promise: Promise<InputProxyChannel>
      if (this.data) {
        promise = this.toupdate(this.data)
      } else {
        promise = this.tocreate()
      }
      promise
        .then((x) => {
          this.message.result({
            index: 0,
            result: true,
          })
          this.message.close()
        })
        .catch((e) => {
          this.message.result({
            index: 0,
            result: false,
          })
        })
    }

    toupdate(data: InputProxyChannel) {
      let _data = this.html.get(data)
      return this.business.update(_data)
    }
    tocreate() {
      let data = this.html.get()

      return this.business.create(data)
    }

    get id() {
      if (location.search.length === 0) return undefined
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }
  }

  const controller = new Controller()
}
