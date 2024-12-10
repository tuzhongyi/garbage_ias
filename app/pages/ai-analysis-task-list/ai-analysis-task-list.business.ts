import { HowellHttpClient } from '../../data-core/requests/http-client'
import { GetAnalysisTaskListParams } from '../../data-core/requests/services/analysis/server/analysis-server.params'
import { ArmAnalysisServerRequestService } from '../../data-core/requests/services/analysis/server/analysis-server.service'
import { MediumRequestService } from '../../data-core/requests/services/medium/medium.service'
import { AIAnalysisTaskListTableArgs } from './ai-analysis-task-list.model'

export class AIAnalysisTaskListBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmAnalysisServerRequestService(this.client.http)
  medium = new MediumRequestService()

  load(index: number, size: number, args: AIAnalysisTaskListTableArgs) {
    let params = new GetAnalysisTaskListParams()
    params.PageIndex = index
    params.PageSize = size
    params.BeginTime = args.duration.begin
    params.EndTime = args.duration.end
    params.TaskType = args.type
    params.TaskState = args.state
    params.Name = args.name
    return this.service.task.list(params)
  }

  async delete(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      this.service.delete(ids[i])
    }
    return true
  }
  picture(url: string) {
    return this.medium.picture(url)
  }
}
