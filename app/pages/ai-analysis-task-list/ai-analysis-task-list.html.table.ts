import { EventEmitter } from '../../common/event-emitter'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { AnalysisTask } from '../../data-core/models/arm/analysis/analysis-task.model'
import { Page } from '../../data-core/models/page-list.model'
import { AIAnalysisTaskListHtmlTableEvent } from './ai-analysis-task-list.event'

declare const $: any
export class AIAnalysisTaskListHtmlTable {
  event: EventEmitter<AIAnalysisTaskListHtmlTableEvent> = new EventEmitter()
  constructor() {
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement

  private widths = [
    '60px',
    'auto',
    '150px',
    '100px',
    '100px',
    '100px',
    '200px',
    '200px',
    '100px',
  ]
  private datas: AnalysisTask[] = []

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private async append(data: AnalysisTask, index: number) {
    let items = [
      (index + 1).toString(),
      HtmlTool.set(data.Name, '-'),
      await EnumTool.TaskType(data.TaskType, '-'),
      HtmlTool.set(data.GroupId, '-'),
      await EnumTool.TaskState(data.State, '-'),
      HtmlTool.set(data.Progress, '-'),
      HtmlTool.set(data.StartTime, '-'),
      HtmlTool.set(data.StopTime, '-'),
    ]
    HtmlTool.table.append(this.tbody, items, [
      {
        inner: "<i class='howell-icon-task_misson'></i>",
        id: data.Id,
        click: (args) => {
          let target = args.e.currentTarget as HTMLElement
          let id = target.id
          console.log(this.datas, id)
          let item = this.datas.find((x) => x.Id === id)
          if (item) {
            this.event.emit('record', item)
          }
        },
      },
    ])
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  async load(datas: AnalysisTask[], page: Page) {
    this.datas = datas
    for (let i = 0; i < datas.length; i++) {
      await this.append(datas[i], i)
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
