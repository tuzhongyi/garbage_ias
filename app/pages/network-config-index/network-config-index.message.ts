import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'
import {
  NetworkConfigSSHMessageReceiverEvent,
  NetworkConfigSSHMessageSenderEvent,
} from '../network-config-ssh/network-config-ssh.message'
import {
  NetworkConfigTCPIPMessageReceiverEvent,
  NetworkConfigTCPIPMessageSenderEvent,
} from '../network-config-tcp-ip/network-config-tcp-ip.message'

interface MessageReceiverEvent
  extends NetworkConfigTCPIPMessageReceiverEvent,
    NetworkConfigSSHMessageReceiverEvent {}
interface MessageSenderEvent
  extends NetworkConfigTCPIPMessageSenderEvent,
    NetworkConfigSSHMessageSenderEvent {}

export class NetworkConfigIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  command?: number

  regist() {
    this.proxy.event.on('save_confirm', (args) => {
      this.command = 1
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('reboot_confirm', (args) => {
      this.command = 2
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (args) => {
      switch (this.command) {
        case 1:
          this.save_result(args)
          break
        case 2:
          this.reboot_result(args)
          break
        default:
          break
      }
    })
  }

  save_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'save_result',
      value: args,
      index: 0,
    })
  }
  reboot_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'reboot_result',
      value: args,
      index: 0,
    })
  }
}
