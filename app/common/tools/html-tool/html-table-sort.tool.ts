import { HtmlTool } from './html.tool'

export class HTMLTableElementSortTool {
  private clear(thead: HTMLTableSectionElement, current: HTMLElement) {
    thead.querySelectorAll('th').forEach((th) => {
      let th_sort = th.getAttribute('sort')
      let c_sort = current.getAttribute('sort')
      if (th_sort != c_sort) {
        let span = th.querySelector('.sort-span')
        if (span) {
          th.removeAttribute('direction')
          th.removeChild(span)
        }
      }
    })
  }

  private icon = {
    create: (th: HTMLTableCellElement, icon: string) => {
      let span = document.createElement('span')
      span.className = 'sort-span'
      let i = document.createElement('i')
      i.className = icon
      span.appendChild(i)
      th.appendChild(span)
    },
    set: (th: HTMLTableCellElement, icon: string) => {
      ;(th.querySelector('.sort-span > i') as HTMLElement).className = icon
    },
  }
  sort(thead: HTMLTableSectionElement, callback?: (args: Sort) => void) {
    thead.querySelectorAll('th').forEach((th) => {
      let attr = th.attributes.getNamedItem('sort')
      if (attr) {
        th.classList.add('sort')
        th.addEventListener('click', (e) => {
          let target = HtmlTool.element.findelement(
            e.target as HTMLElement,
            HTMLTableCellElement
          ) as HTMLTableCellElement
          this.clear(thead, target)
          let active = target.getAttribute('sort')
          let direction = (target.getAttribute('direction') ??
            '') as SortDirection
          switch (direction) {
            case 'desc':
              direction = 'asc'
              this.icon.set(target, 'mdi mdi-chevron-up')
              break
            case 'asc':
              direction = 'desc'
              this.icon.set(target, 'mdi mdi-chevron-down')
              break
            default:
              direction = 'desc'
              this.icon.create(th, 'mdi mdi-chevron-down')
              break
          }
          target.setAttribute('direction', direction)

          if (callback && active) {
            callback({
              active: active,
              direction: direction,
            })
          }
        })
      }
    })
  }
}

export interface Sort {
  active: string
  direction: SortDirection
}
export type SortDirection = 'asc' | 'desc' | ''
