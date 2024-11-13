import { Point } from './geometry.model'

export class Geometry {
  static point_degree_distance(
    originPoint: Point,
    degree: number,
    distance: number
  ): Point {
    let rotate = (degree - 90 + 360) % 360
    let point: Point = {
      X: distance,
      Y: 0,
    }
    let relativeOriginPoint = this.rotate(point, rotate)
    let points = this.calculateCoordinateRelativePoint(
      originPoint,
      relativeOriginPoint
    )
    return points
  }

  private static calculateCoordinateRelativePoint(
    origin: Point,
    relativeOriginPoint: Point
  ) {
    let x = relativeOriginPoint.X + origin.X
    let y = relativeOriginPoint.Y + origin.Y
    let points = {
      X: Math.round(x * 100) / 100,
      Y: Math.round(y * 100) / 100,
    }
    return points
  }

  static rotate(point: Point, degree: number) {
    let x =
      point.X * Math.cos((degree * Math.PI) / 180) +
      point.Y * Math.sin((degree * Math.PI) / 180)
    let y =
      -point.X * Math.sin((degree * Math.PI) / 180) +
      point.Y * Math.cos((degree * Math.PI) / 180)
    let points = {
      X: Math.round(x * 100) / 100,
      Y: Math.round(y * 100) / 100,
    }
    return points
  }
}
