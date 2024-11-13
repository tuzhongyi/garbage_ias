export class VideoWindowVideoController {
  private video = document.getElementById('video') as HTMLVideoElement
  constructor() {}

  play(src: string) {
    this.video.src = src
  }
}
