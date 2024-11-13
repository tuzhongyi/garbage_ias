import { HTMLInputCheckboxElementTool } from './html-input-checkbox.tool'
import { HTMLInputNumberElementTool } from './html-input-number.tool'

export class HTMLInputElementTool {
  number = new HTMLInputNumberElementTool()
  checkbox = new HTMLInputCheckboxElementTool()
}
