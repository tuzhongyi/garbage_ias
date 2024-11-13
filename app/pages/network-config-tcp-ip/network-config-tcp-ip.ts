import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { AddressingType } from '../../data-core/enums/addressing-type.enum'
import { NetworkInterfaceDuplex } from '../../data-core/enums/network-interface-duplex.enum'
import { NetworkInterfaceSpeed } from '../../data-core/enums/network-interface-speed.enum'
import { IPAddress } from '../../data-core/models/arm/ip-address.model'
import { IPv4Address } from '../../data-core/models/arm/ip-v4-address.model'
import { NetworkInterface } from '../../data-core/models/arm/network-interface.model'
import { NetworkConfigTCPIPBusiness } from './network-config-tcp-ip.business'
import { NetworkConfigTCPIPHtmlController } from './network-config-tcp-ip.html.controller'
import { NetworkConfigTCPIPMessage } from './network-config-tcp-ip.message'
import { NetworkConfigTCPIPWindow } from './network-config-tcp-ip.window'

export namespace NetworkConfigTCPIP {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new NetworkConfigTCPIPHtmlController()
    private message = new NetworkConfigTCPIPMessage()
    private business = new NetworkConfigTCPIPBusiness()
    private window = new NetworkConfigTCPIPWindow()
    datas: NetworkInterface[] = []

    async load() {
      this.datas = await this.business.load()

      if (this.datas && this.datas.length > 0) {
        this.html.init(this.datas.length)
        this.html.load(this.datas[0])
      }
    }
    regist() {
      this.html.event.on('select', (index) => {
        this.html.load(this.datas[index])
      })
      this.html.event.on('save', (index) => {
        this.window.confirm.id = index
        this.window.confirm.message = '是否保存网络信息参数？'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', () => {
        if (this.window.confirm.id !== undefined) {
          this.tosave(this.window.confirm.id)
        }
      })
      this.message.event.on('reboot', this.toreboot.bind(this))
    }

    tosave(index: number) {
      if (this.datas && this.datas.length > index) {
        let data = this.datas[index]
        data.AutoNegotiation = this.html.element.AutoNegotiation.checked
        if (!data.AutoNegotiation) {
          data.Speed = this.html.element.Speed.value as NetworkInterfaceSpeed
          data.Duplex = this.html.element.Duplex.value as NetworkInterfaceDuplex
        }
        data.MTU = parseInt(this.html.element.MTU.value)
        if (!data.IPAddress) {
          data.IPAddress = new IPAddress()
        }
        data.IPAddress.AddressingType = this.html.element.IPAddress
          .AddressingType.checked
          ? AddressingType.Dynamic
          : AddressingType.Static
        if (!data.IPAddress.IPv4Address) {
          data.IPAddress.IPv4Address = new IPv4Address()
        }
        if (data.IPAddress.AddressingType === AddressingType.Static) {
          data.IPAddress.IPv4Address.Address =
            this.html.element.IPAddress.IPv4.IPAddress.value
          data.IPAddress.IPv4Address.SubnetMask =
            this.html.element.IPAddress.IPv4.SubnetMask.value
          data.IPAddress.IPv4Address.DefaultGateway =
            this.html.element.IPAddress.IPv4.Gateway.value
        }
        data.IPAddress.IPv4Address.PrimaryDNS =
          this.html.element.IPAddress.IPv4.PrimaryDNS.value
        data.IPAddress.IPv4Address.SecondaryDNS =
          this.html.element.IPAddress.IPv4.SecondaryDNS.value

        this.business
          .update(data)
          .then((x) => {
            MessageBar.success('操作成功')
            this.onreboot()
          })
          .catch((e) => {
            MessageBar.error('操作失败')
          })
      }
    }

    onreboot() {
      this.window.confirm.clear()
      this.window.confirm.message = '重启设备后生效，是否重启设备？'
      this.message.reboot_confirm(this.window.confirm)
    }
    toreboot() {
      this.business
        .reboot()
        .then((x) => {
          MessageBar.success('重启成功')
        })
        .catch((e) => {
          MessageBar.error('重启失败')
        })
    }
  }

  const controller = new Controller()
}
