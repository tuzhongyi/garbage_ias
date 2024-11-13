import { VideoSourceDescriptor } from '../../data-core/models/arm/video-source-descriptor.model'

export interface DeviceChannelDiscoverEvent {
  refresh(): void
  password(items: VideoSourceDescriptor[]): void
  search(text: string): void
  ok(): void
  cancel(): void
}
