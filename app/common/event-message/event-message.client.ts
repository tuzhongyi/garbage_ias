import { EventEmitter } from '../event-emitter'
import { EventMessageData } from './event-message.proxy.model'

export class EventMessageClient<
  TSend extends Record<string | number, any>,
  TResolve extends Record<string | number, any> = any
> {
  index = 0
  constructor(private keys: (keyof TSend)[]) {
    this.init()
    window.addEventListener('message', this.eventregist.bind(this))
  }
  send<T = any>(data: EventMessageData<T>) {
    let message = JSON.stringify(data)
    window.parent.postMessage(message, '*')
  }
  sender: EventEmitter<TSend> = new EventEmitter()
  receiver: EventEmitter<TResolve> = new EventEmitter()

  init() {
    this.keys.forEach((key) => {
      this.sender.on(key, ((args: any) => {
        this.send({
          command: key as any,
          value: args,
          index: this.index,
        })
      }) as any)
    })
  }

  private eventregist(e: MessageEvent<EventMessageData>) {
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
      this.receiver.emit(data.command, data.value)
    }
  }
}
