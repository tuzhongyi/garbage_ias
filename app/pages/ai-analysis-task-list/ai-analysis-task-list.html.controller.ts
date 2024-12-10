import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { DateTimePicker } from '../../common/tools/controls/date-time-picker/date-time-picker'
import { DateTimePickerView } from '../../common/tools/controls/date-time-picker/date-time-picker.model'
import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { Manager } from '../../data-core/requests/managers/manager'
import { AIAnalysisTaskListEvent } from './ai-analysis-task-list.event'
import { AIAnalysisTaskListHtmlTable } from './ai-analysis-task-list.html.table'
import './ai-analysis-task-list.less'
export class AIAnalysisTaskListHtmlController {
  event: EventEmitter<AIAnalysisTaskListEvent> = new EventEmitter()

  constructor() {
    this.regist()
    this.init()
  }

  private element = {
    filter: {
      time: {
        begin: document.getElementById('begin_time') as HTMLInputElement,
        end: document.getElementById('end_time') as HTMLInputElement,
      },
      type: document.getElementById('task_type') as HTMLSelectElement,
      state: document.getElementById('task_state') as HTMLSelectElement,
      name: document.getElementById('task_name') as HTMLInputElement,
    },
    search: document.getElementById('search') as HTMLButtonElement,
    create: document.getElementById('create') as HTMLButtonElement,
  }
  private inited = {
    type: false,
    state: false,
  }

  table = new AIAnalysisTaskListHtmlTable()

  private regist() {
    this.element.filter.type.addEventListener('change', () => {
      let value: number | undefined = undefined
      if (this.element.filter.type.value) {
        value = parseInt(this.element.filter.type.value)
      }
      this.event.emit('type', value)
    })
    this.element.filter.state.addEventListener('change', () => {
      let value: number | undefined = undefined
      if (this.element.filter.type.value) {
        value = parseInt(this.element.filter.type.value)
      }
      this.event.emit('state', value)
    })
    this.element.search.addEventListener('click', () => {
      let value = this.element.filter.name.value
        ? this.element.filter.name.value
        : undefined
      this.event.emit('search', value)
    })
    this.element.create.addEventListener('click', () => {
      this.event.emit('create')
    })
  }

  private init() {
    this.initDuration()
    this.initFilter()
  }

  private initDuration() {
    let duration = DateTimeTool.allYear(new Date())
    let begin = this.initDateTimePicker(
      this.element.filter.time.begin,
      duration.begin
    )
    begin.dateChange = (date) => {
      this.event.emit('begin', date)
    }
    let end = this.initDateTimePicker(
      this.element.filter.time.end,
      duration.end
    )
    end.dateChange = (date) => {
      this.event.emit('end', date)
    }
  }

  private initFilter() {
    Manager.capability.analysis
      .then((x) => {
        if (x.TaskTypes) {
          if (x.TaskTypes.length > 1) {
            HtmlTool.select.append(
              {
                Id: '',
                Name: '全部',
              },
              this.element.filter.type
            )
          }
          for (let i = 0; i < x.TaskTypes.length; i++) {
            const item = x.TaskTypes[i]
            let model = {
              Id: item.Value,
              Name: item.Name,
            }
            HtmlTool.select.append(model, this.element.filter.type)
          }
        }
        this.inited.type = true
        if (x.TaskStates) {
          HtmlTool.select.append(
            {
              Id: '',
              Name: '全部',
            },
            this.element.filter.state
          )
          for (let i = 0; i < x.TaskStates.length; i++) {
            const item = x.TaskStates[i]
            let model = {
              Id: item.Value,
              Name: item.Name,
            }
            HtmlTool.select.append(model, this.element.filter.state)
          }
        }
        this.inited.state = true
      })
      .catch(() => {
        this.inited.type = true
        this.inited.state = true
      })
  }

  private initDateTimePicker(element: HTMLInputElement, datetime: Date) {
    let picker = new DateTimePicker(element)
    picker.format = 'yyyy-MM-dd HH:mm:ss'
    picker.minView = DateTimePickerView.hour
    picker.date = datetime
    picker.startView
    picker.init()
    return picker
  }
}
