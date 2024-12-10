import { Shop } from '../../data-core/models/arm/analysis/shop.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmAnalysisRequestService } from '../../data-core/requests/services/analysis/analysis.service'

export class AIAnalysisShopDetailsBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmAnalysisRequestService(this.client.http)

  load(id: string) {
    return this.service.shop.get(id)
  }

  update(data: Shop) {
    return this.service.shop.update(data)
  }
}
