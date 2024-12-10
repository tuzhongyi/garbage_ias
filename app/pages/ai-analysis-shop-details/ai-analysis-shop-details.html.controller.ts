import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { Shop } from '../../data-core/models/arm/analysis/shop.model'
import { GisPoint } from '../../data-core/models/arm/gis-point.model'

import '../window/window.less'
import { AIAnalysisShopDetailsEvent } from './ai-analysis-shop-details.event'
import './ai-analysis-shop-details.less'
import { AIAnalysisShopDetailsMapController } from './controller/ai-analysis-shop-details-map.controller'

export class AIAnalysisShopDetailsHtmlController {
  event: EventEmitter<AIAnalysisShopDetailsEvent> = new EventEmitter()
  map = new AIAnalysisShopDetailsMapController()

  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    BranchName: document.getElementById('BranchName') as HTMLInputElement,
    Address: document.getElementById('Address') as HTMLInputElement,
    Telphone: document.getElementById('Telphone') as HTMLInputElement,

    Locked: document.getElementById('Locked') as HTMLInputElement,
    Marking: document.getElementById('Marking') as HTMLInputElement,
    BeginTime: document.getElementById('BeginTime') as HTMLInputElement,
    EndTime: document.getElementById('EndTime') as HTMLInputElement,
    Location: {
      Longitude: document.getElementById('Longitude') as HTMLInputElement,
      Latitude: document.getElementById('Latitude') as HTMLInputElement,
    },
    buttons: {
      ok: document.getElementById('ok') as HTMLButtonElement,
      cancel: document.getElementById('cancel') as HTMLButtonElement,
    },
  }
  private inited = false

  init() {
    this.inited = true
  }

  regist() {
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
    this.map.event.on('dragging', (position) => {
      this.element.Location.Longitude.value = HtmlTool.set(position[0])
      this.element.Location.Latitude.value = HtmlTool.set(position[1])
    })
    this.map.event.on('dragend', (position) => {
      this.element.Location.Longitude.value = HtmlTool.set(position[0])
      this.element.Location.Latitude.value = HtmlTool.set(position[1])
    })
  }

  private _load(data: Shop) {
    this.element.Name.value = data.Name
    this.element.BranchName.value = HtmlTool.set(data.BranchName)
    this.element.Address.value = HtmlTool.set(data.Address)
    this.element.Telphone.value = HtmlTool.set(data.Telphone)

    this.element.Locked.checked = data.Locked ?? false
    this.element.Marking.checked = data.Marking ?? false
    this.element.BeginTime.value = data.BeginTime.format('yyyy-MM-dd HH:mm:ss')
    this.element.EndTime.value = data.EndTime.format('yyyy-MM-dd HH:mm:ss')

    if (data.Location) {
      this.map.load(data.Location)
      this.element.Location.Longitude.value = HtmlTool.set(
        data.Location.Longitude
      )
      this.element.Location.Latitude.value = HtmlTool.set(
        data.Location.Latitude
      )
    }
  }

  load(data: Shop) {
    wait(
      () => this.inited,
      () => this._load(data)
    )
  }

  get(data: Shop): Shop {
    data.Name = HtmlTool.get(this.element.Name.value)
    data.BranchName = HtmlTool.get(this.element.BranchName.value)
    data.Address = HtmlTool.get(this.element.Address.value)
    data.Telphone = HtmlTool.get(this.element.Telphone.value)
    let lon = parseFloat(this.element.Location.Longitude.value)
    let lat = parseFloat(this.element.Location.Latitude.value)
    if (!(isNaN(lon) || isNaN(lat))) {
      let _position = gcj02towgs84(lon, lat)
      if (!data.Location) {
        data.Location = new GisPoint()
      }
      data.Location.Longitude = _position[0]
      data.Location.Latitude = _position[1]
    }
    data.Locked = this.element.Locked.checked
    data.Marking = this.element.Marking.checked

    return data
  }
}
