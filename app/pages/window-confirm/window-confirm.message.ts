import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import {
  ConfirmWindowMessageRequestEvent,
  ConfirmWindowMessageResponseEvent,
} from './window-confirm.event'

export class ConfirmWindowMessage implements ConfirmWindowMessageResponseEvent {
  constructor() {
    this.regist()
  }

  private client = new EventMessageClient<
    ConfirmWindowMessageResponseEvent,
    ConfirmWindowMessageRequestEvent
  >(['confirm_close', 'confirm_result'])

  event: EventEmitter<ConfirmWindowMessageRequestEvent> = new EventEmitter()

  private regist() {
    this.client.receiver.on('confirm_open', (args) => {
      this.event.emit('confirm_open', args)
    })
  }

  confirm_close(): void {
    this.client.send({
      command: 'confirm_close',
      index: 0,
    })
  }
  confirm_result(result: ResultArgs): void {
    this.client.send({
      command: 'confirm_result',
      value: result,
      index: 0,
    })
  }
}
