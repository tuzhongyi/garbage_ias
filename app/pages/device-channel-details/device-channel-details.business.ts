import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class DeviceChannelDetailsBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load(id: string) {
    return this.service.input.proxy.channel.get(id)
  }

  create(data: InputProxyChannel) {
    return this.service.input.proxy.channel.create(data)
  }

  update(data: InputProxyChannel) {
    return this.service.input.proxy.channel.update(data)
  }
}
