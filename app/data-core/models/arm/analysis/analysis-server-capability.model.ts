import { EnumNameValue } from '../../capabilities/enum-name-value.model'
import { IModel } from '../../model.interface'

/**	AnalysisServerCapability (分析服务器能力)	*/
export class AnalysisServerCapability implements IModel {
  /**	EnumNameValue[]	任务类型	O	*/
  TaskTypes?: EnumNameValue[]
  /**	EnumNameValue[]	任务状态	O	*/
  TaskStates?: EnumNameValue[]
  /**	EnumNameValue[]	来源协议类型	O	*/
  VideoSourceProtocolTypes?: EnumNameValue[]
  /**	EnumNameValue[]	来源模型	O	*/
  VideoSourceModes?: EnumNameValue[]
}
