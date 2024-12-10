import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { ShopSign } from '../../data-core/models/arm/analysis/shop-sign.model'
import '../window/window.less'
import { AIAnalysisShopSignEvent } from './ai-analysis-shop-sign.event'
import './ai-analysis-shop-sign.less'
import { AIAnalysisShopSignListController } from './controller/ai-analysis-shop-sign-list.controller'
export class AIAnalysisShopSignHtmlController {
  event: EventEmitter<AIAnalysisShopSignEvent> = new EventEmitter()
  list = new AIAnalysisShopSignListController()

  constructor() {
    this.init()
    this.regist()
  }
  private element = {
    close: document.getElementById('close') as HTMLButtonElement,
  }

  private init() {}

  private regist() {
    this.element.close.addEventListener('click', () => {
      this.event.emit('close')
    })
  }

  load(datas: ShopSign[] = []) {
    this.list.load(datas)
  }

  clear() {
    this.list.clear()
  }
}
