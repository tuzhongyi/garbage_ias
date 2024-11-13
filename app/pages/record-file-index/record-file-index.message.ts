import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
} from '../main/main.event'
import {
  RecordFileManagerMessageReceiverEvent,
  RecordFileManagerMessageSenderEvent,
} from '../record-file-manager/record-file-manager.message'

interface MessageReceiverEvent extends RecordFileManagerMessageReceiverEvent {}

interface MessageSenderEvent extends RecordFileManagerMessageSenderEvent {}

enum MessageCommand {
  default,
}

export class RecordFileIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  command?: MessageCommand

  regist() {
    this.proxy.event.on('open', (args) => {
      this.command = MessageCommand.default
      this.client.sender.emit('open', args)
    })
  }
}
