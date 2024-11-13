import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface NetworkConfigTCPIPMessageReceiverEvent {
  save_result(args: ResultArgs): void
  reboot_result(args: ResultArgs): void
}
export interface NetworkConfigTCPIPMessageSenderEvent {
  save_confirm(window: ConfirmWindowModel): void
  reboot_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  save(): void
  reboot(): void
}

export class NetworkConfigTCPIPMessage
  implements NetworkConfigTCPIPMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    NetworkConfigTCPIPMessageSenderEvent,
    NetworkConfigTCPIPMessageReceiverEvent
  >(['save_confirm', 'reboot_confirm'])
  private reigst() {
    this.client.receiver.on('save_result', (args) => {
      if (args.result) {
        this.event.emit('save')
      }
    })
    this.client.receiver.on('reboot_result', (args) => {
      if (args.result) {
        this.event.emit('reboot')
      }
    })
  }

  save_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('save_confirm', window)
  }

  reboot_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('reboot_confirm', window)
  }
}
