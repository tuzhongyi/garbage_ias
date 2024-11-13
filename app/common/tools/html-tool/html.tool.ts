import { HtmlElementTool } from './html-element.tool'
import { HTMLImageElementTool } from './html-img.tool'
import { HTMLInputElementTool } from './html-input.tool'
import { HtmlMIMETool } from './html-mime.tool'
import { HTMLSelectElementTool } from './html-select.tool'
import { HTMLTableElementTool } from './html-table.tool'

export class HtmlTool {
  static element = new HtmlElementTool()
  static select = new HTMLSelectElementTool()
  static input = new HTMLInputElementTool()
  static table = new HTMLTableElementTool()
  static img = new HTMLImageElementTool()
  static mime = new HtmlMIMETool()

  static get(value: string): string
  static get(value: string, type: 'number'): number
  static get(value: string, type: 'boolean'): boolean
  static get(value: string, type: 'string' | 'number' | 'boolean' = 'string') {
    if (type === 'number') {
      return parseInt(value)
    } else if (type === 'boolean') {
      return value.toLowerCase() === 'true'
    } else if (type === 'string') {
      if (value) {
        return value.trim()
      }
    }

    return undefined
  }

  static set(
    value?: string | number | boolean | Date,
    def: string = '',
    format = 'yyyy-MM-dd HH:mm:ss'
  ): string {
    if (value == undefined || value == null) {
      return def
    } else if (typeof value === 'number') {
      return value.toString()
    } else if (typeof value === 'boolean') {
      return JSON.stringify(value)
    } else if (value instanceof Date) {
      return value.format(format)
    } else {
      return value
    }
  }
}
