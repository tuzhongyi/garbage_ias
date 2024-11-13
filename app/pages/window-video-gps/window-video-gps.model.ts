import { Type } from 'class-transformer'
import 'reflect-metadata'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { IWindowQuery, WindowModel } from '../window/window.model'

export interface IVideoGPSWindowQuery extends IWindowQuery {
  title: string
  src: string
  areas: string
}

export class VideoGPSWindowModel extends WindowModel<IVideoGPSWindowQuery> {}

export class CavnasParams {
  color: string = 'red'
  @Type(() => Polygon)
  area!: Polygon
}
