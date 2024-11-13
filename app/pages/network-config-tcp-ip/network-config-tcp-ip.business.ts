import { NetworkInterface } from '../../data-core/models/arm/network-interface.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class NetworkConfigTCPIPBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load() {
    return this.service.network.interface.array()
  }

  update(data: NetworkInterface) {
    return this.service.network.interface.update(data)
  }

  reboot() {
    return this.service.reboot()
  }
}
