import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { DeviceInfo } from '../../data-core/models/arm/device-info.model'
import { SystemDeviceInfoEvent } from './system-device-info.event'

import './system-device-info.less'

export class SystemDeviceInfoHtmlController {
  event: EventEmitter<SystemDeviceInfoEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  element = {
    Name: document.getElementById('Name') as HTMLInputElement,

    Model: document.getElementById('Model') as HTMLInputElement,
    SerialNumber: document.getElementById('SerialNumber') as HTMLInputElement,
    DeviceType: document.getElementById('DeviceType') as HTMLInputElement,
    FirmwareVersion: document.getElementById(
      'FirmwareVersion'
    ) as HTMLInputElement,
    FirmwareBuildDate: document.getElementById(
      'FirmwareBuildDate'
    ) as HTMLInputElement,
    Company: document.getElementById('Company') as HTMLInputElement,
    OS: document.getElementById('OS') as HTMLInputElement,
    Hardware: document.getElementById('Hardware') as HTMLInputElement,
    HardwareVersion: document.getElementById(
      'HardwareVersion'
    ) as HTMLInputElement,
    Vendor: document.getElementById('Vendor') as HTMLInputElement,
    CustomizedInfo: document.getElementById(
      'CustomizedInfo'
    ) as HTMLInputElement,
    Wireless: document.getElementById('Wireless') as HTMLSelectElement,
    HddNumber: document.getElementById('HddNumber') as HTMLInputElement,
    IOInNumber: document.getElementById('IOInNumber') as HTMLInputElement,
    IOOutNumber: document.getElementById('IOOutNumber') as HTMLInputElement,
    MaxIPCNumber: document.getElementById('MaxIPCNumber') as HTMLInputElement,

    save: document.getElementById('save') as HTMLButtonElement,
  }

  regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }

  load(data: DeviceInfo) {
    this.element.Company.value = data.Company
    this.element.Name.value = data.Name
    this.element.Model.value = data.Model
    this.element.SerialNumber.value = data.SerialNumber
    this.element.DeviceType.value = data.DeviceType
    this.element.FirmwareVersion.value = data.FirmwareVersion
    this.element.FirmwareBuildDate.value =
      data.FirmwareBuildDate.format('yyyy-MM-dd')
    this.element.Company.value = data.Company
    this.element.OS.value = data.OS
    this.element.Hardware.value = data.Hardware
    this.element.HardwareVersion.value = data.HardwareVersion
    this.element.Vendor.value = HtmlTool.set(data.Vendor)
    this.element.CustomizedInfo.value = HtmlTool.set(data.CustomizedInfo)
    this.element.Wireless.value = HtmlTool.set(data.Wireless)
    this.element.HddNumber.value = data.HddNumber.toString()
    this.element.IOInNumber.value = data.IOInNumber.toString()
    this.element.IOOutNumber.value = data.IOOutNumber.toString()
    this.element.MaxIPCNumber.value = data.MaxIPCNumber.toString()
  }
}
