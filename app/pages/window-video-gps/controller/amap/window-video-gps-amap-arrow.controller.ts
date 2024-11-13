import { LocalStorageService } from '../../../../common/local-storage/local-storage.service'
import { MapTool } from '../../../../common/tools/map-tool/map.tool'

export class VideoGPSWindowAMapArrowController {
  constructor(private map: AMap.Map) {
    this.init()
    this.regist()
  }

  private element = {
    focus: document.getElementById('map_focus') as HTMLDivElement,
    img: document.getElementById('img_1') as HTMLLinkElement,
  }
  private _arrow?: any
  private get arrow() {
    if (!this._arrow) {
      this._arrow = new AMap.Marker({
        map: this.map,
        icon: this.element.img.href,
        offset: new AMap.Pixel(-18, -18),
      })
    }
    return this._arrow
  }
  private _focus = false
  get focus() {
    return this._focus
  }
  set focus(value: boolean) {
    this._focus = value
    if (this._focus) {
      this.element.focus.className = 'selected'
    } else {
      this.element.focus.className = ''
    }
  }

  private init() {
    this.focus = LocalStorageService.gps.get()
  }
  private regist() {
    this.element.focus.addEventListener('click', () => {
      this.focus = !this.focus
      LocalStorageService.gps.save(this.focus)
    })
  }

  set(position: number[]) {
    this.arrow.setPosition(position)
    if (this.focus) {
      this.center(position)
    }
  }

  center(position: number[]) {
    this.map.setCenter(position)
  }

  direction(position: number[][]) {
    let angle = MapTool.direction(
      position[0][1],
      position[0][0],
      position[1][1],
      position[1][0]
    )

    this.arrow.setAngle(angle)
  }
}
