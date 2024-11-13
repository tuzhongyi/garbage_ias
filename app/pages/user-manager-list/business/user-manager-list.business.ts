import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class UserManagerListBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  async load() {
    return this.service.security.user.array()
  }

  async delete(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      this.service.security.user.delete(ids[i])
    }
    return true
  }
}
