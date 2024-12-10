import '../../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../../common/event-emitter'
import { LocaleCompare } from '../../../common/tools/compare-tool/compare.tool'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { ShopSign } from '../../../data-core/models/arm/analysis/shop-sign.model'
import { Page, Paged } from '../../../data-core/models/page-list.model'

interface AIAnalysisTaskResultTableEvent {
  select(data: Paged<ShopSign>): void
}

export class AIAnalysisTaskResultTableController {
  event = new EventEmitter<AIAnalysisTaskResultTableEvent>()
  page = new Page()
  selected?: ShopSign
  constructor() {
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private thead = document.querySelector(
    '#table thead'
  ) as HTMLTableSectionElement
  private widths = ['60px', 'auto', '80px', '120px']
  datas: ShopSign[] = []

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
    HtmlTool.table.sort(this.thead, (x) => {})
  }

  private async append(data: ShopSign, index: number) {
    let items = [
      (index + 1).toString(),
      HtmlTool.set(data.Text, '-'),
      HtmlTool.set(data.Confidence, '-', { percent: true }),
      HtmlTool.set(data.Time, '-', { format: 'HH:mm:ss.SSS' }),
    ]
    let tr = HtmlTool.table.append(this.tbody, items)
    tr.id = data.Id
    tr.addEventListener('click', (e) => {
      let target = e.currentTarget as HTMLElement
      let id = target.id
      this.select(id)
    })
  }

  reload() {}

  next() {
    let index = this.page.PageIndex + 1
    if (index <= this.page.RecordCount) {
      let data = this.get(index)
      if (data) {
        this.page.PageIndex = index
        this.select(data.Id)
      }
    }
  }
  prev() {
    let index = this.page.PageIndex - 1
    if (index > 0) {
      let data = this.get(index)
      if (data) {
        this.page.PageIndex = index
        this.select(data.Id)
      }
    }
  }

  select(id: string) {
    let selected = this.table.querySelector('.selected') as HTMLElement
    if (selected) {
      selected.classList.remove('selected')
    }
    let current = document.getElementById(id) as HTMLElement
    current.classList.add('selected')
    this.page.PageIndex = HtmlTool.get(current.children[0].innerHTML, 'number')
    this.selected = this.datas.find((x) => x.Id === id)
    if (this.selected) {
      let paged = new Paged<ShopSign>()
      paged.Page = this.page
      paged.Data = this.selected
      this.event.emit('select', paged)
    }
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  load(datas: ShopSign[]) {
    this.datas = datas.sort((a, b) =>
      LocaleCompare.compare(a.Time.getTime(), b.Time.getTime())
    )
    this.clear()
    for (let i = 0; i < datas.length; i++) {
      this.append(datas[i], i)
    }
    this.page = Page.create(1, datas.length)
    if (this.datas.length > 0) {
      this.select(datas[0].Id)
    }
  }

  get(index: number) {
    if (0 < index && index < this.datas.length) {
      return this.datas[index - 1]
    }
    return undefined
  }
}
