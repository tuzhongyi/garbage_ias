import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { Shop } from '../../data-core/models/arm/analysis/shop.model'
import { Page } from '../../data-core/models/page-list.model'
import { AIAnalysisShopListHtmlTableEvent } from './ai-analysis-shop-list.event'

declare const $: any
export class AIAnalysisShopListHtmlTable {
  event = new EventEmitter<AIAnalysisShopListHtmlTableEvent>()
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
  private widths = [
    '60px',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    '168px',
    '168px',
    '100px',
  ]

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
    HtmlTool.table.sort(this.thead, (x) => {
      if (x.direction === 'asc') {
        this.event.emit('asc', x.active)
      } else if (x.direction === 'desc') {
        this.event.emit('desc', x.active)
      } else {
      }
    })
  }

  private async append(data: Shop, index: number) {
    let items = [
      (index + 1).toString(),
      HtmlTool.set(data.Name, '-'),
      HtmlTool.set(data.Address, '-'),
      HtmlTool.set(data.Telphone, '-'),
      HtmlTool.set(data.Confidence, '-', { percent: true }),
      Language.ShopObjectState(data.ObjectState, '-'),
      HtmlTool.set(data.BeginTime, '-'),
      HtmlTool.set(data.EndTime, '-'),
      Language.YesOrNo(data.Locked, '-'),
    ]
    HtmlTool.table.append(this.tbody, items, [
      {
        inner: '<i class="howell-icon-task_misson"></i>',
        title: '查看分析记录',
        id: data.Id,
        click: (args) => {
          let e = args.e as MouseEvent
          let target = args.e.currentTarget as HTMLElement

          let item = data
          if (item) {
            this.event.emit('record', item)
          }
        },
      },
      {
        inner: '<i class="howell-icon-modification"></i>',
        title: '编辑',
        id: data.Id,
        click: (args) => {
          let e = args.e as MouseEvent
          let target = args.e.currentTarget as HTMLElement

          let item = data
          if (item) {
            this.event.emit('details', item)
          }
        },
      },
    ])
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  async load(datas: Shop[], page: Page) {
    let begin = page.PageSize * (page.PageIndex - 1)
    for (let i = 0; i < datas.length; i++) {
      await this.append(datas[i], begin + i)
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
