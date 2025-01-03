import { wait } from '../../../../common/tools/wait'
import { ShopSign } from '../../../../data-core/models/arm/analysis/shop-sign.model'
import { AIAnalysisTaskResultMapLayerController } from './ai-analysis-task-result-map-layer.controller'
declare var AMap: any
export class AIAnalysisTaskResultMapController {
  constructor() {
    this.map = this.init()
    this.regist()
  }

  private map: AMap.Map

  private layer!: AIAnalysisTaskResultMapLayerController
  private inited = false
  private loaded = false

  private init() {
    return new AMap.Map('container', {
      resizeEnable: true,
      zoom: 17,
      zooms: [2, 20],
      showIndoorMap: false,
    })
  }
  private regist() {
    this.map.on('complete', () => {
      this.layer = new AIAnalysisTaskResultMapLayerController(this.map)
      this.inited = true
    })
  }
  private _load(datas: ShopSign[]) {
    return new Promise<void>((resolve) => {
      this.layer.load(datas).then((x) => {
        this.map.setFitView(x)
        this.loaded = true
        resolve()
      })
    })
  }

  select(id: string) {
    wait(
      () => {
        return this.inited && this.loaded
      },
      () => {
        this.layer.select(id)
      }
    )
  }

  async load(data: ShopSign[]) {
    return new Promise<void>((resolve) => {
      wait(
        () => {
          return this.inited
        },
        () => {
          this._load(data).then(() => {
            resolve()
          })
        }
      )
    })
  }

  clear() {
    this.layer.clear()
    this.loaded = false
  }
}
