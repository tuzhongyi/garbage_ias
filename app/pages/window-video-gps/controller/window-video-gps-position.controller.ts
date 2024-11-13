import { EventEmitter } from '../../../common/event-emitter'
import { ArrayTool } from '../../../common/tools/array-tool/array.tool'
import { FileGpsItem } from '../../../data-core/models/arm/file/file-gps-item.model'
import { VideoGPSWindowAMapController } from './amap/window-video-gps-amap.controller'

interface VideoGPSWindowPositionEvent {
  trigger(item: FileGpsItem): void
}

export class VideoGPSWindowPositionController {
  event = new EventEmitter<VideoGPSWindowPositionEvent>()
  constructor() {
    this.regist()
  }

  private map = new VideoGPSWindowAMapController()
  private datas: FileGpsItem[] = []

  private regist() {
    this.map.path.event.on('mouseover', (point) => {
      this.onmouseover(point)
    })
    this.map.path.event.on('mouseout', () => {
      this.map.label.hide()
    })
    this.map.path.event.on('click', (point) => {
      this.map.label.hide()
      this.onclick(point)
    })
    this.map.way.event.on('mouseover', (point) => {
      this.onmouseover(point)
    })
    this.map.way.event.on('mouseout', () => {
      this.map.label.hide()
    })
    this.map.way.event.on('click', (point) => {
      this.map.label.hide()
      this.onclick(point)
    })
  }

  onclick(point: number[]) {
    let item = this.datas.find((x) => {
      let gcj02 = wgs84togcj02(x.Longitude, x.Latitude)

      return gcj02[0] === point[0] && gcj02[1] === point[1]
    })
    if (item) {
      this.event.emit('trigger', item)
    }
  }

  onmouseover(point: number[]) {
    let item = this.datas.find((x) => {
      let gcj02 = wgs84togcj02(x.Longitude, x.Latitude)

      return gcj02[0] === point[0] && gcj02[1] === point[1]
    })
    if (item) {
      console.log('item', item)
      let point = wgs84togcj02(item.Longitude, item.Latitude)
      this.map.label.show(point, item.OffsetTime.toString())
    }
  }

  load(datas: FileGpsItem[]) {
    this.datas = datas
    let ll = this.datas.map((x) => {
      return wgs84togcj02(x.Longitude, x.Latitude)
    })
    this.map.path.load(ll)
  }

  to(stamp: number) {
    let times = this.datas.map((x) => {
      let time = x.OffsetTime.toDate()
      return time.getTime()
    })

    let finded = ArrayTool.closest(times, stamp)
    if (finded) {
      let item = this.datas[finded.index]

      let way = this.datas.slice(0, finded.index).map((x) => {
        return wgs84togcj02(x.Longitude, x.Latitude)
      })
      this.map.way.load(way)

      let position = wgs84togcj02(item.Longitude, item.Latitude)
      this.map.arrow.set(position)
      if (finded.index > 0) {
        let last = this.datas[finded.index - 1]
        this.map.arrow.direction([
          wgs84togcj02(last.Longitude, last.Latitude),
          position,
        ])
      }
    }
  }
}
