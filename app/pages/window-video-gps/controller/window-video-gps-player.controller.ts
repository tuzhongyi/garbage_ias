import { EventEmitter } from '../../../common/event-emitter'

interface VideoGPSWindowPlayerControllerEvent {
  time(stamp: number): void
  error(e: Error): void
}

export class VideoGPSWindowPlayerController {
  event = new EventEmitter<VideoGPSWindowPlayerControllerEvent>()

  constructor() {
    this.regist()
  }

  private video = document.getElementById('video') as HTMLVideoElement

  private regist() {
    this.video.addEventListener('timeupdate', (e) => {
      this.event.emit('time', this.video.currentTime * 1000)
    })
    this.video.addEventListener('error', (e) => {
      this.event.emit('error', e)
    })
  }

  play(src: string) {
    this.video.src = src
  }

  seek(time: number) {
    this.video.currentTime = time
  }
}
