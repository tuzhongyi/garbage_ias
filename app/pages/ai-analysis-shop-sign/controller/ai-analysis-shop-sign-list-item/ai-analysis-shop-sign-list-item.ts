import { EventEmitter } from '../../../../common/event-emitter'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { PointTool } from '../../../../common/tools/map-tool/point.tool'
import { ShopSign } from '../../../../data-core/models/arm/analysis/shop-sign.model'
import { Point } from '../../../../data-core/models/arm/point.model'
import { MediumRequestService } from '../../../../data-core/requests/services/medium/medium.service'
import html from './ai-analysis-shop-sign-list-item.html'
import './ai-analysis-shop-sign-list-item.less'

interface AIAnalysisShopSignListItemEvent {
  delete(id: string): void
}

export class AIAnalysisShopSignListItemController {
  event = new EventEmitter<AIAnalysisShopSignListItemEvent>()
  get name() {
    if (!this._name) {
      this._name = this.element.querySelector('.item-name') as HTMLDivElement
    }
    return this._name
  }
  get time() {
    if (!this._time) {
      this._time = this.element.querySelector('.item-time') as HTMLDivElement
    }
    return this._time
  }
  get confidence() {
    if (!this._confidence) {
      this._confidence = this.element.querySelector(
        '.item-confidence'
      ) as HTMLDivElement
    }
    return this._confidence
  }
  get picture() {
    if (!this._picture) {
      this._picture = this.element.querySelector(
        '.item-picture'
      ) as HTMLDivElement
    }
    return this._picture
  }
  get canvas() {
    if (!this._canvas) {
      this._canvas = this.element.querySelector('canvas') as HTMLCanvasElement
    }
    return this._canvas
  }
  get delete() {
    if (!this._delete) {
      this._delete = this.element.querySelector(
        '.item-delete'
      ) as HTMLDivElement
    }
    return this._delete
  }

  constructor(parent: HTMLDivElement, data?: ShopSign) {
    this.element = this.init()
    parent.appendChild(this.element)
    if (data) {
      this.load(data)
    }
  }

  load(data: ShopSign) {
    this.element.id = data.Id
    this.name.innerText = HtmlTool.set(data.Text)
    this.time.innerText = HtmlTool.set(data.Time)
    this.confidence.innerText = `${HtmlTool.set(data.Confidence, '', {
      percent: true,
    })}%`
    if (data.ImageUrl) {
      this.picture.style.backgroundImage = `url(${this.medium.picture(
        data.ImageUrl
      )})`
    }
    if (data.Polygon) {
      this.loadPolygon(data.Polygon)
    }
    this.delete.addEventListener('click', () => {
      this.event.emit('delete', this.element.id)
    })
  }

  private _name?: HTMLDivElement
  private _time?: HTMLDivElement
  private _confidence?: HTMLDivElement
  private _picture?: HTMLDivElement
  private _canvas?: HTMLCanvasElement
  private _delete?: HTMLDivElement
  private parser = new DOMParser()
  private element: HTMLDivElement
  private medium = new MediumRequestService()

  private init() {
    return this.parser.parseFromString(html, 'text/html').body
      .firstElementChild as HTMLDivElement
  }
  private draw(points: Point[]) {
    if (points.length > 0) {
      let width = this.canvas.width
      let height = this.canvas.height
      const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

      ctx.strokeStyle = 'red'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(points[0].X * width, points[0].Y * height)
      for (let i = 1; i < points.length; i++) {
        const point = points[i]
        ctx.lineTo(point.X * width, point.Y * height)
      }
      ctx.stroke()

      ctx.closePath()
    }
  }
  private loadPolygon(polygon: Point[]) {
    let points = [...polygon]
    if (points.length > 1) {
      let first = polygon[0]
      let last = polygon[polygon.length - 1]
      if (!PointTool.equals(first, last)) {
        points.push(first)
      }
    }
    this.draw(points)
  }
}
