import { EventEmitter } from '../../../common/event-emitter'
import { EventMessageProxy } from '../../../common/event-message/event-message.proxy'
import { LocationTool } from '../../../common/tools/location.tool'
import { WindowModel } from '../../window/window.model'
import {
  MainWindowMessageEvent,
  MainWindowMessageResponseEvent,
} from '../main.event'

export class ArmMainWindow {
  constructor() {
    this.regist()
  }

  element = document.querySelector('#window') as HTMLDivElement
  mask = document.querySelector('#window_mask') as HTMLDivElement
  iframe = this.element.querySelector('iframe') as HTMLIFrameElement
  message: EventMessageProxy<MainWindowMessageResponseEvent> =
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
    this.message.event.on('close', () => {
      this.close()
    })
    this.message.event.on('result', (args) => {
      this.event.emit('result', args)
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
}
