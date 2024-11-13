import { EventEmitter } from '../../common/event-emitter'
import { wait } from '../../common/tools/wait'
import '../window/window.less'
import { PictureWindowEvent } from './window-picture.event'
import './window-picture.less'
import { CavnasParams } from './window-picture.model'

export class PictureWindowHtmlController {
  constructor() {
    this.regist()
    this.init()
  }

  event: EventEmitter<PictureWindowEvent> = new EventEmitter()

  private element = {
    title: document.getElementById('title') as HTMLDivElement,
    content: document.getElementById('content') as HTMLDivElement,
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
    buttons: {
      close: document.getElementById('close') as HTMLButtonElement,
    },
  }
  private inited = false
  private init() {
    wait(
      () => {
        return (
          this.element.content.clientWidth > 0 &&
          this.element.content.clientHeight > 0
        )
      },
      () => {
        this.element.canvas.width = this.element.content.clientWidth
        this.element.canvas.height = this.element.content.clientHeight
        this.inited = true
      }
    )
  }

  private regist() {
    this.element.buttons.close.addEventListener('click', () => {
      this.event.emit('close')
    })
  }

  draw(params: CavnasParams) {
    if (
      params.area &&
      params.area.Coordinates &&
      params.area.Coordinates.length > 0
    ) {
      let width = this.element.canvas.width
      let height = this.element.canvas.height
      const ctx = this.element.canvas.getContext(
        '2d'
      ) as CanvasRenderingContext2D

      ctx.strokeStyle = params.color
      ctx.lineWidth = 2

      let points = params.area.Coordinates

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

  load(title: string, img: string, areas: CavnasParams[] = []) {
    this.element.title.innerHTML = title
    this.element.content.style.backgroundImage = `url(${img})`

    wait(
      () => {
        return this.inited
      },
      () => {
        areas.forEach((x) => {
          this.draw(x)
        })
      }
    )
  }
}
