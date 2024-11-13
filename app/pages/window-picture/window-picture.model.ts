import { Type } from 'class-transformer'
import 'reflect-metadata'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { IWindowQuery, WindowModel } from '../window/window.model'

export interface IPictureWindowQuery extends IWindowQuery {
  title: string
  img: string
  areas: string
}

export class PictureWindowModel extends WindowModel<IPictureWindowQuery> {}

export class CavnasParams {
  color: string = 'red'
  @Type(() => Polygon)
  area!: Polygon
}
