import { wait } from '../../../../common/tools/wait'
import { ShopSign } from '../../../../data-core/models/arm/analysis/shop-sign.model'
import { AIAnalysisTaskResultMapPointController as Point } from './ai-analysis-task-result-map-point.controller'
declare var AMap: any
export class AIAnalysisTaskResultMapController {
  constructor() {
    this.map = this.init()
    this.regist()
  }

  private map: AMap.Map

  private points: Point[] = []
  private inited = false
  private loaded = false

  private init() {
    return new AMap.Map('container', {
      resizeEnable: true,
      zoom: 17,
      zooms: [2, 20],
    })
  }
  private regist() {
    this.map.on('complete', () => {
      this.inited = true
    })
  }
  private append(data: ShopSign) {
    if (data.Location) {
      let point = new Point(data, this.map)
      this.points.push(point)
    }
  }

  private _load(datas: ShopSign[]) {
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i]
      if (data.Location) {
        this.append(data)
      }
    }
    this.map.setFitView(null, true)
    this.loaded = true
  }

  private _select(id: string) {
    this.points.forEach((x) => {
      x.blue()
    })
    let selected = this.points.find((x) => {
      return x.data.Id === id
    })
    if (selected) {
      selected.select()
    }
  }
  select(id: string) {
    wait(
      () => {
        return this.inited && this.loaded
      },
      () => {
        this._select(id)
      }
    )
  }

  load(data: ShopSign[]) {
    wait(
      () => {
        return this.inited
      },
      () => {
        this._load(data)
      }
    )
  }
}
