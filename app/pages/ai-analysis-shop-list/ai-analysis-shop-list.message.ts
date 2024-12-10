import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { WindowModel } from '../window/window.model'

export interface AIAnalysisShopListMessageSenderEvent {
  open(window: WindowModel): void
  record(window: WindowModel): void
}
export interface AIAnalysisShopListMessageReceiverEvent {}

interface AIAnalysisShopListMessageEvent {}

export class AIAnalysisShopListMessage {
  event = new EventEmitter<AIAnalysisShopListMessageEvent>()

  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    AIAnalysisShopListMessageSenderEvent,
    AIAnalysisShopListMessageReceiverEvent
  >(['open', 'record'])

  private reigst() {}

  details(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
  record(window: WindowModel) {
    this.client.sender.emit('record', window)
  }
}
