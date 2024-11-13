export interface EventMessageData<T = any> {
  command: string
  value?: T
  index: number
}
