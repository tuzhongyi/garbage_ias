import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { UserManagerListEvent } from './user-manager-list.event'
import { UserManagerListHtmlTable } from './user-manager-list.html.table'
import './user-manager-list.less'
export class UserManagerListHtmlController {
  private element = {
    create: document.getElementById('btn_create') as HTMLButtonElement,
    delete: document.getElementById('btn_delete') as HTMLButtonElement,
  }

  event: EventEmitter<UserManagerListEvent> = new EventEmitter()
  table = new UserManagerListHtmlTable()

  constructor() {
    this.regist()
  }

  private inited = false

  private regist() {
    this.element.create.addEventListener('click', () => {
      this.event.emit('create')
    })
    this.element.delete.addEventListener('click', () => {
      if (this.table.selecteds && this.table.selecteds.length > 0) {
        this.event.emit(
          'delete',
          this.table.selecteds.map((x) => x.Id)
        )
      }
    })
  }
}
