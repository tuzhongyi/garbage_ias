import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'
import {
  SystemMaintainConfigMessageReceiverEvent,
  SystemMaintainConfigMessageSenderEvent,
} from '../system-maintain-config/system-maintain-config.message'

export class SystemMaintainIndexMessage
  implements SystemMaintainConfigMessageReceiverEvent
{
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<SystemMaintainConfigMessageSenderEvent>

  confirm_index = 0

  regist() {
    this.proxy.event.on('reboot_confirm', (args) => {
      this.confirm_index = 0
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('shutdown_confirm', (args) => {
      this.confirm_index = 1
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('factoryreset_confirm', (args) => {
      this.confirm_index = 2
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.confirm_index) {
        case 0:
          this.reboot_result(result)
          break
        case 1:
          this.shutdown_result(result)
          break
        case 2:
          this.factoryreset_result(result)
          break

        default:
          break
      }
    })
  }

  reboot_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'reboot_result',
      value: args,
      index: args.index,
    })
  }
  shutdown_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'shutdown_result',
      value: args,
      index: args.index,
    })
  }
  factoryreset_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'factoryreset_result',
      value: args,
      index: args.index,
    })
  }
}
