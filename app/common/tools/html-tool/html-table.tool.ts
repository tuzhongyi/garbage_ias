import { HTMLTableElementColgroupTool } from './html-table-colgroup.tool'
import { HTMLTableElementSortTool, Sort } from './html-table-sort.tool'
import { HtmlTool } from './html.tool'

export class HTMLTableElementTool {
  private _sort = new HTMLTableElementSortTool()

  colgroup = new HTMLTableElementColgroupTool()

  private row(
    item: string[],
    operations?: {
      inner: string
      id?: string
      title?: string
      click: (args: { e: MouseEvent; button: HTMLElement }) => void
    }[]
  ) {
    let row = document.createElement('tr')
    for (let i = 0; i < item.length; i++) {
      let td = document.createElement('td')
      td.innerText = item[i]

      td.title = item[i]
      row.appendChild(td)
    }

    if (operations) {
      let td = document.createElement('td')
      let operation = document.createElement('div')
      operation.className = 'operation'
      for (let i = 0; i < operations.length; i++) {
        let opt = operations[i]
        let btn = document.createElement('div')
        btn.title = opt.title ?? ''

        btn.className = 'button-icon'
        btn.innerHTML = opt.inner
        if (opt.id) {
          btn.id = opt.id
        }
        btn.addEventListener('click', (e) => {
          let button = HtmlTool.element.findelement(
            e.target as HTMLElement,
            'button-icon'
          ) as HTMLElement
          opt.click({
            e: e,
            button: button,
          })
        })
        operation.appendChild(btn)
      }
      td.appendChild(operation)
      row.appendChild(td)
    }
    return row
  }

  insert(
    tbody: HTMLTableSectionElement,
    item: string[],
    operations?: {
      inner: string
      id?: string
      title?: string
      click: (args: { e: MouseEvent; button: HTMLElement }) => void
    }[]
  ) {
    let row = this.row(item, operations)
    if (tbody.firstChild) {
      tbody.insertBefore(row, tbody.firstChild)
    } else {
      tbody.appendChild(row)
    }
    return row
  }

  append(
    tbody: HTMLTableSectionElement,
    item: string[],
    operations?: {
      inner: string
      id?: string
      title?: string
      click: (args: { e: MouseEvent; button: HTMLElement }) => void
    }[]
  ) {
    let row = this.row(item, operations)
    tbody.appendChild(row)
    return row
  }

  checkall(
    checkbox: HTMLInputElement,
    tbody: HTMLTableSectionElement,
    callback?: (ids: string[], checked: boolean) => void
  ) {
    checkbox.addEventListener('change', (e) => {
      let checkall = e.target as HTMLInputElement
      let ids: string[] = []
      tbody.querySelectorAll('input[type="checkbox"]').forEach((x) => {
        let checkbox = x as HTMLInputElement
        checkbox.checked = checkall.checked
        ids.push(checkbox.id)
      })
      if (callback) {
        callback(ids, checkall.checked)
      }
    })
  }

  sort(thead: HTMLTableSectionElement, callback?: (args: Sort) => void) {
    this._sort.sort(thead, callback)
  }
}
