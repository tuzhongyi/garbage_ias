import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MainWindowMessageResponseEvent, ResultArgs } from '../main/main.event'

export class UserManagerDetailsMessage
  implements MainWindowMessageResponseEvent
{
  private client = new EventMessageClient<MainWindowMessageResponseEvent>([
    'close',
    'result',
  ])

  close(): void {
    this.client.sender.emit('close')
  }
  result(result: ResultArgs): void {
    this.client.sender.emit('result', result)
  }
}
