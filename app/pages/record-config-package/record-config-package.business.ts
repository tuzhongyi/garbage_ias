import { PackageConfig } from '../../data-core/models/arm/config/package-config.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class RecordConfigPackageBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load() {
    return this.service.config.package.get()
  }

  update(data: PackageConfig) {
    return this.service.config.package.update(data)
  }
}
