import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { VideoSourceDescriptor } from '../../data-core/models/arm/video-source-descriptor.model'
import '../window/window.less'
import { DeviceChannelDiscoverConfirmController } from './controller/device-channel-discover.confirm.controller'
import { DeviceChannelDiscoverTableController } from './controller/device-channel-discover.table.controller'
import { DeviceChannelDiscoverEvent } from './device-channel-discover.event'
import './device-channel-discover.less'
export class DeviceChannelDiscoverHtmlController {
  private element = {
    loading: document.getElementById('loading') as HTMLDivElement,
    search: {
      text: document.getElementById('search_text') as HTMLInputElement,
      button: document.getElementById('search_button') as HTMLButtonElement,
    },
    button: {
      refresh: document.getElementById('btn_refresh') as HTMLButtonElement,
      // password: document.getElementById('btn_password') as HTMLButtonElement,
      ok: document.getElementById('btn_ok') as HTMLButtonElement,
      cancel: document.getElementById('btn_cancel') as HTMLButtonElement,
    },
  }

  event: EventEmitter<DeviceChannelDiscoverEvent> = new EventEmitter()
  table = new DeviceChannelDiscoverTableController()
  confirm = new DeviceChannelDiscoverConfirmController()

  public get loading(): boolean {
    return this.element.loading.style.display !== 'none'
  }
  public set loading(v: boolean) {
    this.table.show = !v
    this.element.loading.style.display = v ? '' : 'none'
  }

  public get selecteds() {
    return this.table.selecteds
  }

  constructor() {
    this.init()
    this.regist()
  }

  init() {}

  regist() {
    this.element.button.refresh.addEventListener('click', () => {
      this.table.clear()
      this.loading = true
      this.event.emit('refresh')
    })
    this.element.button.ok.addEventListener('click', () => {
      if (this.table.selecteds.length > 0) {
        this.confirm.show = true
        let first = this.table.selecteds[0]
        this.confirm.load(first.UserName, first.Password)
      }
    })
    this.element.button.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
    this.element.search.button.addEventListener('click', () => {
      this.clear()
      this.event.emit('search', this.element.search.text.value)
    })

    this.confirm.event.on('ok', () => {
      this.event.emit('ok')
    })
    this.table.event.on('select', (selecteds) => {
      this.element.button.ok.disabled = !selecteds || selecteds.length === 0
    })
  }

  load(datas: VideoSourceDescriptor[] = []) {
    this.loading = false
    this.table.load(datas)
  }

  clear() {
    this.table.clear()
  }
}
