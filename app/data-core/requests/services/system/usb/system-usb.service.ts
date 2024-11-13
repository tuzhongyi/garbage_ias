import { plainToInstance } from 'class-transformer'
import { UsbDeviceInfo } from '../../../../models/arm/usb/usb-device-Info.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'

export class SystemUsbRequestService {
  constructor(private http: HowellAuthHttp) {}

  private _device?: SystemUsbDeviceRequestService
  public get device(): SystemUsbDeviceRequestService {
    if (!this._device) {
      this._device = new SystemUsbDeviceRequestService(this.http)
    }
    return this._device
  }
}

class SystemUsbDeviceRequestService {
  constructor(private http: HowellAuthHttp) {}

  async array() {
    let url = ArmSystemUrl.usb.device()
    let response = await this.http.get<HowellResponse<UsbDeviceInfo[]>>(url)
    if (response.FaultCode === 0) {
      return plainToInstance(UsbDeviceInfo, response.Data)
    }
    throw new Error(response.FaultReason)
  }
}
