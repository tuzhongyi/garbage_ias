import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface AIAnalysisServerInfoMessageReceiverEvent {
  info_result(args: ResultArgs): void
}
export interface AIAnalysisServerInfoMessageSenderEvent {
  info_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  save(): void
}

export class AIAnalysisServerInfoMessage
  implements AIAnalysisServerInfoMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    AIAnalysisServerInfoMessageSenderEvent,
    AIAnalysisServerInfoMessageReceiverEvent
  >(['info_confirm'])
  private reigst() {
    this.client.receiver.on('info_result', (args) => {
      if (args.result) {
        this.event.emit('save')
      }
    })
  }

  info_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('info_confirm', window)
  }
}
