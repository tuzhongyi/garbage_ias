export class WindowModel<T extends IWindowQuery = any> {
  index = 0
  query: T = {} as T

  style: any = {}
  url = ''
}
export interface WindowMessageData<T = any> {
  index: number
  data: T
}

export interface IWindowQuery {
  [key: string]: string | undefined
}
