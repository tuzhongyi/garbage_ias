import { EventEmitter } from '../../common/event-emitter'
import { wait } from '../../common/tools/wait'
import '../window/window.less'
import { VideoGPSWindowPlayerController } from './controller/window-video-gps-player.controller'
import { VideoGPSWindowPositionController } from './controller/window-video-gps-position.controller'
import { VideoGPSWindowEvent } from './window-video-gps.event'
import './window-video-gps.less'
import { CavnasParams } from './window-video-gps.model'

export class VideoGPSWindowHtmlController {
  constructor() {
    this.regist()
    this.init()
  }

  event: EventEmitter<VideoGPSWindowEvent> = new EventEmitter()

  private element = {
    title: document.getElementById('title') as HTMLDivElement,
    content: document.getElementById('content') as HTMLDivElement,
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
    buttons: {
      close: document.getElementById('close') as HTMLButtonElement,
    },
  }
  player = new VideoGPSWindowPlayerController()
  position = new VideoGPSWindowPositionController()
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
    this.player.event.on('time', (stamp) => {
      this.position.to(stamp)
    })
    this.player.event.on('error', (e) => {
      this.event.emit('error', e)
    })
    this.position.event.on('trigger', (item) => {
      let time = item.OffsetTime.toSeconds()
      this.player.seek(time)
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

  load(title: string, src: string, areas: CavnasParams[] = []) {
    this.element.title.innerHTML = title

    wait(
      () => {
        return this.inited
      },
      () => {
        this.player.play(src)
        areas.forEach((x) => {
          this.draw(x)
        })
      }
    )
  }
}
