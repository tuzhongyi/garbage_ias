import { DeviceInfo } from '../../data-core/models/arm/device-info.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class SystemDeviceInfoBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load() {
    return this.service.device.get()
  }

  update(data: DeviceInfo) {
    return this.service.device.update(data)
  }
}
