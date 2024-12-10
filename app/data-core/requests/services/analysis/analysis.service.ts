import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { ArmAnalysisServerRequestService } from './server/analysis-server.service'
import { ArmAnalysisShopRequestService } from './shop/analysis-shop.service'

export class ArmAnalysisRequestService {
  constructor(private http: HowellAuthHttp) {}

  private _server?: ArmAnalysisServerRequestService
  public get server(): ArmAnalysisServerRequestService {
    if (!this._server) {
      this._server = new ArmAnalysisServerRequestService(this.http)
    }
    return this._server
  }

  private _shop?: ArmAnalysisShopRequestService
  public get shop(): ArmAnalysisShopRequestService {
    if (!this._shop) {
      this._shop = new ArmAnalysisShopRequestService(this.http)
    }
    return this._shop
  }
}
