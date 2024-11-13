import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { WindowModel } from '../window/window.model'

export interface AIAnalysisTaskListMessageSenderEvent {
  open(window: WindowModel): void
}

export class AIAnalysisTaskListMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<AIAnalysisTaskListMessageSenderEvent>(
    ['open']
  )

  private reigst() {}

  create(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
}
