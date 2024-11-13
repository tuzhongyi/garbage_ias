import { VideoGPSWindowModel } from './window-video-gps.model'

export interface VideoGPSWindowEvent {
  close(): void
  error(e: Error): void
}
export interface VideoGPSWindowMessageRequestEvent {
  confirm_open(args: VideoGPSWindowModel): void
}
export interface VideoGPSWindowMessageResponseEvent {
  close(): void
}
