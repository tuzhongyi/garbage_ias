import { VideoWindowModel } from './window-video.model'

export interface VideoWindowEvent {
  close(): void
}
export interface VideoWindowMessageRequestEvent {
  confirm_open(args: VideoWindowModel): void
}
export interface VideoWindowMessageResponseEvent {
  close(): void
}
