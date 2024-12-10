import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIModelDTOLabel } from '../../data-core/models/arm/camera-ai-model-dto-label.model'
import { CameraAIModel } from '../../data-core/models/arm/camera-ai-model.model'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'

export class AIAnalysisTaskResultSource {
  channels!: Promise<InputProxyChannel[]>
  aimodels!: Promise<CameraAIModel[]>
  type!: EventType
}

export interface IAIEventRuleController<T> {
  load(data: T): void
  get(data?: T): T
  init(labels: CameraAIModelDTOLabel[]): void
}
