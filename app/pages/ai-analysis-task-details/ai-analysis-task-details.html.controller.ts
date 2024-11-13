import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { AnalysisTask } from '../../data-core/models/arm/analysis/analysis-task.model'
import { Manager } from '../../data-core/requests/managers/manager'

import '../window/window.less'
import { AIAnalysisTaskDetailsFileTableController } from './ai-analysis-task-details-file.controller'
import { AIAnalysisTaskDetailsEvent } from './ai-analysis-task-details.event'
import './ai-analysis-task-details.less'

export class AIAnalysisTaskDetailsHtmlController {
  constructor() {
    this.init()
    this.regist()
  }

  event: EventEmitter<AIAnalysisTaskDetailsEvent> = new EventEmitter()

  private element = {
    name: document.getElementById('task_name') as HTMLInputElement,
    type: document.getElementById('task_type') as HTMLSelectElement,
    buttons: {
      ok: document.getElementById('ok') as HTMLButtonElement,
      cancel: document.getElementById('cancel') as HTMLButtonElement,
    },
  }
  file = new AIAnalysisTaskDetailsFileTableController()
  private inited = false

  private init() {
    Manager.capability.analysis
      .then((x) => {
        if (x.TaskTypes) {
          for (let i = 0; i < x.TaskTypes.length; i++) {
            const item = x.TaskTypes[i]
            let model = {
              Id: item.Value,
              Name: item.Name,
            }
            HtmlTool.select.append(model, this.element.type)
          }
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }

  regist() {
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  private _load(data: AnalysisTask) {
    this.element.name.value = HtmlTool.set(data.Name)
  }

  load(data: AnalysisTask) {
    wait(
      () => this.inited,
      () => this._load(data)
    )
  }

  get(): AnalysisTask {
    let data = new AnalysisTask()
    data.Name = this.element.name.value
    data.Files = this.file.get()
    data.TaskType = parseInt(this.element.type.value)

    return data
  }
}
