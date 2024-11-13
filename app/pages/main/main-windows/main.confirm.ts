import { EventEmitter } from '../../../common/event-emitter'
import { EventMessageProxy } from '../../../common/event-message/event-message.proxy'
import { ConfirmWindowMessageResponseEvent } from '../../window-confirm/window-confirm.event'

import { ConfirmWindowModel } from '../../window-confirm/window-confirm.model'
import { MainWindowMessageEvent } from '../main.event'

export class ArmMainConfirm {
  constructor() {
    this.regist()
  }

  element = document.querySelector('#confirm') as HTMLDivElement
  mask = document.querySelector('#confirm_mask') as HTMLDivElement
  iframe = this.element.querySelector('iframe') as HTMLIFrameElement
  message: EventMessageProxy<ConfirmWindowMessageResponseEvent> =
    new EventMessageProxy(this.iframe)
  event: EventEmitter<MainWindowMessageEvent> = new EventEmitter()

  open(args: ConfirmWindowModel) {
    this.mask.style.display = ''
    if (args.style) {
      if (args.style.width) {
        this.element.style.width = args.style.width
      }
      if (args.style.height) {
        this.element.style.height = args.style.height
      }
    }
    this.message.message({
      command: 'confirm_open',
      value: args,
      index: 0,
    })
  }

  regist() {
    this.message.event.on('confirm_close', () => {
      this.mask.style.display = 'none'
    })
    this.message.event.on('confirm_result', (args) => {
      this.event.emit('result', args)
    })
  }
}
