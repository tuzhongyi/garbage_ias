import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DeviceChannelListBusiness } from './business/device-channel-list.business'
import { DeviceChannelListHtmlController } from './device-channel-list.html.controller'
import { DeviceChannelListMessage } from './device-channel-list.message'
import { DeviceChannelListWindow } from './device-channel-list.model'

export namespace DeviceChannelList {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    private html = new DeviceChannelListHtmlController()
    private business = new DeviceChannelListBusiness()
    private message = new DeviceChannelListMessage()
    private window = new DeviceChannelListWindow()
    datas: InputProxyChannel[] = []

    async load() {
      this.datas = await this.business.load()
      this.html.table.clear()
      this.html.table.load(this.datas)
    }

    regist() {
      this.html.table.event.on('modify', this.onmodify.bind(this))
      this.html.table.event.on('picture', this.onpicture.bind(this))

      this.html.event.on('create', this.oncreate.bind(this))
      this.html.event.on('search', this.onsearch.bind(this))
      this.html.event.on('discover', this.ondiscover.bind(this))
      this.message.event.on('load', this.load.bind(this))

      this.html.event.on('delete', this.ondelete.bind(this))
      this.message.event.on('delete', this.todelete.bind(this))

      this.html.event.on('recordstart', this.onrecordstart.bind(this))
      this.message.event.on('recordstart', this.torecordstart.bind(this))

      this.html.event.on('recordstop', this.onrecordstop.bind(this))
      this.message.event.on('recordstop', this.torecordstop.bind(this))
    }
    ondiscover() {
      this.message.discover(this.window.discover)
    }
    oncreate() {
      this.window.details.clear()
      this.message.create(this.window.details)
    }
    onmodify(id: string) {
      this.window.details.query.id = id
      this.message.modify(this.window.details)
    }

    async onpicture(id: string) {
      let channel = this.datas.find((x) => x.Id.toString() === id)
      if (channel) {
        this.window.picture.query.title = channel.Name
      }
      this.window.picture.query.img = this.business.picture(id)
      let height = window.innerHeight * 0.7
      let size = await HtmlTool.img.size(this.window.picture.query.img)
      let ratio = size.width / size.height
      let width = height * ratio
      this.window.picture.style.width = `${width}px`
      this.window.picture.style.height = `${height + 50}px`
      this.message.picture(this.window.picture)
    }
    onrecordstart(ids: string[]) {
      this.window.confirm.ids = ids
      this.window.confirm.message = `确定要开始录像吗?`
      this.message.record_start_confirm(this.window.confirm)
    }
    onrecordstop(ids: string[]) {
      this.window.confirm.ids = ids
      this.window.confirm.message = `确定要停止录像吗?`
      this.message.record_stop_confirm(this.window.confirm)
    }
    ondelete(ids: string[]) {
      this.window.confirm.ids = ids
      this.window.confirm.message = `确定要删除这 ${ids.length} 条记录吗?`
      this.message.delete_confirm(this.window.confirm)
    }
    todelete() {
      if (this.window.confirm.ids.length > 0) {
        this.business
          .delete(this.window.confirm.ids)
          .then((x) => {
            MessageBar.success('操作成功')

            this.datas = this.datas.filter(
              (x) => !this.window.confirm.ids.includes(x.Id.toString())
            )
            this.html.table.clear()
            this.html.table.load(this.datas)
          })
          .catch((e) => {
            MessageBar.error('操作失败')
          })
      }
    }
    torecordstart() {
      if (this.window.confirm.ids.length > 0) {
        let pramise = this.business.record.start(this.window.confirm.ids)
        this.onresult(pramise)
      }
    }
    torecordstop() {
      if (this.window.confirm.ids.length > 0) {
        let promise = this.business.record.stop(this.window.confirm.ids)
        this.onresult(promise)
      }
    }

    onsearch(text: string) {
      this.html.table.clear()
      if (text) {
        let datas = this.datas.filter((x) =>
          x.Name.toLowerCase().includes(text.toLowerCase())
        )
        this.html.table.load(datas)
      } else {
        this.html.table.load(this.datas)
      }
    }

    onresult(promise: Promise<any>) {
      promise
        .then((x) => {
          MessageBar.success('操作成功')
          this.load()
        })
        .catch((e) => {
          MessageBar.error('操作失败')
        })
    }
  }

  let controller = new Controller()
}
