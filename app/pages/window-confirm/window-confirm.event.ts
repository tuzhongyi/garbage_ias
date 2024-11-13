import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from './window-confirm.model'

export interface ConfirmWindowEvent {
  ok(): void
  cancel(): void
}
export interface ConfirmWindowMessageRequestEvent {
  confirm_open(args: ConfirmWindowModel): void
}
export interface ConfirmWindowMessageResponseEvent {
  confirm_close(): void
  confirm_result(result: ResultArgs): void
}
