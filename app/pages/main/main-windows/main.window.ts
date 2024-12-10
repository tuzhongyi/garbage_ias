import { EventEmitter } from '../../../common/event-emitter'
import { EventMessageProxy } from '../../../common/event-message/event-message.proxy'
import { EventMessageData } from '../../../common/event-message/event-message.proxy.model'
import { LocationTool } from '../../../common/tools/location.tool'
import { WindowMessageData, WindowModel } from '../../window/window.model'
import {
  MainWindowMessageEvent,
  MainWindowMessageResponseEvent,
  ResultArgs,
} from '../main.event'

export class ArmMainWindow {
  constructor() {
    this.regist()
  }

  element = document.querySelector('#window') as HTMLDivElement
  mask = document.querySelector('#window_mask') as HTMLDivElement
  iframe = this.element.querySelector('iframe') as HTMLIFrameElement
  private _message: EventMessageProxy<MainWindowMessageResponseEvent> =
    new EventMessageProxy(this.iframe)
  event: EventEmitter<MainWindowMessageEvent> = new EventEmitter()
  private opened = false
  open(args: WindowModel) {
    // this.mask.style.display = ''
    this.opened = true

    if (args.query) {
      this.iframe.src = LocationTool.query.encode(args.url, args.query)
    } else {
      this.iframe.src = args.url
    }
    if (args.style) {
      if (args.style.width) {
        this.element.style.width = args.style.width
      }
      if (args.style.height) {
        this.element.style.height = args.style.height
      }
    }
  }

  regist() {
    this._message.event.on('close', () => {
      this.close()
    })
    this._message.event.on('result', (args) => {
      this.event.emit('result', args)
    })
    this._message.event.on('message', (data) => {
      this.event.emit('message', data)
    })
    this._message.event.on('confirm', (args) => {
      this.event.emit('confirm', args)
    })

    this.iframe.addEventListener('load', () => {
      if (this.opened) {
        this.mask.style.display = ''
      }
    })
  }

  close() {
    this.opened = false
    this.mask.style.display = 'none'
    this.iframe.src = 'about:blank'
    this.iframe.contentWindow?.document.write('')
  }

  message(data: WindowMessageData) {
    if (this.opened) {
      let message: EventMessageData = {
        command: 'message',
        value: data.data,
        index: data.index,
      }
      this._message.message(message)
    }
  }
  result(args: ResultArgs) {
    if (this.opened) {
      let message: EventMessageData = {
        command: 'result',
        value: args,
        index: args.index,
      }
      this._message.message(message)
    }
  }
}
