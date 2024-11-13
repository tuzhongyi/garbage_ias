import { instanceToPlain, plainToInstance } from 'class-transformer'
import { PackageConfig } from '../../../../models/arm/config/package-config.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'

export class SystemConfigRequestService {
  constructor(private http: HowellAuthHttp) {}

  private _package?: SystemConfigPackageRequestService
  public get package(): SystemConfigPackageRequestService {
    if (!this._package) {
      this._package = new SystemConfigPackageRequestService(this.http)
    }
    return this._package
  }
}

class SystemConfigPackageRequestService {
  constructor(private http: HowellAuthHttp) {}

  async get() {
    let url = ArmSystemUrl.config.package()
    let response = await this.http.get<HowellResponse<PackageConfig>>(url)
    return plainToInstance(PackageConfig, response.Data)
  }
  async update(data: PackageConfig) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.config.package()
    let response = await this.http.put<any, HowellResponse<PackageConfig>>(
      url,
      plain
    )
    if (response.FaultCode === 0) {
      return plainToInstance(PackageConfig, response.Data)
    }
    throw new Error(response.FaultReason)
  }
}
