import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmAnalysisRequestService } from '../../data-core/requests/services/analysis/analysis.service'
import { MediumRequestService } from '../../data-core/requests/services/medium/medium.service'

export class AIAnalysisShopSignBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmAnalysisRequestService(this.client.http)
  medium = new MediumRequestService()

  load(id: string) {
    return this.service.shop.sign.array(id)
  }

  picture(id: string) {
    return this.medium.picture(id)
  }

  delete(id: string) {
    return this.service.shop.sign.delete(id)
  }
}
