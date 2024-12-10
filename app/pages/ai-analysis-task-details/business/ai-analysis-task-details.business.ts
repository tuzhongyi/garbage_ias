import { AnalysisTask } from '../../../data-core/models/arm/analysis/analysis-task.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmAnalysisServerRequestService } from '../../../data-core/requests/services/analysis/server/analysis-server.service'
import { AIAnalysisTaskDetailsFileBusiness } from './ai-analysis-task-details-file.business'

export class AIAnalysisTaskDetailsBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmAnalysisServerRequestService(this.client.http)

  file = new AIAnalysisTaskDetailsFileBusiness(this.client.http)

  create(data: AnalysisTask) {
    data.CreationTime = new Date()
    return this.service.task.create(data)
  }
}
