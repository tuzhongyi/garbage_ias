import { EventEmitter } from '../../../../common/event-emitter'
import { VideoGPSWindowAMapArrowController } from './window-video-gps-amap-arrow.controller'
import { VideoGPSWindowAMapLabelController } from './window-video-gps-amap-label.controller'
import { VideoGPSWindowAMapPathWayController } from './window-video-gps-amap-path-way.controller'
import { VideoGPSWindowAMapPathController } from './window-video-gps-amap-path.controller'

declare var AMap: any

interface VideoGPSWindowAMapControllerEvent {
  mouseover(point: number[]): void
}

export class VideoGPSWindowAMapController {
  event = new EventEmitter<VideoGPSWindowAMapControllerEvent>()

  constructor() {
    this.map = this.init()
    this.arrow = new VideoGPSWindowAMapArrowController(this.map)
    this.path = new VideoGPSWindowAMapPathController(this.map)
    this.way = new VideoGPSWindowAMapPathWayController(this.map)
    this.label = new VideoGPSWindowAMapLabelController(this.map)
  }

  private map: AMap.Map
  arrow: VideoGPSWindowAMapArrowController
  path: VideoGPSWindowAMapPathController
  way: VideoGPSWindowAMapPathWayController
  label: VideoGPSWindowAMapLabelController

  private init() {
    return new AMap.Map('container', {
      resizeEnable: true,
      zoom: 17,
    })
  }
}
