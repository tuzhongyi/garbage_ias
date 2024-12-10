import { AnalysisTask } from '../../data-core/models/arm/analysis/analysis-task.model'
import { Page } from '../../data-core/models/page-list.model'
import { AIAnalysisTaskListBusiness } from './ai-analysis-task-list.business'
import { AIAnalysisTaskListHtmlController } from './ai-analysis-task-list.html.controller'
import { AIAnalysisTaskListMessage } from './ai-analysis-task-list.message'
import { AIAnalysisTaskListTableArgs } from './ai-analysis-task-list.model'
import { AIAnalysisTaskListWindow } from './ai-analysis-task-list.window'

export namespace AIAnalysisTaskList {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new AIAnalysisTaskListHtmlController()
    private business = new AIAnalysisTaskListBusiness()
    private message = new AIAnalysisTaskListMessage()
    private window = new AIAnalysisTaskListWindow()
    args = new AIAnalysisTaskListTableArgs()
    datas: AnalysisTask[] = []
    page?: Page

    async init() {}

    regist() {
      this.html.event.on('begin', (date) => {
        this.args.duration.begin = date
      })
      this.html.event.on('end', (date) => {
        this.args.duration.end = date
      })
      this.html.event.on('type', (x) => {
        this.args.type = x
      })
      this.html.event.on('state', (x) => {
        this.args.state = x
      })
      this.html.event.on('search', (name?: string) => {
        this.args.name = name
        this.load(1)
      })
      this.html.event.on('create', () => {
        this.window.details.clear()
        this.message.create(this.window.details)
      })
      this.html.table.event.on('page', (index: number) => {
        this.load(index)
      })
      this.html.table.event.on('record', (item) => {
        this.window.record.clear()
        this.window.record.query.id = item.Id
        this.message.record(this.window.record)
      })
    }

    async load(index: number, size: number = 12) {
      this.html.table.clear()
      this.business.load(index, size, this.args).then((paged) => {
        this.datas = paged.Data
        this.page = paged.Page
        this.html.table.load(this.datas, this.page)
      })
    }
  }

  let controller = new Controller()
}
