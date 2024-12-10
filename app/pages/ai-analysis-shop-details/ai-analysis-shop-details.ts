import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { Shop } from '../../data-core/models/arm/analysis/shop.model'
import { AIAnalysisShopDetailsBusiness } from './ai-analysis-shop-details.business'
import { AIAnalysisShopDetailsHtmlController } from './ai-analysis-shop-details.html.controller'
import { AIAnalysisShopDetailsMessage } from './ai-analysis-shop-details.message'

export namespace AIAnalysisShopDetails {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new AIAnalysisShopDetailsHtmlController()
    private business = new AIAnalysisShopDetailsBusiness()
    private message = new AIAnalysisShopDetailsMessage()
    data?: Shop
    async init() {
      if (this.id) {
        this.data = await this.business.load(this.id)
        if (this.data) {
          this.html.load(this.data)
        }
      }
    }

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    check(data: Shop) {
      let args = CheckTool.Shop(data)
      if (args.result) {
        return true
      }
      this.message.result(args)
      return false
    }

    oncancel() {
      this.message.close()
    }
    onok() {
      if (this.data) {
        this.data = this.html.get(this.data)
        if (!this.check(this.data)) return
        this.business
          .update(this.data)
          .then((x) => {
            this.message.result({
              result: true,
            })
            this.message.close()
          })
          .catch((e) => {
            this.message.result({
              result: false,
            })
          })
      }
    }

    get id() {
      if (location.search.length === 0) return undefined
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }
  }

  const controller = new Controller()
}
