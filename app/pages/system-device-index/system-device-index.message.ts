import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'
import {
  SystemDeviceDatetimeMessageReceiverEvent,
  SystemDeviceDatetimeMessageSenderEvent,
} from '../system-device-datetime/system-device-datetime.message'
import {
  SystemDeviceInfoMessageReceiverEvent,
  SystemDeviceInfoMessageSenderEvent,
} from '../system-device-info/system-device-info.message'

interface MessageReceiverEvent
  extends SystemDeviceInfoMessageReceiverEvent,
    SystemDeviceDatetimeMessageReceiverEvent {}
interface MessageSenderEvent
  extends SystemDeviceInfoMessageSenderEvent,
    SystemDeviceDatetimeMessageSenderEvent {}

export class SystemDeviceIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  regist() {
    this.proxy.event.on('save_confirm', (args) => {
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (args) => {
      this.save_result(args)
    })
  }

  save_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'save_result',
      value: args,
      index: args.index,
    })
  }
}
