import { LocationTool } from '../../common/tools/location.tool'
import { AIAnalysisTaskResultBusiness } from './ai-analysis-task-result.business'
import { AIAnalysisTaskResultHtmlController } from './ai-analysis-task-result.html.controller'
import { AIAnalysisTaskResultMessage } from './ai-analysis-task-result.message'

export namespace AIAnalysisTaskResult {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }

    private business = new AIAnalysisTaskResultBusiness()
    private message = new AIAnalysisTaskResultMessage()
    private html = new AIAnalysisTaskResultHtmlController()

    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    load() {
      if (this.id) {
        this.business.task(this.id).then((x) => {
          this.html.load(x)
        })
        this.business.load(this.id).then((x) => {
          this.html.table.load(x)
          this.html.map.load(x)
        })
      }
    }

    regist() {
      this.html.event.on('close', () => {
        this.message.close()
      })
      this.html.table.event.on('select', (paged) => {
        if (paged.Data.ShopId) {
          this.business.shop(paged.Data.ShopId).then((x) => {
            this.html.info.shop.load(x)
          })
        }
        if (paged.Data.ImageUrl) {
          let url = this.business.picture(paged.Data.ImageUrl)
          this.html.info.picture.load(url, paged.Data.Polygon)
        }
      })
    }
  }

  const controller = new Controller()
}
