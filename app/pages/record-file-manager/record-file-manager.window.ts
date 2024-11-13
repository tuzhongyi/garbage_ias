import { VideoWindowModel } from '../window-video/window-video.model'

export class RecordFileManagerWindow {
  video = new VideoWindow()
}
class VideoWindow extends VideoWindowModel {
  private size = new VideoWindowSize()

  style = {
    width: `${window.innerWidth}px`,
    height: `${this.size.height}px`,
  }
  url: string = '../window-video-gps/window-video-gps.html'
}

class VideoWindowSize {
  get width() {
    return window.innerWidth * 0.7
  }
  get height() {
    return (this.width * 9) / 16 + 50
  }
}
