export interface SystemMaintainLogEvent {
  search(date: Date): void
  download(date: Date): void
}
