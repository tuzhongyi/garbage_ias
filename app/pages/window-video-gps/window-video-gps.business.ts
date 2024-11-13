import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ParseGpsItemParams } from '../../data-core/requests/services/system/file/system-file.param'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class VideoGPSWindowBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load(name: string) {
    let params = new ParseGpsItemParams()
    params.FileName = name
    return this.service.file.gps(params)
  }
}
