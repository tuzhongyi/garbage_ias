import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { RunningStatus } from '../../data-core/models/arm/running-status.model'

declare const $: any
export class SystemStatusProcessHtmlTable {
  constructor() {
    this.init()
  }
  table = document.getElementById('table') as HTMLTableElement
  theads = {
    CPUUsage: document.getElementById('head_CPUUsage') as HTMLSpanElement,
    MemoryUsage: document.getElementById('head_MemoryUsage') as HTMLSpanElement,
    NetworkSpeed: document.getElementById(
      'head_NetworkSpeed'
    ) as HTMLSpanElement,
  }

  tbody = document.querySelector('#table tbody') as HTMLTableSectionElement
  thead = document.querySelector('#table thead') as HTMLTableSectionElement

  private widths = ['5%', '15%', '15%', '35%', '15%', '15%']

  private datas: string[][] = []
  private _sort?: Sort

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
    HtmlTool.table.sort(this.thead, (sort) => {
      this._sort = sort
      this.sort(sort)
    })
  }

  private sort(sort: Sort) {
    this.datas = this.datas.sort((a: string[], b: string[]) => {
      let index = parseInt(sort.active)
      return LocaleCompare.compare(a[index], b[index], sort.direction == 'asc')
    })
    this.reload()
  }

  private append(item: string[]) {
    HtmlTool.table.append(this.tbody, item)
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  reload() {
    this.clear()
    for (let i = 0; i < this.datas.length; i++) {
      this.append(this.datas[i])
    }
  }

  async load(data: RunningStatus) {
    this.datas = []
    let radio = 0
    if (data.TotalMemory > 0) {
      radio = (data.MemoryUsage / data.TotalMemory) * 100
    }
    this.theads.MemoryUsage.innerHTML = radio.toFixed(radio === 100 ? 0 : 2)
    this.theads.CPUUsage.innerHTML = data.CPUUsage.toString()
    this.theads.NetworkSpeed.innerHTML = data.NetworkSpeed?.toString() ?? ''
    if (data.Processes) {
      for (let i = 0; i < data.Processes.length; i++) {
        const item = data.Processes[i]
        let values: string[] = [
          item.Id,
          item.CPUUsage?.toString(),
          item.MemoryUsage?.toString(),
          item.Name,
          item.NetworkSpeed?.toString() ?? '',
          await EnumTool.ProcessState(item.State),
        ]
        this.append(values)
        this.datas.push(values)
      }
    }
    if (this._sort) {
      this.sort(this._sort)
    }
  }
}
