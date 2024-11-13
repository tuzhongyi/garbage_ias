import { WindowModel } from '../../pages/window/window.model'

export interface MessageProxyEvent {
  open: <T extends WindowModel>(args: T) => void
  close: <T = any>(args?: T) => void
}
