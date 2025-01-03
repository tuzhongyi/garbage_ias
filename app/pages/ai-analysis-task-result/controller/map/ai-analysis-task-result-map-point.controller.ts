import { ShopSign } from '../../../../data-core/models/arm/analysis/shop-sign.model'
import { AIAnalysisTaskResultMapIconController } from './ai-analysis-task-result-map-icon.controller'

declare var AMap: any
export class AIAnalysisTaskResultMapPointController {
  selected = false
  constructor(public data: ShopSign) {
    this.marker = this.create(data)
  }

  private icon = new AIAnalysisTaskResultMapIconController()
  public marker: AMap.LabelMarker

  create(data: ShopSign) {
    if (data.Location) {
      let position = wgs84togcj02(
        data.Location.Longitude,
        data.Location.Latitude
      )
      let icon = this.icon.create()
      const marker = new AMap.LabelMarker({
        icon: icon,
        position: [...position],
        title: data.Text,
        name: data.Id,
        extData: data,
      })
      return marker
    }
  }

  select() {
    if (this.selected) return
    let icon = this.icon.get(true)
    this.marker.setIcon(icon)
    this.marker.setTop(true)
    this.selected = true
    return this.marker.getPosition()
  }

  blur() {
    if (!this.selected) return
    let icon = this.icon.get(false)
    this.marker.setIcon(icon)
    this.marker.setTop(false)
    this.selected = false
  }
}
