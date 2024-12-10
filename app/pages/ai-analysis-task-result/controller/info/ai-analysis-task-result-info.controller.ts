import { EventEmitter } from '../../../../common/event-emitter'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { ShopSign } from '../../../../data-core/models/arm/analysis/shop-sign.model'
import { Paged } from '../../../../data-core/models/page-list.model'
import { AIAnalysisTaskResultInfoPictureController } from './ai-analysis-task-result-info-picture.controller'
import { AIAnalysisTaskResultInfoShopController } from './ai-analysis-task-result-info-shop.controller'

interface AIAnalysisTaskResultInfoEvent {
  next: () => void
  prev: () => void
}

export class AIAnalysisTaskResultInfoController {
  event = new EventEmitter<AIAnalysisTaskResultInfoEvent>()
  shop = new AIAnalysisTaskResultInfoShopController()
  picture = new AIAnalysisTaskResultInfoPictureController()
  constructor() {
    this.regist()
  }

  private element = {
    info: {
      name: document.getElementById('Text') as HTMLInputElement,
      time: document.getElementById('Time') as HTMLInputElement,
      confidence: document.getElementById('Confidence') as HTMLInputElement,
    },
    page: {
      count: document.getElementById('page-count') as HTMLDivElement,
      index: document.getElementById('page-index') as HTMLInputElement,
      next: document.getElementById('page-next') as HTMLButtonElement,
      prev: document.getElementById('page-prev') as HTMLButtonElement,
    },
  }

  load(paged: Paged<ShopSign>) {
    this.element.info.name.value = HtmlTool.set(paged.Data.Text)
    this.element.info.time.value = HtmlTool.set(paged.Data.Time, '', {
      format: 'yyyy-MM-dd HH:mm:ss.SSS',
    })
    this.element.info.confidence.value = HtmlTool.set(
      paged.Data.Confidence,
      '',
      {
        percent: true,
      }
    )

    this.element.page.count.innerText = HtmlTool.set(
      paged.Page.TotalRecordCount
    )
    this.element.page.index.innerText = HtmlTool.set(paged.Page.PageIndex)
    // this.element.page.index.style.width = `${this.element.page.count.offsetWidth}px`
  }

  private init() {}

  private regist() {
    this.element.page.next.addEventListener('click', (e) => {
      this.event.emit('next')
    })
    this.element.page.prev.addEventListener('click', (e) => {
      this.event.emit('prev')
    })
  }
}
