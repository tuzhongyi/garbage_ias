import { ShopSign } from '../../../../data-core/models/arm/analysis/shop-sign.model'
import { AIAnalysisTaskResultMapIconController } from './ai-analysis-task-result-map-icon.controller'

declare var AMap: any
export class AIAnalysisTaskResultMapPointController {
  selected = false
  constructor(public data: ShopSign, private map: AMap.Map) {
    this.marker = this.create(data)
    map.add(this.marker)
  }

  private icon = new AIAnalysisTaskResultMapIconController()
  private marker: AMap.Marker

  create(data: ShopSign) {
    if (data.Location) {
      let position = wgs84togcj02(
        data.Location.Longitude,
        data.Location.Latitude
      )
      let icon = this.icon.create(false)
      const marker = new AMap.Marker({
        position: [...position],
        title: data.Text,
        name: data.Id,
        extData: data,
        icon: icon,
        offset: new AMap.Pixel(0, 0),
        anchor: 'bottom-center',
      })
      return marker
    }
  }

  select() {
    if (this.selected) return
    let icon = this.icon.create(true)
    this.marker.setIcon(icon)
    this.marker.setTop(true)
    this.map.setCenter(this.marker.getPosition())
    this.selected = true
  }

  blue() {
    if (!this.selected) return
    let icon = this.icon.create(false)
    this.marker.setIcon(icon)
    this.marker.setTop(false)
    this.selected = false
  }
}
