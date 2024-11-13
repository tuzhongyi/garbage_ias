import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { User } from '../../data-core/models/user/user.model'
import { UserManagerListTableEvent } from './user-manager-list.event'

export class UserManagerListHtmlTable {
  event: EventEmitter<UserManagerListTableEvent> = new EventEmitter()
  private _selecteds: string[] = []
  get selecteds(): User[] {
    return this._selecteds.map((id) => {
      return this.datas.find((x) => x.Id.toString() === id)
    }) as User[]
  }
  constructor() {
    this.regist()
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  private element = {
    thead: {
      checkall: document.getElementById('checkall') as HTMLInputElement,
    },
  }

  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private thead = document.querySelector(
    '#table thead'
  ) as HTMLTableSectionElement

  private widths = [
    '42px',
    '60px',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    '100px',
  ]
  _sort?: Sort
  datas: User[] = []

  private regist() {
    HtmlTool.table.checkall(
      this.element.thead.checkall,
      this.tbody,
      (ids, checked) => {
        if (checked) {
          this._selecteds = ids.map((id) => {
            return id.split('_')[1]
          })
        } else {
          this._selecteds = []
        }
        this.event.emit('select', this.selecteds)
      }
    )
    HtmlTool.table.sort(this.thead, (sort) => {
      this._sort = sort
      this.reload()
    })
  }

  private init() {
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
    td = document.createElement('td')
    let operation = document.createElement('div')
    operation.className = 'operation'
    let btn_modify = document.createElement('div')
    btn_modify.title = `修改`
    btn_modify.className = 'button-icon'
    btn_modify.id = 'modify_' + id
    btn_modify.addEventListener('click', (e: MouseEvent) => {
      this.onmodify(e)
    })
    let i_modify = document.createElement('i')
    i_modify.className = 'howell-icon-modification'
    btn_modify.appendChild(i_modify)
    operation.appendChild(btn_modify)

    td.appendChild(operation)
    row.appendChild(td)

    this.tbody.appendChild(row)
  }

  private onrowclick(e: MouseEvent) {
    let tr = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLTableRowElement
    )
    if (!tr) return
    let id = tr.id.split('_')[1]
    let checkbox = document.querySelector(`#checkbox_${id}`) as HTMLInputElement
    checkbox.checked = !checkbox.checked
    this.select(id, checkbox.checked)
  }

  private select(id: string, checked: boolean) {
    if (checked) {
      if (!this._selecteds.includes(id)) {
        this._selecteds.push(id)
      }
    } else {
      if (this._selecteds.includes(id)) {
        this._selecteds.splice(this._selecteds.indexOf(id), 1)
      }
    }
    this.event.emit('select', this.selecteds)
  }

  private onmodify(e: MouseEvent) {
    e.stopImmediatePropagation()
    let div = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLDivElement
    )
    if (!div) return
    let id = div.id.split('_')[1]
    this.event.emit('modify', id)
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

  clear() {
    this.tbody.innerHTML = ''
    this.element.thead.checkall.checked = false
    this._selecteds = []
    this.event.emit('select', this.selecteds)
  }

  reload() {
    this.clear()
    this.load(this.datas)
  }

  async load(datas: User[]) {
    this.datas = datas
    if (this._sort) {
      this.sort(this._sort)
    }
    for (let i = 0; i < this.datas.length; i++) {
      const item = this.datas[i]
      let priorities = []
      if (item.Priorities) {
        for (let i = 0; i < item.Priorities.length; i++) {
          priorities.push(await EnumTool.PriorityTypes(item.Priorities[i]))
        }
      }
      let values: string[] = [
        `${i + 1}`,
        item.Username,
        item.GroupName,
        priorities.join(', '),
        Language.YesOrNo(item.IsRoot, '-'),
        item.UpdateTime?.format('yyyy-MM-dd HH:mm:ss') ?? '-',
        HtmlTool.set(item.Description, ''),
      ]
      this.append(item.Id.toString(), values)
    }
  }
}
