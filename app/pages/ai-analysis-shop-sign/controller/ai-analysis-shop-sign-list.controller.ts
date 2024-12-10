import { EventEmitter } from '../../../common/event-emitter'
import { ShopSign } from '../../../data-core/models/arm/analysis/shop-sign.model'
import { AIAnalysisShopSignListItemController } from './ai-analysis-shop-sign-list-item/ai-analysis-shop-sign-list-item'

interface AIAnalysisShopSignListEvent {
  delete(id: string): void
}

export class AIAnalysisShopSignListController {
  event = new EventEmitter<AIAnalysisShopSignListEvent>()

  element = {
    list: document.getElementById('list') as HTMLDivElement,
  }

  load(datas: ShopSign[]) {
    for (let i = 0; i < datas.length; i++) {
      let item = new AIAnalysisShopSignListItemController(
        this.element.list,
        datas[i]
      )
      item.event.on('delete', (id) => {
        this.event.emit('delete', id)
      })
    }
  }
  clear() {
    this.element.list.innerHTML = ''
  }
}
