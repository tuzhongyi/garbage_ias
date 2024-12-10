import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowMessageData, WindowModel } from '../window/window.model'

export interface ArmMainEventArgs {
  logout(): void
}

export interface MainWindowMessageEvent {
  message<T = any>(data: WindowMessageData<T>): void
  result(result: ResultArgs): void
  confirm(args: ConfirmWindowModel): void
}

export interface MainMessageResponseEvent {
  message<T = any>(data: WindowMessageData<T>): void
  result(result: ResultArgs): void
}
export interface MainMessageRequestEvent {
  message<T = any>(data: WindowMessageData<T>): void
  open(args: WindowModel): void
  confirm(args: ConfirmWindowModel): void
  result(args: ResultArgs): void
}
export interface MainWindowMessageResponseEvent {
  message?<T = any>(data: WindowMessageData<T>): void
  close(index: number): void
  result(args: ResultArgs): void
  confirm?(args: ConfirmWindowModel): void
}

export interface ResultArgs<T = any> {
  index: number
  result: boolean
  message?: string
  inner?: boolean
  data?: T
}
