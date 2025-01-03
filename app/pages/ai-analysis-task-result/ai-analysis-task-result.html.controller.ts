import '../window/window.less'
import './less/ai-analysis-task-result.less'

import { EventEmitter } from '../../common/event-emitter'
import { AIAnalysisTaskResultEvent } from './ai-analysis-task-result.event'

import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { AnalysisTask } from '../../data-core/models/arm/analysis/analysis-task.model'
import { Manager } from '../../data-core/requests/managers/manager'
import { AIAnalysisTaskResultInfoController } from './controller/info/ai-analysis-task-result-info.controller'
import { AIAnalysisTaskResultMapController } from './controller/map/ai-analysis-task-result-map.controller'
import { AIAnalysisTaskResultTableController } from './controller/table/ai-analysis-task-result-table.controller'

export class AIAnalysisTaskResultHtmlController {
  event: EventEmitter<AIAnalysisTaskResultEvent> = new EventEmitter()

  table = new AIAnalysisTaskResultTableController()
  map = new AIAnalysisTaskResultMapController()
  info = new AIAnalysisTaskResultInfoController()

  constructor() {
    this.init()
    this.regist()
  }
  private inited = false
  private element = {
    name: document.getElementById('task_name') as HTMLInputElement,
    type: document.getElementById('task_type') as HTMLSelectElement,
    close: document.getElementById('close') as HTMLButtonElement,
  }

  private async init() {
    Manager.capability.analysis
      .then((x) => {
        if (x.TaskTypes) {
          x.TaskTypes.forEach((item) => {
            HtmlTool.select.append(item, this.element.type)
          })
        }
      })
      .finally(() => {
        this.inited = true
      })
  }

  private regist() {
    this.element.close.addEventListener('click', () => {
      this.event.emit('close')
    })
    this.table.event.on('select', (paged) => {
      this.info.load(paged)
      this.map.select(paged.Data.Id)
    })
    this.info.event.on('prev', () => {
      this.table.prev()
    })
    this.info.event.on('next', () => {
      this.table.next()
    })
  }

  private async _load(data: AnalysisTask) {
    this.element.name.value = HtmlTool.set(data.Name)
    this.element.type.value = `${data.TaskType}`
  }

  load(data: AnalysisTask) {
    wait(
      () => {
        return this.inited
      },
      () => {
        this._load(data)
      }
    )
  }
}
