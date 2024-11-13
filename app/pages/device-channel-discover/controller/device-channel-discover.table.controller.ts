import { EventEmitter } from '../../../common/event-emitter'
import { LocaleCompare } from '../../../common/tools/compare-tool/compare.tool'
import { Sort } from '../../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { VideoSourceDescriptor } from '../../../data-core/models/arm/video-source-descriptor.model'

interface DeviceChannelDiscoverTableEvent {
  select(selecteds: string[]): void
}

export class DeviceChannelDiscoverTableController {
  selecteds: VideoSourceDescriptor[] = []
  event = new EventEmitter<DeviceChannelDiscoverTableEvent>()
  constructor() {
    this.regist()
    this.init()
  }

  private table = document.getElementById('table') as HTMLTableElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private thead = document.querySelector(
    '#table thead'
  ) as HTMLTableSectionElement

  private element = {
    thead: {
      checkall: document.getElementById('checkall') as HTMLInputElement,
    },
  }

  public get show(): boolean {
    return (this.table.parentElement as HTMLElement).style.display !== 'none'
  }
  public set show(v: boolean) {
    ;(this.table.parentElement as HTMLElement).style.display = v ? '' : 'none'
  }

  private datas: VideoSourceDescriptor[] = []
  private _sort?: Sort
  private widths = ['42px', '60px', '150px', '100px', '100px']

  private regist() {
    HtmlTool.table.checkall(
      this.element.thead.checkall,
      this.tbody,
      (ids, checked) => {
        if (checked) {
          ids.forEach((id) => {
            let _id = id.split('_')[1]
            this.select(_id, true)
          })
        } else {
          this.selecteds = []
          this.event.emit('select', this.selecteds)
        }
      }
    )
    HtmlTool.table.sort(this.thead, (x) => {
      this._sort = x
      this.reload()
    })
  }

  private init() {
    this.show = false
    this.initColGroup()
    // $(this.table).tablesorter()
  }

  private initColGroup() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private append(id: string, item: string[]) {
    let row = document.createElement('tr')
    row.id = `tr_${id}`
    row.addEventListener('click', (e: MouseEvent) => {
      this.onrowclick(e)
    })
    let td = document.createElement('td')
    let checkbox = document.createElement('input')
    checkbox.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
      let checkbox = e.target as HTMLInputElement
      let id = checkbox.id.split('_')[1]
      this.select(id, checkbox.checked)
    })
    checkbox.type = 'checkbox'
    checkbox.id = 'checkbox_' + id
    td.appendChild(checkbox)
    row.appendChild(td)
    for (let i = 0; i < item.length; i++) {
      let cell = document.createElement('td')
      cell.innerText = item[i]
      cell.title = item[i]
      row.appendChild(cell)
    }

    this.tbody.appendChild(row)
  }

  private onrowclick(e: MouseEvent) {
    let tr = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLTableRowElement
    )
    if (!tr) return
    let id = tr.id.split('_')[1]
    let data = this.datas.find(
      (x) => x.Id.toString() == id
    ) as VideoSourceDescriptor
    let checkbox = document.querySelector(`#checkbox_${id}`) as HTMLInputElement
    checkbox.checked = !checkbox.checked
    this.select(id, checkbox.checked)
  }
  private select(id: string, checked: boolean) {
    let data = this.datas.find(
      (x) => x.Id.toString() == id
    ) as VideoSourceDescriptor
    let index = this.selecteds.findIndex((x) => x.Id.toString() == id)
    if (checked) {
      if (index < 0) {
        this.selecteds.push(data)
      }
    } else {
      if (index >= 0) {
        this.selecteds.splice(index, 1)
      }
    }
    this.event.emit('select', this.selecteds)
  }

  private sort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      return LocaleCompare.compare(
        a[sort.active],
        b[sort.active],
        sort.direction === 'asc'
      )
    })
  }

  reload() {
    this.clear()
    this.load(this.datas)
  }

  clear() {
    this.tbody.innerHTML = ''
    this.selecteds = []
    this.event.emit('select', this.selecteds)
  }

  load(datas: VideoSourceDescriptor[]) {
    this.datas = datas
    if (this._sort) {
      this.sort(this._sort)
    }

    for (let i = 0; i < this.datas.length; i++) {
      const item = this.datas[i]
      let values: string[] = [
        (i + 1).toString(),
        item.HostAddress,
        item.PortNo.toString(),
        item.ChannelNumber.toString(),
        item.DeviceModel ?? '-',
        item.ProtocolType,
        item.SerialNumber ?? '-',
        item.MACAddress ?? '-',
      ]
      this.append(item.Id.toString(), values)
    }
  }
}
