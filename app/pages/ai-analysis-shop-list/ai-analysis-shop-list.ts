import { ShopObjectState } from '../../data-core/enums/analysis/shop-object-state.enum'
import { Shop } from '../../data-core/models/arm/analysis/shop.model'
import { Page } from '../../data-core/models/page-list.model'
import { AIAnalysisShopListBusiness } from './ai-analysis-shop-list.business'
import { AIAnalysisShopListHtmlController } from './ai-analysis-shop-list.html.controller'
import { AIAnalysisShopListMessage } from './ai-analysis-shop-list.message'
import {
  AIAnalysisShopListTableArgs,
  AIAnalysisShopListTableFilter,
} from './ai-analysis-shop-list.model'
import { AIAnalysisShopListWindow } from './ai-analysis-shop-list.window'

export namespace AIAnalysisShopList {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new AIAnalysisShopListHtmlController()
    private business = new AIAnalysisShopListBusiness()
    private message = new AIAnalysisShopListMessage()
    private window = new AIAnalysisShopListWindow()
    filter = new AIAnalysisShopListTableFilter()
    datas: Shop[] = []
    page?: Page

    async init() {
      this.filter.states = [
        ShopObjectState.Created,
        ShopObjectState.Disappeared,
      ]
      this.filter.desc = 'BeginTime'
      this.html.load(this.filter)
    }

    regist() {
      this.html.event.on('begin', (date) => {
        this.filter.duration.begin = date
      })
      this.html.event.on('end', (date) => {
        this.filter.duration.end = date
      })
      this.html.event.on('states', (x) => {
        this.filter.states = x ?? []
      })
      this.html.event.on('search', (args: AIAnalysisShopListTableArgs) => {
        this.filter.confidence = args.confidence
        this.filter.name = args.name
        this.filter.telphone = args.telphone
        this.filter.marking = args.marking
        this.load(1)
      })
      this.html.table.event.on('page', (index: number) => {
        this.load(index)
      })

      this.html.table.event.on('details', (item) => {
        this.window.details.clear()
        this.window.details.query.id = item.Id
        this.message.details(this.window.details)
      })
      this.html.table.event.on('record', (item) => {
        this.window.record.clear()
        this.window.record.query.id = item.Id
        this.message.record(this.window.record)
      })
      this.html.table.event.on('asc', (name) => {
        this.filter.desc = undefined
        this.filter.asc = name
        let index = this.page?.PageIndex ?? 1
        this.load(index)
      })
      this.html.table.event.on('desc', (name) => {
        this.filter.asc = undefined
        this.filter.desc = name
        let index = this.page?.PageIndex ?? 1
        this.load(index)
      })
    }

    async load(index: number, size: number = 12) {
      this.html.table.clear()
      this.business.load(index, size, this.filter).then((paged) => {
        this.datas = paged.Data
        this.page = paged.Page
        this.html.table.load(this.datas, this.page)
      })
    }
  }

  let controller = new Controller()
}
