import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { WindowMessageData, WindowModel } from '../window/window.model'

export interface AIAnalysisTaskListMessageSenderEvent {
  task_details(window: WindowModel): void
  task_result(window: WindowModel): void
}
export interface AIAnalysisTaskListMessageReceiverEvent {
  files(args: WindowMessageData): void
}

interface AIAnalysisShopListMessageEvent {}

export class AIAnalysisTaskListMessage {
  event = new EventEmitter<AIAnalysisShopListMessageEvent>()

  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    AIAnalysisTaskListMessageSenderEvent,
    AIAnalysisTaskListMessageReceiverEvent
  >(['task_details', 'task_result'])

  private reigst() {
    this.client.receiver.on('files', (data) => {})
  }

  create(window: WindowModel) {
    this.client.sender.emit('task_details', window)
  }
  record(window: WindowModel) {
    this.client.sender.emit('task_result', window)
  }
}
