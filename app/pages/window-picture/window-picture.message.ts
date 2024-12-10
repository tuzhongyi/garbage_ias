import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MainWindowMessageResponseEvent } from '../main/main.event'
import {
  PictureWindowMessageRequestEvent,
  PictureWindowMessageResponseEvent,
} from './window-picture.event'

export class PictureWindowMessage implements PictureWindowMessageResponseEvent {
  constructor() {}

  private client = new EventMessageClient<MainWindowMessageResponseEvent>([
    'close',
  ])

  event = new EventEmitter<PictureWindowMessageRequestEvent>()

  close(): void {
    this.client.sender.emit('close')
  }
}
