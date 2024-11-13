import { EventEmitter } from '../../common/event-emitter'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { AnalysisTask } from '../../data-core/models/arm/analysis/analysis-task.model'
import { Page } from '../../data-core/models/page-list.model'
import { AIAnalysisTaskListHtmlTableEvent } from './ai-analysis-task-list.event'

declare const $: any
export class AIAnalysisTaskListHtmlTable {
  constructor() {
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  event: EventEmitter<AIAnalysisTaskListHtmlTableEvent> = new EventEmitter()
  private widths = []

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private appendTd(
    tr: HTMLTableRowElement,
    text: string,
    title: string = text
  ) {
    let td = document.createElement('td')
    td.innerText = text
    td.title = title
    tr.appendChild(td)
  }

  private async appendTr(
    tbody: HTMLTableSectionElement,
    data: AnalysisTask,
    index: number
  ) {
    let row = document.createElement('tr')
    this.appendTd(row, (index + 1).toString())
    this.appendTd(row, HtmlTool.set(data.Name, '-'))
    this.appendTd(row, await EnumTool.TaskType(data.TaskType, '-'))
    this.appendTd(row, HtmlTool.set(data.GroupId, '-'))
    this.appendTd(row, await EnumTool.TaskState(data.State, '-'))
    this.appendTd(row, HtmlTool.set(data.Progress, '-'))
    this.appendTd(row, HtmlTool.set(data.StartTime, '-'))
    this.appendTd(row, HtmlTool.set(data.StopTime, '-'))
    tbody.appendChild(row)
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  async load(datas: AnalysisTask[], page: Page) {
    for (let i = 0; i < datas.length; i++) {
      await this.appendTr(this.tbody, datas[i], i)
    }
    $('#pagination').paging({
      pageNum: page.PageIndex, // 当前页面
      totalNum: page.PageCount, // 总页码
      totalList: page.TotalRecordCount, // 记录总数量
      callback: (num: number) => {
        this.event.emit('page', num)
      },
    })
  }
}
