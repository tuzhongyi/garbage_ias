import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { VideoSourceChannel } from '../../data-core/models/arm/video-source-channel.model'
import { VideoSourceDescriptor } from '../../data-core/models/arm/video-source-descriptor.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'
import { DeviceChannelDiscoverChannelBusiness } from './device-channel-discover-channel.business'

export class DeviceChannelDiscoverBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)
  channel = new DeviceChannelDiscoverChannelBusiness(this.service)

  async load() {
    let channels = await this.channel.load()
    let hosts = channels.map((x) => x.SourceChannel.HostAddress)
    let datas = await this.getData()
    for (let i = 0; i < datas.length; i++) {
      if (hosts.includes(datas[i].HostAddress)) {
        datas.splice(i, 1)
        i--
      }
    }

    return datas
  }

  getData() {
    return this.service.input.proxy.search()
  }

  async create(
    datas: VideoSourceDescriptor[],
    username: string,
    password: string
  ) {
    let channels = datas.map((x) => this.convert(x, username, password))
    for (let i = 0; i < channels.length; i++) {
      await this.service.input.proxy.channel.create(channels[i])
    }
    return true
  }

  convert(video: VideoSourceDescriptor, username: string, password: string) {
    let channel = new InputProxyChannel()
    channel.Id = 0
    channel.PositionNo = 1
    channel.Name = video.HostAddress
    channel.SourceChannel = new VideoSourceChannel()
    channel.SourceChannel.DeviceId = video.DeviceId
    channel.SourceChannel.HostAddress = video.HostAddress
    channel.SourceChannel.PortNo = video.PortNo
    channel.SourceChannel.ProtocolType = video.ProtocolType
    channel.SourceChannel.UserName = username
    channel.SourceChannel.Password = password
    channel.SourceChannel.DeviceModel = video.DeviceModel
    channel.SourceChannel.SerialNumber = video.SerialNumber
    channel.SourceChannel.ChannelNo = 1
    channel.SourceChannel.WebPortNo = video.WebPortNo

    return channel
  }
}
