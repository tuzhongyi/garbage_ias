import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { AddressingType } from '../../data-core/enums/addressing-type.enum'
import { NetworkInterface } from '../../data-core/models/arm/network-interface.model'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { Manager } from '../../data-core/requests/managers/manager'
import { NetworkConfigTCPIPEvent } from './network-config-tcp-ip.event'

import './network-config-tcp-ip.less'

export class NetworkConfigTCPIPHtmlController {
  constructor() {
    this._init()
    this.regist()
  }

  event: EventEmitter<NetworkConfigTCPIPEvent> = new EventEmitter()

  element = {
    Interface: document.getElementById('Interface') as HTMLSelectElement,
    AutoNegotiation: document.getElementById(
      'AutoNegotiation'
    ) as HTMLInputElement,
    Speed: document.getElementById('Speed') as HTMLSelectElement,
    Duplex: document.getElementById('Duplex') as HTMLSelectElement,
    MTU: document.getElementById('MTU') as HTMLInputElement,
    MACAddress: document.getElementById('MACAddress') as HTMLInputElement,
    IPAddress: {
      AddressingType: document.getElementById(
        'AddressingType'
      ) as HTMLInputElement,
      IPv4: {
        IPAddress: document.getElementById('IPv4Address') as HTMLInputElement,
        SubnetMask: document.getElementById(
          'IPv4SubnetMask'
        ) as HTMLInputElement,
        Gateway: document.getElementById(
          'IPv4DefaultGateway'
        ) as HTMLInputElement,
        PrimaryDNS: document.getElementById('PrimaryDNS') as HTMLInputElement,
        SecondaryDNS: document.getElementById(
          'SecondaryDNS'
        ) as HTMLInputElement,
      },
    },
    save: document.getElementById('save') as HTMLButtonElement,
  }
  private inited = false

  private _init() {
    Manager.capability.network
      .then((x) => {
        if (x.NetworkInterfaceDuplexs) {
          this.element.Duplex.innerHTML = ''
          x.NetworkInterfaceDuplexs.forEach((y) => {
            let item: IIdNameModel = {
              Id: y.Value,
              Name: y.Name,
            }
            HtmlTool.select.append(item, this.element.Duplex)
          })
        }
        if (x.NetworkInterfaceSpeeds) {
          this.element.Speed.innerHTML = ''
          x.NetworkInterfaceSpeeds.forEach((y) => {
            let item: IIdNameModel = {
              Id: y.Value,
              Name: y.Name,
            }
            HtmlTool.select.append(item, this.element.Speed)
          })
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }

  private regist() {
    this.element.Interface.addEventListener('change', () => {
      this.event.emit('select', parseInt(this.element.Interface.value))
    })
    this.element.AutoNegotiation.addEventListener(
      'change',
      this.onnegotiationchange.bind(this)
    )
    this.element.IPAddress.AddressingType.addEventListener(
      'change',
      this.ontypechange.bind(this)
    )
    this.element.save.addEventListener('click', () => {
      this.event.emit('save', parseInt(this.element.Interface.value))
    })
    HtmlTool.input.number.mousewheelchangevalue(this.element.MTU)
  }

  private onnegotiationchange() {
    this.element.Speed.disabled = this.element.AutoNegotiation.checked
    this.element.Duplex.disabled = this.element.AutoNegotiation.checked
  }
  private ontypechange() {
    this.element.IPAddress.IPv4.IPAddress.disabled =
      this.element.IPAddress.AddressingType.checked
    this.element.IPAddress.IPv4.SubnetMask.disabled =
      this.element.IPAddress.AddressingType.checked
    this.element.IPAddress.IPv4.Gateway.disabled =
      this.element.IPAddress.AddressingType.checked
  }

  private appendInterface(index: number) {
    let option = document.createElement('option')
    option.value = index.toString()
    option.innerHTML = `网口${index + 1}`
    this.element.Interface.appendChild(option)
  }

  init(count: number = 0) {
    for (let i = 0; i < count; i++) {
      this.appendInterface(i)
    }
  }

  private _load(data: NetworkInterface) {
    this.element.AutoNegotiation.checked = data.AutoNegotiation
    this.onnegotiationchange()
    this.element.MTU.value = data.MTU.toString()
    this.element.MACAddress.value = data.MACAddress
    this.element.Duplex.value = data.Duplex ?? ''
    this.element.Speed.value = data.Speed ?? ''
    this.element.IPAddress.AddressingType.checked =
      data.IPAddress.AddressingType === AddressingType.Dynamic
    this.ontypechange()
    this.element.IPAddress.IPv4.IPAddress.value =
      data.IPAddress.IPv4Address.Address
    this.element.IPAddress.IPv4.SubnetMask.value =
      data.IPAddress.IPv4Address.SubnetMask
    this.element.IPAddress.IPv4.Gateway.value =
      data.IPAddress.IPv4Address.DefaultGateway
    this.element.IPAddress.IPv4.PrimaryDNS.value =
      data.IPAddress.IPv4Address.PrimaryDNS ?? ''
    this.element.IPAddress.IPv4.SecondaryDNS.value =
      data.IPAddress.IPv4Address.SecondaryDNS ?? ''
  }
  load(data: NetworkInterface) {
    wait(
      () => this.inited,
      () => this._load(data)
    )
  }
}
