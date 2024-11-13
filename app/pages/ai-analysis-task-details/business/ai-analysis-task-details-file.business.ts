import { EventEmitter } from '../../../common/event-emitter'
import { HowellAuthHttp } from '../../../data-core/requests/auth/howell-auth-http'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'
import {
  AIAnalysisTaskDetailsFile,
  AIAnalysisTaskDetailsFileProgress,
} from '../ai-analysis-task-details.model'

interface FileEvent {
  progress(args: AIAnalysisTaskDetailsFileProgress): void
}

export class AIAnalysisTaskDetailsFileBusiness {
  event = new EventEmitter<FileEvent>()

  constructor(http: HowellAuthHttp) {
    this.service = new ArmSystemRequestService(http)
  }

  private service: ArmSystemRequestService

  upload(file: AIAnalysisTaskDetailsFile) {
    return this.service.file.upload(file.data, (value: number) => {
      this.event.emit('progress', { name: file.name, value })
    })
  }
}
