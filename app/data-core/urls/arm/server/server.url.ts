import { BaseUrl } from '../../base.url'
import { AnalysisServerUrl } from './analysis-server.url'

export class ArmServerUrl {
  static get analysis() {
    return new AnalysisServerUrl(BaseUrl.arm)
  }
}
