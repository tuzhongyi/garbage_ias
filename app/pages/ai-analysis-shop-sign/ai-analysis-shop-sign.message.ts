import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import {
  MainMessageRequestEvent,
  MainWindowMessageResponseEvent,
} from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

interface AIAnalysisShopSignMessageEvent {
  result(data: boolean): void
}

export class AIAnalysisShopSignMessage {
  event = new EventEmitter<AIAnalysisShopSignMessageEvent>()
  constructor() {
    this.regist()
  }
  private client = new EventMessageClient<
    MainWindowMessageResponseEvent,
    MainMessageRequestEvent
  >(['close', 'result', 'confirm'])

  private regist() {
    this.client.receiver.on('message', (args) => {
      console.log(args)
    })
    this.client.receiver.on('result', (args) => {
      this.event.emit('result', args.result)
    })
  }

  close(): void {
    this.client.sender.emit('close')
  }
  confirm(data: ConfirmWindowModel) {
    this.client.sender.emit('confirm', data)
  }
}
