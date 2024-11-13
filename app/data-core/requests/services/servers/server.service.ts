import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { ArmServerAnalysisRequestService } from './server-analysis.service'

export class ArmServerRequestService {
  constructor(private http: HowellAuthHttp) {}

  private _analysis?: ArmServerAnalysisRequestService
  public get analysis(): ArmServerAnalysisRequestService {
    if (!this._analysis) {
      this._analysis = new ArmServerAnalysisRequestService(this.http)
    }
    return this._analysis
  }
}
