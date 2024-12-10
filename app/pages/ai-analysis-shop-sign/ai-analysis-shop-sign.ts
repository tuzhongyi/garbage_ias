import { LocationTool } from '../../common/tools/location.tool'
import { ShopSign } from '../../data-core/models/arm/analysis/shop-sign.model'
import { AIAnalysisShopSignBusiness } from './ai-analysis-shop-sign.business'
import { AIAnalysisShopSignHtmlController } from './ai-analysis-shop-sign.html.controller'
import { AIAnalysisShopSignMessage } from './ai-analysis-shop-sign.message'
import { AIAnalysisShopSignWindow } from './ai-analysis-shop-sign.window'

export namespace AIAnalysisShopSign {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new AIAnalysisShopSignHtmlController()
    private business = new AIAnalysisShopSignBusiness()
    private message = new AIAnalysisShopSignMessage()
    private window = new AIAnalysisShopSignWindow()
    private datas: ShopSign[] = []

    get query() {
      if (location.search.length === 0) return undefined
      return LocationTool.query.decode(location.search)
    }
    get id() {
      return this.query?.id
    }

    async load() {
      this.html.clear()
      this.datas = await this.business.load(this.id)
      this.html.load(this.datas)
    }

    regist() {
      this.html.event.on('close', () => {
        this.message.close()
      })

      this.html.list.event.on('delete', (id) => {
        this.window.confirm.id = id
        this.window.confirm.message = '确认删除这个商铺招牌识别信息吗？'
        this.message.confirm(this.window.confirm)
      })
      this.message.event.on('result', (result) => {
        if (result && this.window.confirm.id) {
          this.ondelete(this.window.confirm.id)
        }
      })
    }

    ondelete(id: string) {
      this.business.delete(id).then((x) => {
        this.load()
      })
    }
  }

  let controller = new Controller()
}
