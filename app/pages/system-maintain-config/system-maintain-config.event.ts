import { FactoryResetMode } from '../../data-core/enums/factory-reset-mode.enum'

export interface SystemMaintainConfigEvent {
  reboot(): void
  shutdown(): void
  factoryreset(mode: FactoryResetMode): void
  configdownload(): void

  configupload(file: ArrayBuffer): void
  upgradeupload(file: ArrayBuffer): void
}
