import * as fs from 'file-saver'
import { FactoryResetMode } from '../../data-core/enums/factory-reset-mode.enum'
import { DeviceInfo } from '../../data-core/models/arm/device-info.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'
export class SystemMaintainConfigBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)
  _device?: DeviceInfo

  async device() {
    if (!this._device) {
      this._device = await this.service.device.get()
    }
    return this._device
  }

  reboot() {
    return this.service.reboot()
  }
  shutdown() {
    return this.service.shutdown()
  }

  factory = {
    reset: (mode: FactoryResetMode) => {
      return this.service.factory.reset(mode)
    },
  }

  configuration = {
    download: () => {
      this.device().then((device) => {
        this.service.data.configuration.download().then((data) => {
          let suffix = 'zip'
          let filename = `${device.SerialNumber}.${suffix}`
          let blob = new Blob([data], {
            type: 'application/x-zip-compressed',
          })
          fs.saveAs(blob, filename)
        })
      })
    },
    file: undefined as any,
    upload: (file: ArrayBuffer) => {
      return this.service.data.configuration.upload(file)
    },
  }
}
