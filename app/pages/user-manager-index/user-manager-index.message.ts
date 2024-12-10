import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'
import {
  UserManagerListMessageReceiverEvent,
  UserManagerListMessageSenderEvent,
} from '../user-manager-list/user-manager-list.message'

interface MessageReceiverEvent extends UserManagerListMessageReceiverEvent {}

interface MessageSenderEvent extends UserManagerListMessageSenderEvent {}

enum MessageCommand {
  default,
  delete,
}

export class UserManagerIndexMessage implements MessageReceiverEvent {
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
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = MessageCommand.delete
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case MessageCommand.default:
          this.details_result(result)
          break
        case MessageCommand.delete:
          this.delete_result(result)
          break
        default:
          break
      }
    })
  }

  details_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'details_result',
      value: result,
      index: result.index,
    })
  }
  delete_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'delete_result',
      value: result,
      index: result.index,
    })
  }
}
