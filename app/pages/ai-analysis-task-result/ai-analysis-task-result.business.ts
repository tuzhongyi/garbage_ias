import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmAnalysisRequestService } from '../../data-core/requests/services/analysis/analysis.service'
import { GetShopSignsParams } from '../../data-core/requests/services/analysis/shop/analysis-shop.params'
import { MediumRequestService } from '../../data-core/requests/services/medium/medium.service'
import { AIAnalysisTaskResultArgs } from './ai-analysis-task-result.model'

export class AIAnalysisTaskResultBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmAnalysisRequestService(this.client.http)
  medium = new MediumRequestService()
  load(args: AIAnalysisTaskResultArgs) {
    let params = new GetShopSignsParams()
    if (args.taskId) {
      params.TaskIds = [args.taskId]
    }
    if (args.channel) {
      params.CameraNos = [args.channel]
    }
    if (args.type) {
      params.SignTypes = [args.type]
    }

    return this.service.shop.sign.all(params)
  }

  task(taskId: string) {
    return this.service.server.task.get(taskId)
  }
  shop(id: string) {
    return this.service.shop.get(id)
  }

  picture(id: string) {
    return this.medium.picture(id)
  }
}
