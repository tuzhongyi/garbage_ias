import { IModel } from '../model.interface'

/**	EnumNameValue (枚举类型)	*/
export class EnumNameValue implements IModel {
  /**	String	枚举数值	M	*/
  Value!: string
  /**	String	枚举名称	M	*/
  Name!: string
}
