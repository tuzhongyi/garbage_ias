import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface SystemMaintainConfigMessageReceiverEvent {
  reboot_result(args: ResultArgs): void
  shutdown_result(args: ResultArgs): void
  factoryreset_result(args: ResultArgs): void
}
export interface SystemMaintainConfigMessageSenderEvent {
  reboot_confirm(window: ConfirmWindowModel): void
  shutdown_confirm(window: ConfirmWindowModel): void
  factoryreset_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  toreboot(): void
  toshutdown(): void
  tofactoryreset(): void
}

export class SystemMaintainConfigMessage
  implements SystemMaintainConfigMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    SystemMaintainConfigMessageSenderEvent,
    SystemMaintainConfigMessageReceiverEvent
  >(['reboot_confirm', 'shutdown_confirm', 'factoryreset_confirm'])
  private reigst() {
    this.client.receiver.on('reboot_result', (args) => {
      if (args.result) {
        this.event.emit('toreboot')
      }
    })
    this.client.receiver.on('shutdown_result', (args) => {
      if (args.result) {
        this.event.emit('toshutdown')
      }
    })
    this.client.receiver.on('factoryreset_result', (args) => {
      if (args.result) {
        this.event.emit('tofactoryreset')
      }
    })
  }

  reboot_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('reboot_confirm', window)
  }
  shutdown_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('shutdown_confirm', window)
  }
  factoryreset_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('factoryreset_confirm', window)
  }
}
