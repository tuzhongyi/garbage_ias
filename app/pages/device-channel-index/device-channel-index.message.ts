import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  DeviceChannelListMessageReceiverEvent,
  DeviceChannelListMessageSenderEvent,
} from '../device-channel-list/device-channel-list.message'
import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

interface MessageReceiverEvent extends DeviceChannelListMessageReceiverEvent {}

interface MessageSenderEvent extends DeviceChannelListMessageSenderEvent {}

enum MessageCommand {
  default,
  delete,
  record_start,
  record_stop,
}

export class DeviceChannelIndexMessage implements MessageReceiverEvent {
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
    this.proxy.event.on('record_start_confirm', (args) => {
      this.command = MessageCommand.record_start
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('record_stop_confirm', (args) => {
      this.command = MessageCommand.record_stop
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
