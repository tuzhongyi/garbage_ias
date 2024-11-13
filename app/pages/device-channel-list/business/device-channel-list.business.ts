import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'
import { DeviceChannelListRecordBusiness } from './device-channel-list-record.business'

export class DeviceChannelListBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)
  public record = new DeviceChannelListRecordBusiness(this.service)

  async load() {
    return this.service.input.proxy.channel.array()
  }

  async delete(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      this.service.input.proxy.channel.delete(ids[i])
    }
    return true
  }

  picture(id: string) {
    return this.service.input.proxy.channel.picture(parseInt(id))
  }
}
