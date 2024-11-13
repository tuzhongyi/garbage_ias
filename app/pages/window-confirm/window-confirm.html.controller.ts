import { EventEmitter } from '../../common/event-emitter'
import '../window/window.less'
import { ConfirmWindowEvent } from './window-confirm.event'
import './window-confirm.less'
import { ConfirmWindowModel } from './window-confirm.model'

export class ConfirmWindowHtmlController {
  constructor() {
    this.regist()
  }

  event: EventEmitter<ConfirmWindowEvent> = new EventEmitter()

  element = {
    title: document.getElementById('title') as HTMLDivElement,
    message: document.getElementById('message') as HTMLDivElement,

    buttons: {
      ok: document.getElementById('ok') as HTMLButtonElement,
      cancel: document.getElementById('cancel') as HTMLButtonElement,
    },
  }

  regist() {
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  load(model: ConfirmWindowModel) {
    this.element.title.innerHTML = model.title
    this.element.message.innerHTML = model.message
  }
}
