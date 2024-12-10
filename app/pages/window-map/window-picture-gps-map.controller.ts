import { GisPoint } from '../../data-core/models/arm/gis-point.model'
import { PictureGPSWindowAMapController } from './window-picture-gps-amap.controller'

export class PictureGPSWindowMapController {
  constructor() {}
  map = new PictureGPSWindowAMapController()

  load(name: string, data: GisPoint) {
    let position = wgs84togcj02(data.Longitude, data.Latitude)
    this.map.create(name, position)
  }
}
