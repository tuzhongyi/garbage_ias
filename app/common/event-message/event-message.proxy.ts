import { EventEmitter } from '../event-emitter'
import { EventMessageData } from './event-message.proxy.model'

export class EventMessageProxy<T extends Record<string | number, any>> {
  private iframe: HTMLIFrameElement
  constructor(iframe: HTMLIFrameElement) {
    this.iframe = iframe
    window.addEventListener('message', this.regist.bind(this))
  }

  event: EventEmitter<T> = new EventEmitter()

  message(data: EventMessageData) {
    let message = JSON.stringify(data)

    if (this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(message, '*')
    }
  }

  private regist(e: MessageEvent<EventMessageData>) {
    if (e && e.data) {
      let data: EventMessageData
      try {
        if (typeof e.data === 'string') {
          data = JSON.parse(e.data)
        } else {
          data = e.data
        }
      } catch (error) {
        console.warn(error, e)
        return
      }
      this.event.emit(data.command, data.value)
    }
  }
}
