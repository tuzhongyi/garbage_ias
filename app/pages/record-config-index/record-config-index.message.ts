import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'
import {
  RecordConfigPackageMessageReceiverEvent,
  RecordConfigPackageMessageSenderEvent,
} from '../record-config-package/record-config-package.message'

interface MessageReceiverEvent
  extends RecordConfigPackageMessageReceiverEvent {}

interface MessageSenderEvent extends RecordConfigPackageMessageSenderEvent {}

enum MessageCommand {
  default,
  delete,
  save,
  record_start,
  record_stop,
}

export class RecordConfigIndexMessage implements MessageReceiverEvent {
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
    this.proxy.event.on('save_confirm', (args) => {
      this.command = MessageCommand.save
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
        case MessageCommand.save:
          this.save_result(result)
          break
        case MessageCommand.record_start:
          this.record_start_result(result)
          break
        case MessageCommand.record_stop:
          this.record_stop_result(result)
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
      index: 0,
    })
  }
  delete_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'delete_result',
      value: result,
      index: 0,
    })
  }
  save_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'save_result',
      value: args,
      index: 0,
    })
  }

  record_start_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'record_start_result',
      value: args,
      index: 0,
    })
  }
  record_stop_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'record_stop_result',
      value: args,
      index: 0,
    })
  }
}
