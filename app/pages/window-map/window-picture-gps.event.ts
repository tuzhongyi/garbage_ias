import { PictureGPSWindowModel } from './window-picture-gps.model'

export interface PictureGPSWindowEvent {
  close(): void
}
export interface PictureGPSWindowMessageRequestEvent {
  confirm_open(args: PictureGPSWindowModel): void
}
export interface PictureGPSWindowMessageResponseEvent {
  close(): void
}
