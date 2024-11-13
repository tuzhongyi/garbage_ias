import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class DeviceChannelDiscoverChannelBusiness {
  constructor(private service: ArmSystemRequestService) {}

  private loaded = false
  private channels: InputProxyChannel[] = []

  async load() {
    if (this.loaded) {
      return this.channels
    }
    this.channels = await this.service.input.proxy.channel.array()
    this.loaded = true
    return this.channels
  }
}
