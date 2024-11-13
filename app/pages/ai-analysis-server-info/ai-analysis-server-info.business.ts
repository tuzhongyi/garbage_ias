import { AnalysisServer } from '../../data-core/models/arm/analysis/analysis-server.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmServerAnalysisRequestService } from '../../data-core/requests/services/servers/server-analysis.service'

export class AIAnalysisServerInfoBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmServerAnalysisRequestService(this.client.http)

  private _servers: AnalysisServer[] = []
  async load() {
    if (this._servers.length === 0) {
      this._servers = await this.service.array()
    }
    if (this._servers.length > 0) {
      return this._servers[0]
    }
    throw new Error('AnalysisServer is null')
  }

  update(data: AnalysisServer) {
    return this.service.update(data)
  }
}
