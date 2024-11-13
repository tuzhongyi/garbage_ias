import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class DeviceChannelListRecordBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async start(ids: string[]) {
    let datas = []
    for (let i = 0; i < ids.length; i++) {
      let result = await this.service.input.proxy.channel.record.start(ids[i])
      datas.push(result)
    }
    return datas
  }
  async stop(ids: string[]) {
    let datas = []
    for (let i = 0; i < ids.length; i++) {
      let result = await this.service.input.proxy.channel.record.stop(ids[i])
      datas.push(result)
    }
    return datas
  }
}
