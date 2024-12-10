import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MainWindowMessageResponseEvent } from '../main/main.event'
import {
  PictureGPSWindowMessageRequestEvent,
  PictureGPSWindowMessageResponseEvent,
} from './window-picture-gps.event'

export class PictureGPSWindowMessage
  implements PictureGPSWindowMessageResponseEvent
{
  constructor(private index: number) {}

  private client = new EventMessageClient<MainWindowMessageResponseEvent>([
    'close',
  ])

  event = new EventEmitter<PictureGPSWindowMessageRequestEvent>()

  close(): void {
    this.client.sender.emit('close', this.index)
  }
}
