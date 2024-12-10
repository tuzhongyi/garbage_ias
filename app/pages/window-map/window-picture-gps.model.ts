import { Type } from 'class-transformer'
import 'reflect-metadata'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { IWindowQuery, WindowModel } from '../window/window.model'

export interface IPictureGPSWindowQuery extends IWindowQuery {
  title: string
  img: string
  areas: string
}

export class PictureGPSWindowModel extends WindowModel<IPictureGPSWindowQuery> {}

export class CavnasParams {
  color: string = 'red'
  @Type(() => Polygon)
  area!: Polygon
}
