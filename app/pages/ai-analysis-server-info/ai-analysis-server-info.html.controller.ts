import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { AnalysisServer } from '../../data-core/models/arm/analysis/analysis-server.model'

import './ai-analysis-server-info.less'

interface AIAnalysisServerInfoEvent {
  save(): void
}

export class AIAnalysisServerInfoHtmlController {
  event = new EventEmitter<AIAnalysisServerInfoEvent>()
  constructor() {
    this.regist()
  }
  private element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    IPAddress: document.getElementById('IPAddress') as HTMLInputElement,
    Port: document.getElementById('Port') as HTMLInputElement,
    Username: document.getElementById('Username') as HTMLInputElement,
    Password: document.getElementById('Password') as HTMLInputElement,
    ProtocolType: document.getElementById('ProtocolType') as HTMLSelectElement,
    Interval: document.getElementById('Interval') as HTMLInputElement,
    Status: document.getElementById('Status') as HTMLInputElement,
    EventDest: document.getElementById('EventDest') as HTMLInputElement,

    save: document.getElementById('save') as HTMLButtonElement,
  }

  private data?: AnalysisServer

  private regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
    HtmlTool.input.number.mousewheelchangevalue(this.element.Port, (value) => {
      this.element.Port.value = value.toString()
    })
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.Interval,
      (value) => {
        this.element.Interval.value = value.toString()
      }
    )
  }

  load(data: AnalysisServer) {
    this.data = data
    this.element.Name.value = HtmlTool.set(data.Name)
    this.element.IPAddress.value = HtmlTool.set(data.IPAddress)
    this.element.Port.value = HtmlTool.set(data.Port)
    this.element.Username.value = HtmlTool.set(data.Username)
    this.element.Password.value = HtmlTool.set(data.Password)
    this.element.ProtocolType.value = HtmlTool.set(data.ProtocolType)
    this.element.Interval.value = HtmlTool.set(data.Interval)
    this.element.Status.value = data.Status === 0 ? '正常' : '离线'
    this.element.EventDest.value = HtmlTool.set(data.EventDest)
  }

  get() {
    if (!this.data) {
      this.data = new AnalysisServer()
    }
    this.data.Name = HtmlTool.get(this.element.Name.value)
    this.data.IPAddress = this.element.IPAddress.value
    this.data.Port = parseInt(this.element.Port.value)
    this.data.Username = HtmlTool.get(this.element.Username.value)
    this.data.Password = HtmlTool.get(this.element.Password.value)
    this.data.ProtocolType = HtmlTool.get(this.element.ProtocolType.value)
    this.data.Interval = parseInt(this.element.Interval.value)
    this.data.EventDest = HtmlTool.get(this.element.EventDest.value)
    return this.data
  }
}
