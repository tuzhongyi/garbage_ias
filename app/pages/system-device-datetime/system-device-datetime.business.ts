import { instanceToPlain, plainToInstance } from 'class-transformer'
import { SystemTime } from '../../data-core/models/arm/system-time.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class SystemDeviceDatetimeBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)
  load() {
    return this.service.time.get()
  }
  update(model: SystemTime) {
    let plain = instanceToPlain(model)
    let data = plainToInstance(SystemTime, plain)
    return this.service.time.update(data)
  }
}
