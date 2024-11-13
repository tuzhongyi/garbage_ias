import { SSH } from '../../data-core/models/arm/ssh.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class NetworkConfigSSHBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load() {
    return this.service.network.ssh.get()
  }
  update(data: SSH) {
    return this.service.network.ssh.update(data)
  }
}
