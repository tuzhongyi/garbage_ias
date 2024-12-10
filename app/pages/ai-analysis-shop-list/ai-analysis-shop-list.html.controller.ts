import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { DateTimePicker } from '../../common/tools/controls/date-time-picker/date-time-picker'
import { DateTimePickerView } from '../../common/tools/controls/date-time-picker/date-time-picker.model'
import { MultiSelectControl } from '../../common/tools/controls/multi-select-control/multi-select-control'
import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { ShopObjectState } from '../../data-core/enums/analysis/shop-object-state.enum'
import { AIAnalysisShopListEvent } from './ai-analysis-shop-list.event'
import { AIAnalysisShopListHtmlTable } from './ai-analysis-shop-list.html.table'
import './ai-analysis-shop-list.less'
import {
  AIAnalysisShopListTableArgs,
  AIAnalysisShopListTableFilter,
} from './ai-analysis-shop-list.model'
export class AIAnalysisShopListHtmlController {
  event: EventEmitter<AIAnalysisShopListEvent> = new EventEmitter()
  table = new AIAnalysisShopListHtmlTable()

  constructor() {
    this.regist()
    this._init()
  }

  private source = {
    states: [
      {
        Id: `${ShopObjectState.Disappeared}`,
        Name: Language.ShopObjectState(ShopObjectState.Disappeared),
      },
      {
        Id: `${ShopObjectState.Created}`,
        Name: Language.ShopObjectState(ShopObjectState.Created),
      },
      {
        Id: `${ShopObjectState.Existed}`,
        Name: Language.ShopObjectState(ShopObjectState.Existed),
      },
    ],
  }

  private element = {
    filter: {
      states: new MultiSelectControl(
        document.getElementById('filter_states') as HTMLDivElement
      ),
      confidence: document.getElementById(
        'filter_confidence'
      ) as HTMLInputElement,
      name: document.getElementById('filter_name') as HTMLInputElement,
      telphone: document.getElementById('filter_telphone') as HTMLInputElement,
      marking: document.getElementById('filter_marking') as HTMLInputElement,

      time: {
        begin: document.getElementById('begin_time') as HTMLInputElement,
        end: document.getElementById('end_time') as HTMLInputElement,
      },
    },
    search: document.getElementById('search') as HTMLButtonElement,
  }
  private inited = false

  private regist() {
    this.element.filter.states.event.on('select', (items) => {
      let states = items.map((x) => parseInt(x.Id))
      this.event.emit('states', states)
    })

    this.element.search.addEventListener('click', () => {
      this.event.emit('search', this.args)
    })
  }

  private get args() {
    let args = new AIAnalysisShopListTableArgs()
    args.name = HtmlTool.get(this.element.filter.name.value)
    args.telphone = HtmlTool.get(this.element.filter.telphone.value)
    args.marking = this.element.filter.marking.checked ? true : undefined
    args.confidence = HtmlTool.get(
      this.element.filter.confidence.value,
      'number'
    )
    return args
  }

  private _init() {
    this.initduration()
    this.initstates()
    this.inited = true
  }

  private initduration() {
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

  private initstates() {
    this.element.filter.states.clear()
    this.element.filter.states.load(this.source.states)
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

  load(filter: AIAnalysisShopListTableFilter) {
    this.element.filter.name.value = HtmlTool.set(filter.name)
    this.element.filter.telphone.value = HtmlTool.set(filter.telphone)
    this.element.filter.marking.checked = filter.marking ?? false
    this.element.filter.confidence.value = HtmlTool.set(filter.confidence)

    let states = this.source.states.filter((x) => {
      return filter.states.includes(parseInt(x.Id))
    })
    this.element.filter.states.select(states)
  }
}
