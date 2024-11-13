import { EventEmitter } from '../../../../common/event-emitter'
import { MapTool } from '../../../../common/tools/map-tool/map.tool'

interface VideoGPSWindowAMapPathEvent {
  mouseover(point: number[]): void
  mouseout(): void
  click(point: number[]): void
}

export class VideoGPSWindowAMapPathWayController {
  event = new EventEmitter<VideoGPSWindowAMapPathEvent>()

  constructor(private map: AMap.Map) {}

  private positions?: AMap.Polyline
  private points: number[][] = []

  private onmouseover(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    )
    let closest = MapTool.closest(this.points, point)
    this.event.emit('mouseover', closest)
  }
  private onmouseout(e: any) {
    this.event.emit('mouseout')
  }
  private onclick(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    )
    let closest = MapTool.closest(this.points, point)
    this.event.emit('click', closest)
  }
  load(positions: number[][]) {
    if (this.positions) {
      this.map.remove(this.positions)
    }
    this.points = positions
    this.positions = new AMap.Polyline({
      path: [...positions],
      showDir: true,
      strokeWeight: 6,
      strokeColor: '#4196ff',
      lineJoin: 'round',
      lineCap: 'round',
      cursor: 'pointer',
    })

    this.positions.on('mouseover', (e: any) => {
      this.onmouseover(e)
    })
    this.positions.on('mouseout', (e: any) => {
      this.onmouseout(e)
    })
    this.positions.on('click', (e: any) => {
      this.onclick(e)
    })

    this.map.add(this.positions)
  }
}
