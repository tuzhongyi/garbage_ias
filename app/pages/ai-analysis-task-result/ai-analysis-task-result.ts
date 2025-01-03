import { LocationTool } from '../../common/tools/location.tool'
import { AIAnalysisTaskResultBusiness } from './ai-analysis-task-result.business'
import { AIAnalysisTaskResultHtmlController } from './ai-analysis-task-result.html.controller'
import { AIAnalysisTaskResultMessage } from './ai-analysis-task-result.message'
import { AIAnalysisTaskResultArgs } from './ai-analysis-task-result.model'

export namespace AIAnalysisTaskResult {
  class Controller {
    constructor() {
      this.init()
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

    private args = new AIAnalysisTaskResultArgs()

    private init() {
      this.args.taskId = this.id
      if (this.id) {
        this.business.task(this.id).then((x) => {
          this.html.load(x)
        })
      }
    }

    load() {
      this.business.load(this.args).then((x) => {
        this.html.table.load(x)
        this.html.map.load(x)
      })
    }
    clear() {
      this.html.table.clear()
      this.html.map.clear()
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
      this.html.table.filter.event.on('channel', (value) => {
        this.args.channel = value
        this.clear()
        this.load()
      })
      this.html.table.filter.event.on('type', (value) => {
        this.args.type = value
        this.clear()
        this.load()
      })
    }
  }

  const controller = new Controller()
}
