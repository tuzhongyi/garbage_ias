import { EventEmitter } from '../../../../common/event-emitter'
import { Language } from '../../../../common/language'
import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { SignType } from '../../../../data-core/enums/analysis/sign-type.enum'

interface AIAnalysisTaskResultTableFilterEvent {
  channel(value: string): void
  type(value: number): void
}

export class AIAnalysisTaskResultTableFilterController {
  event = new EventEmitter<AIAnalysisTaskResultTableFilterEvent>()

  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    channel: document.getElementById(
      'table-filter-channel'
    ) as HTMLSelectElement,
    type: document.getElementById('table-filter-type') as HTMLSelectElement,
  }

  private init() {
    this.element.type.innerHTML = ''
    HtmlTool.select.append({ Id: undefined, Name: '全部' }, this.element.type)
    EnumTool.values(SignType).forEach((x) => {
      let model = {
        Id: x,
        Name: Language.SignType(x),
      }
      HtmlTool.select.append(model, this.element.type)
    })
  }

  private regist() {
    this.element.channel.addEventListener('change', (e) => {
      let target = e.currentTarget as HTMLSelectElement
      this.event.emit('channel', target.value)
    })
    this.element.type.addEventListener('change', (e) => {
      let target = e.currentTarget as HTMLSelectElement
      let value: number | undefined = undefined
      if (target.value) {
        value = parseInt(target.value)
      }
      this.event.emit('type', value)
    })
  }
}
