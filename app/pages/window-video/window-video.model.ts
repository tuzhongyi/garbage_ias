import { Type } from 'class-transformer'
import 'reflect-metadata'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { IWindowQuery, WindowModel } from '../window/window.model'

export interface IVideoWindowQuery extends IWindowQuery {
  title: string
  src: string
  areas: string
}

export class VideoWindowModel extends WindowModel<IVideoWindowQuery> {}

export class CavnasParams {
  color: string = 'red'
  @Type(() => Polygon)
  area!: Polygon
}
