import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MainWindowMessageResponseEvent } from '../main/main.event'
import {
  VideoWindowMessageRequestEvent,
  VideoWindowMessageResponseEvent,
} from './window-video.event'

export class VideoWindowMessage implements VideoWindowMessageResponseEvent {
  constructor() {}

  private client = new EventMessageClient<MainWindowMessageResponseEvent>([
    'close',
  ])

  event = new EventEmitter<VideoWindowMessageRequestEvent>()

  close(): void {
    this.client.sender.emit('close')
  }
}
