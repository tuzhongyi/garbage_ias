import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { EventMessageData } from '../../common/event-message/event-message.proxy.model'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { ArmMainConfirm } from './main-windows/main.confirm'
import { ArmMainWindow } from './main-windows/main.window'
import {
  MainMessageRequestEvent,
  MainWindowMessageResponseEvent,
  ResultArgs,
} from './main.event'

export class ArmMainMessage implements MainWindowMessageResponseEvent {
  constructor(
    private iframe: HTMLIFrameElement,
    private window: ArmMainWindow,
    private confirm: ArmMainConfirm
  ) {
    this.regist()
  }

  private proxy: EventMessageProxy<MainMessageRequestEvent> =
    new EventMessageProxy(this.iframe)

  regist() {
    // 注册子页面触发事件
    this.proxy.event.on('open', (args) => {
      this.window.open(args)
    })
    this.proxy.event.on('confirm', (args) => {
      this.confirm.open(args)
    })
    //注册窗口页面返回结果事件
    this.window.event.on('result', (args) => {
      if (args.inner) {
        if (args.result) {
          MessageBar.success(args.message)
        } else {
          MessageBar.warning(args.message)
        }
        return
      }
      this.result(args)
    })
    this.confirm.event.on('result', (args) => {
      this.result(args)
    })
  }

  close(): void {
    this.window.close()
  }

  result(args: ResultArgs): void {
    let data: EventMessageData = {
      command: 'result',
      value: args,
      index: 0,
    }
    this.proxy.message(data)
  }
}
