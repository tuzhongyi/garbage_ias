import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export interface ArmMainEventArgs {
  logout(): void
}

export interface MainWindowMessageEvent {
  result(result: ResultArgs): void
}

export interface MainMessageResponseEvent {
  result(result: ResultArgs): void
}
export interface MainMessageRequestEvent {
  open(args: WindowModel): void
  confirm(args: ConfirmWindowModel): void
}
export interface MainWindowMessageResponseEvent {
  close(): void
  result(args: ResultArgs): void
}

export interface ResultArgs {
  result: boolean
  message?: string
  inner?: boolean
}
