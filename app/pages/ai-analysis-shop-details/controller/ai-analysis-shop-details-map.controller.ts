import { EventEmitter } from '../../../common/event-emitter'
import { GisPoint } from '../../../data-core/models/arm/gis-point.model'

interface AIAnalysisShopDetailsMapEvent {
  dragging(position: number[]): void
  dragend(position: number[]): void
}
export class AIAnalysisShopDetailsMapController {
  event = new EventEmitter<AIAnalysisShopDetailsMapEvent>()

  constructor() {
    this.map = this.init()
  }

  private map: AMap.Map
  private init() {
    return new AMap.Map('container', {
      resizeEnable: true,
      zoom: 17,
    })
  }

  load(data: GisPoint) {
    let position = wgs84togcj02(data.Longitude, data.Latitude)
    let marker = new AMap.Marker({
      position: position,
      map: this.map,
      draggable: true,
    })
    marker.on('dragging', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat]
      this.event.emit('dragging', position)
    })
    marker.on('dragend', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat]
      this.event.emit('dragend', position)
    })
    this.map.setCenter(position)
  }
}
