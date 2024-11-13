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

  event: EventEmitter<VideoWindowMessageRequestEvent> = new EventEmitter()

  close(): void {
    this.client.sender.emit('close')
  }
}
