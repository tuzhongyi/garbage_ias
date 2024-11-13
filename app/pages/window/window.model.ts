export class WindowModel<T extends IWindowQuery = any> {
  query: T = {} as T

  style: any = {}
  url = ''
}

export interface IWindowQuery {
  [key: string]: string | undefined
}
