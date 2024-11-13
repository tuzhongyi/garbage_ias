import { PictureWindowModel } from './window-picture.model'

export interface PictureWindowEvent {
  close(): void
}
export interface PictureWindowMessageRequestEvent {
  confirm_open(args: PictureWindowModel): void
}
export interface PictureWindowMessageResponseEvent {
  close(): void
}
