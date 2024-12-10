import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import {
  AIAnalysisShopListMessageReceiverEvent,
  AIAnalysisShopListMessageSenderEvent,
} from '../ai-analysis-shop-list/ai-analysis-shop-list.message'
import {
  AIAnalysisTaskListMessageReceiverEvent,
  AIAnalysisTaskListMessageSenderEvent,
} from '../ai-analysis-task-list/ai-analysis-task-list.message'
import { WindowMessageData } from '../window/window.model'

interface MessageReceiverEvent
  extends AIAnalysisTaskListMessageReceiverEvent,
    AIAnalysisShopListMessageReceiverEvent {}
interface MessageSenderEvent
  extends AIAnalysisTaskListMessageSenderEvent,
    AIAnalysisShopListMessageSenderEvent {}

enum MessageCommand {
  default,

  delete,
  record,
  task_result,
  task_details,
}

export class AIAnalysisTaskIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm', 'message'])
  proxy: EventMessageProxy<MessageSenderEvent>

  command?: MessageCommand

  regist() {
    this.proxy.event.on('open', (args) => {
      this.command = MessageCommand.default
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('record', (args) => {
      this.command = MessageCommand.record
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('task_details', (args) => {
      this.command = MessageCommand.task_details
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('task_result', (args) => {
      this.command = MessageCommand.task_result
      this.client.sender.emit('open', args)
    })
    this.client.receiver.on('message', (data) => {
      switch (this.command) {
        case MessageCommand.task_details:
          this.files(data)
          break

        default:
          break
      }
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case MessageCommand.delete:
          this.delete_result(result)
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

  picture_result(args: ResultArgs<any>): void {
    this.proxy.message({
      command: 'picture_result',
      value: args,
      index: args.index,
    })
  }

  files(args: WindowMessageData<any>): void {
    this.proxy.message({
      command: 'files',
      value: args,
      index: args.index,
    })
  }
}
