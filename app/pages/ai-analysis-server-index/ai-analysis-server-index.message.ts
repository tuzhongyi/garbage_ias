import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import {
  AIAnalysisServerInfoMessageReceiverEvent,
  AIAnalysisServerInfoMessageSenderEvent,
} from '../ai-analysis-server-info/ai-analysis-server-info.message'

interface MessageReceiverEvent
  extends AIAnalysisServerInfoMessageReceiverEvent {}
interface MessageSenderEvent extends AIAnalysisServerInfoMessageSenderEvent {}

enum MessageCommand {
  default,
  delete,
  info,
}

export class AIAnalysisServerIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  command?: MessageCommand

  regist() {
    this.proxy.event.on('info_confirm', (args) => {
      this.command = MessageCommand.info
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case MessageCommand.delete:
          this.delete_result(result)
          break
        case MessageCommand.info:
          this.info_result(result)
          break
        default:
          break
      }
    })
  }

  delete_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'delete_result',
      value: result,
      index: result.index,
    })
  }
  info_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'info_result',
      value: args,
      index: args.index,
    })
  }
}
