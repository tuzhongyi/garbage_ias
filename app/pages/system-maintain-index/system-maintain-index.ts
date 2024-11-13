import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import './system-maintain-index.less'
import { SystemMaintainIndexMessage } from './system-maintain-index.message'

export namespace SystemMaintainIndex {
  export class HtmlController {
    constructor() {
      this.regist()
      this.init()
    }

    private index = LocalStorageService.navigation.system.maintain.get()

    private element = {
      items: document.getElementsByClassName('menu-item'),
      iframe: document.querySelector('#iframe') as HTMLIFrameElement,
    }
    message = new SystemMaintainIndexMessage(this.element.iframe)
    private init() {
      if (this.element.items && this.element.items.length > 0) {
        this.onselect(this.element.items.item(this.index) as HTMLDivElement)
      }
    }

    private regist() {
      if (this.element.items) {
        for (let i = 0; i < this.element.items.length; i++) {
          const item = this.element.items[i]

          item.addEventListener('click', (e: Event) => {
            this.onselect(e.target as HTMLDivElement)
          })
        }
      }
    }

    private onselect(current: HTMLDivElement) {
      let selected = document.querySelector('.selected') as HTMLDivElement
      if (selected) {
        selected.classList.remove('selected')
      }
      current.classList.add('selected')

      if (this.element.items) {
        let index = -1
        for (let i = 0; i < this.element.items.length; i++) {
          const item = this.element.items[i]
          if (item === current) {
            index = i
          }
        }
        if (index >= 0) {
          // this.event.emit('select', index)

          if (this.element.iframe) {
            this.element.iframe.src = this.factory(index)
            this.index = index
            LocalStorageService.navigation.system.maintain.save(this.index)
          }
        }
      }
    }

    private factory(index: number): string {
      switch (index) {
        case 0:
          return '../system-maintain-config/system-maintain-config.html'
        case 1:
          return '../system-maintain-log/system-maintain-log.html'
        default:
          return ''
      }
    }
  }

  const controller = new HtmlController()
}
