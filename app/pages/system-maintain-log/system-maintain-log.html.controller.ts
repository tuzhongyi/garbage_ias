import { EventEmitter } from '../../common/event-emitter'
import { DateTimePicker } from '../../common/tools/controls/date-time-picker/date-time-picker'
import { DateTimePickerView } from '../../common/tools/controls/date-time-picker/date-time-picker.model'
import { SystemMaintainLogEvent } from './system-maintain-log.event'
import './system-maintain-log.less'
export class SystemMaintainLogHtmlController {
  event = new EventEmitter<SystemMaintainLogEvent>()
  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    info: document.getElementById('info') as HTMLDivElement,
    filter: {
      date: document.getElementById('date') as HTMLInputElement,
    },
    buttons: {
      search: document.getElementById('search') as HTMLButtonElement,
      download: document.getElementById('download') as HTMLButtonElement,
    },
  }

  private date = new Date()

  private init() {
    this.initDateTimePicker(this.element.filter.date, this.date)
  }

  private initDateTimePicker(element: HTMLInputElement, datetime: Date) {
    let picker = new DateTimePicker(element)
    picker.dateChange = (date: Date) => {
      this.date = new Date(date.getTime())
    }
    picker.format = 'yyyy-MM-dd'
    picker.minView = DateTimePickerView.month
    picker.date = datetime
    picker.init()
  }

  private regist() {
    this.element.buttons.search.addEventListener('click', () => {
      this.event.emit('search', this.date)
    })
    this.element.buttons.download.addEventListener('click', () => {
      this.event.emit('download', this.date)
    })
  }

  clear() {
    this.element.info.innerHTML = ''
  }

  load(data: string) {
    // this.element.info.innerText = data
    let content = data.replace(/\n/g, '<br />')

    this.element.info.innerHTML = content.replace(
      /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d+ \+\d{2}:\d{2} \[\w+\]/g,
      (matching, index) => {
        let status = matching.match(/Information|Warning|Error/) ?? ''
        return `<div class="time ${status[0]}">${matching}</div>`
      }
    )
  }
}
