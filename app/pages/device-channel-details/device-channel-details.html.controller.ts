import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { DeviceProtocolType } from '../../data-core/enums/device-protocol-type.enum'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { Manager } from '../../data-core/requests/managers/manager'

import '../window/window.less'
import { DeviceChannelDetailsEvent } from './device-channel-details.event'
import './device-channel-details.less'

export class DeviceChannelDetailsHtmlController {
  constructor() {
    this.init()
    this.regist()
  }

  event: EventEmitter<DeviceChannelDetailsEvent> = new EventEmitter()

  private element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    PositionNo: document.getElementById('PositionNo') as HTMLInputElement,
    HostAddress: document.getElementById('HostAddress') as HTMLInputElement,
    PortNo: document.getElementById('PortNo') as HTMLInputElement,
    ProtocolType: document.getElementById('ProtocolType') as HTMLSelectElement,
    ChannelNo: document.getElementById('ChannelNo') as HTMLInputElement,
    UserName: document.getElementById('UserName') as HTMLInputElement,
    Password: document.getElementById('Password') as HTMLInputElement,
    DeviceId: document.getElementById('DeviceId') as HTMLInputElement,
    SerialNumber: document.getElementById('SerialNumber') as HTMLInputElement,
    WebPortNo: document.getElementById('WebPortNo') as HTMLInputElement,
    DeviceModel: document.getElementById('DeviceModel') as HTMLSelectElement,
    PositionNoLanguage: document.getElementById(
      'PositionNoLanguage'
    ) as HTMLSpanElement,
    buttons: {
      ok: document.getElementById('ok') as HTMLButtonElement,
      cancel: document.getElementById('cancel') as HTMLButtonElement,
    },
  }
  private inited = false

  init() {
    Manager.capability.inputproxy
      .then((x) => {
        if (x.DeviceProtocolTypes) {
          this.element.ProtocolType.innerHTML = ''
          x.DeviceProtocolTypes.forEach((item, index) => {
            let _item: IIdNameModel = {
              Id: item.Value,
              Name: item.Name,
            }
            HtmlTool.select.append(_item, this.element.ProtocolType)
          })
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }

  regist() {
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
    this.element.PositionNo.addEventListener('input', () => {
      this.changePositionNo(parseInt(this.element.PositionNo.value))
    })
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.PositionNo,
      (value) => {
        this.changePositionNo(value)
      }
    )
  }

  changePositionNo(value: number) {
    this.element.PositionNoLanguage.innerHTML =
      Language.ChannelPositionNo(value)
  }

  private _load(data: InputProxyChannel) {
    this.element.Name.value = data.Name
    this.element.PositionNo.value = data.PositionNo?.toString() ?? ''
    this.element.HostAddress.value = data.SourceChannel.HostAddress
    this.element.PortNo.value = data.SourceChannel.PortNo.toString()
    this.element.ProtocolType.value = data.SourceChannel.ProtocolType
    this.element.ChannelNo.value = data.SourceChannel.ChannelNo.toString()
    this.element.UserName.value = data.SourceChannel.UserName ?? ''
    this.element.Password.value = data.SourceChannel.Password ?? ''
    this.element.DeviceId.value = data.SourceChannel.DeviceId ?? ''
    this.element.SerialNumber.value = data.SourceChannel.SerialNumber ?? ''
    this.element.WebPortNo.value =
      data.SourceChannel.WebPortNo?.toString() ?? ''
    this.element.DeviceModel.value = data.SourceChannel.DeviceModel ?? ''

    this.changePositionNo(data.PositionNo ?? 1)
  }

  load(data: InputProxyChannel) {
    wait(
      () => this.inited,
      () => this._load(data)
    )
  }

  get(source?: InputProxyChannel): InputProxyChannel {
    let data = source ?? InputProxyChannel.create()
    data.Name = this.element.Name.value
    data.PositionNo = HtmlTool.get(this.element.PositionNo.value, 'number')
    data.SourceChannel.HostAddress = this.element.HostAddress.value
    data.SourceChannel.PortNo = HtmlTool.get(
      this.element.PortNo.value,
      'number'
    )
    data.SourceChannel.ProtocolType = this.element.ProtocolType
      .value as DeviceProtocolType
    data.SourceChannel.ChannelNo = HtmlTool.get(
      this.element.ChannelNo.value,
      'number'
    )
    data.SourceChannel.UserName = HtmlTool.get(this.element.UserName.value)
    data.SourceChannel.Password = HtmlTool.get(this.element.Password.value)
    data.SourceChannel.DeviceId = HtmlTool.get(this.element.DeviceId.value)
    data.SourceChannel.SerialNumber = HtmlTool.get(
      this.element.SerialNumber.value
    )
    data.SourceChannel.WebPortNo = HtmlTool.get(
      this.element.WebPortNo.value,
      'number'
    )
    data.SourceChannel.DeviceModel = HtmlTool.get(
      this.element.DeviceModel.value
    )
    return data
  }
}
