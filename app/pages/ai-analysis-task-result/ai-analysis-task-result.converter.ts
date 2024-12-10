import { Resolution } from '../../data-core/models/arm/analysis/resolution.model'
import { Point } from '../../data-core/models/arm/point.model'
import { Polygon } from '../../data-core/models/arm/polygon.model'

export class AIAnalysisTaskResultConverter {
  static point = {
    from: (resolution: Resolution, point: Point) => {
      let result = new Point()
      result.X = point.X / resolution.Width
      result.Y = point.Y / resolution.Height
      return result
    },
    to: (resolution: Resolution, point: Point) => {
      let result = new Point()
      result.X = Math.round(point.X * resolution.Width)
      result.Y = Math.round(point.Y * resolution.Height)
      return result
    },
  }

  static polygon = {
    from: (resolution: Resolution, polygon: Polygon) => {
      let result = new Polygon()
      result.Coordinates = []
      for (let i = 0; i < polygon.Coordinates.length; i++) {
        let point = this.point.from(resolution, polygon.Coordinates[i])
        result.Coordinates.push(point)
      }
      return result
    },
    to: (resolution: Resolution, polygon: Polygon) => {
      let result = new Polygon()
      result.Coordinates = []
      for (let i = 0; i < polygon.Coordinates.length; i++) {
        let point = this.point.to(resolution, polygon.Coordinates[i])
        result.Coordinates.push(point)
      }
      return result
    },
  }
}
