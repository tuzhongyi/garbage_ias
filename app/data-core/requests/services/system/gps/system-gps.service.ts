import { instanceToPlain, plainToInstance } from 'class-transformer'
import { GpsConfig } from '../../../../models/arm/gps/gps-config.model'
import { GpsInfo } from '../../../../models/arm/gps/gps-info.model'
import { GpsCapability } from '../../../../models/capabilities/arm/gps-capability.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../../service-process'

export class SystemGpsRequestService {
  constructor(private http: HowellAuthHttp) {}
  capability() {
    let url = ArmSystemUrl.gps.capability()
    return this.http.get<HowellResponse<GpsCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, GpsCapability)
    })
  }
  private _config?: SystemGpsConfigRequestService
  public get config(): SystemGpsConfigRequestService {
    if (!this._config) {
      this._config = new SystemGpsConfigRequestService(this.http)
    }
    return this._config
  }

  private _info?: SystemGpsInfoRequestService
  public get info(): SystemGpsInfoRequestService {
    if (!this._info) {
      this._info = new SystemGpsInfoRequestService(this.http)
    }
    return this._info
  }
}

class SystemGpsConfigRequestService {
  constructor(private http: HowellAuthHttp) {}

  async get() {
    let url = ArmSystemUrl.gps.config()
    let response = await this.http.get<HowellResponse<GpsConfig>>(url)
    return plainToInstance(GpsConfig, response.Data)
  }
  async update(data: GpsConfig) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.gps.config()
    let response = await this.http.put<any, HowellResponse<GpsConfig>>(
      url,
      plain
    )
    if (response.FaultCode === 0) {
      return plainToInstance(GpsConfig, response.Data)
    }
    throw new Error(response.FaultReason)
  }
}
class SystemGpsInfoRequestService {
  constructor(private http: HowellAuthHttp) {}

  async get() {
    let url = ArmSystemUrl.gps.info()
    let response = await this.http.get<HowellResponse<GpsInfo>>(url)
    if (response.FaultCode === 0) {
      if (response.Data) {
        return plainToInstance(GpsInfo, response.Data)
      }
      throw new Error('No data')
    }
    throw new Error(response.FaultReason)
  }
}
