import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'

export interface DeviceChannelListTableEvent {
  select(datas: InputProxyChannel[]): void
  modify: (id: string) => void
  picture: (id: string) => void
}
export interface DeviceChannelListEvent {
  create(): void
  delete(ids: string[]): void
  discover(): void
  search(text: string): void
  recordstart(ids: string[]): void
  recordstop(ids: string[]): void
}
