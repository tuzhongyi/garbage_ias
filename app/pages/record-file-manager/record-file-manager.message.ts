import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { WindowModel } from '../window/window.model'

export interface RecordFileManagerMessageReceiverEvent {}
export interface RecordFileManagerMessageSenderEvent {
  open(window: WindowModel): void
}
interface MessageEvent {}

export class RecordFileManagerMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    RecordFileManagerMessageSenderEvent,
    RecordFileManagerMessageReceiverEvent
  >(['open'])
  private reigst() {}

  video(window: WindowModel<any>): void {
    this.client.sender.emit('open', window)
  }
}
