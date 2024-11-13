import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MainWindowMessageResponseEvent, ResultArgs } from '../main/main.event'
import {
  VideoGPSWindowMessageRequestEvent,
  VideoGPSWindowMessageResponseEvent,
} from './window-video-gps.event'

export class VideoGPSWindowMessage
  implements VideoGPSWindowMessageResponseEvent
{
  constructor() {}

  private client = new EventMessageClient<MainWindowMessageResponseEvent>([
    'close',
    'result',
  ])

  event: EventEmitter<VideoGPSWindowMessageRequestEvent> = new EventEmitter()

  close(): void {
    this.client.sender.emit('close')
  }
  result(result: ResultArgs): void {
    this.client.sender.emit('result', result)
  }
}
