import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { AnalysisServer } from '../../data-core/models/arm/analysis/analysis-server.model'
import { AIAnalysisServerInfoBusiness } from './ai-analysis-server-info.business'
import { AIAnalysisServerInfoHtmlController } from './ai-analysis-server-info.html.controller'
import { AIAnalysisServerInfoMessage } from './ai-analysis-server-info.message'
import { AIAnalysisServerInfoWindow } from './ai-analysis-server-info.window'

export namespace AIAnalysisServerInfo {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new AIAnalysisServerInfoHtmlController()
    private business = new AIAnalysisServerInfoBusiness()
    private message = new AIAnalysisServerInfoMessage()
    private window = new AIAnalysisServerInfoWindow()

    private async load() {
      try {
        let data = await this.business.load()
        this.html.load(data)
      } catch (error) {
        MessageBar.error('智能分析服务器获取失败')
      }
    }

    regist() {
      this.html.event.on('save', () => {
        this.message.info_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.tosave.bind(this))
    }

    check(data?: AnalysisServer) {
      if (!data) {
        return false
      }
      let args = CheckTool.AnalysisServer(data)
      if (!args.result) {
        MessageBar.warning(args.message)
      }
      return true
    }

    tosave() {
      let data = this.html.get()
      if (this.check(data)) {
        this.business
          .update(data)
          .then(() => {
            MessageBar.success('保存成功')
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }
  }

  const controller = new Controller()
}
