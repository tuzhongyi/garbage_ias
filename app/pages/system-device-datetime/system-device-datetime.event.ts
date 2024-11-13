import { NTPTimeMode } from '../../data-core/enums/ntp-time-mode.enum'

export interface SystemDeviceDatetimeHtmlEventArgs {
  save: () => void
  onmodechange: (mode: NTPTimeMode) => void
  onsyncchange: (is: boolean) => void
}
