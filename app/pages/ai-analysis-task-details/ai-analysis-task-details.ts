import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { AnalysisTask } from '../../data-core/models/arm/analysis/analysis-task.model'
import { AIAnalysisTaskDetailsHtmlController } from './ai-analysis-task-details.html.controller'
import { AIAnalysisTaskDetailsMessage } from './ai-analysis-task-details.message'
import { AIAnalysisTaskDetailsBusiness } from './business/ai-analysis-task-details.business'

export namespace AIAnalysisTaskDetails {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new AIAnalysisTaskDetailsHtmlController()
    private business = new AIAnalysisTaskDetailsBusiness()
    private message = new AIAnalysisTaskDetailsMessage()

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
      this.html.file.event.on('upload', (data) => {
        this.business.file.upload(data).then((x) => {
          this.html.file.load(x)
        })
      })
      this.business.file.event.on('progress', (args) => {
        this.html.file.progress(args)
      })
    }

    check(data: AnalysisTask) {
      let args = CheckTool.AnalysisTask(data)
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
      try {
        let data = this.html.get()
        if (!this.check(data)) return
        this.business
          .create(data)
          .then((x) => {
            this.message.result({
              index: 0,
              result: true,
            })
            this.message.close()
          })
          .catch((e) => {
            this.message.result({
              index: 0,
              result: false,
              message: e.message,
              inner: true,
            })
          })
      } catch (e) {
        console.error(e)
        this.message.result({
          index: 0,
          result: false,
          message: (e as any).message,
          inner: true,
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
