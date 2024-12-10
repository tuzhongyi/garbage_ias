import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmAnalysisRequestService } from '../../data-core/requests/services/analysis/analysis.service'
import { GetShopsParams } from '../../data-core/requests/services/analysis/shop/analysis-shop.params'
import { MediumRequestService } from '../../data-core/requests/services/medium/medium.service'
import { AIAnalysisShopListTableFilter } from './ai-analysis-shop-list.model'

export class AIAnalysisShopListBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmAnalysisRequestService(this.client.http)
  medium = new MediumRequestService()

  load(index: number, size: number, args: AIAnalysisShopListTableFilter) {
    let params = new GetShopsParams()
    params.PageIndex = index
    params.PageSize = size
    params.BeginTime = args.duration.begin
    params.EndTime = args.duration.end
    params.Name = args.name
    params.Telphone = args.telphone
    params.Marking = args.marking
    params.Confidence = args.confidence

    params.ObjectStates =
      0 < args.states.length && args.states.length < 3 ? args.states : undefined
    params.Asc = args.asc
    params.Desc = args.desc
    return this.service.shop.list(params)
  }

  picture(url: string) {
    return this.medium.picture(url)
  }
}
