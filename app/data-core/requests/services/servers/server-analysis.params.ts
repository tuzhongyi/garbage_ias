import { PagedDurationParams } from '../../../models/params.interface'

export class GetAnalysisTaskListParams extends PagedDurationParams {
  /**	String	任务名称	O	*/
  Name?: string
  /**	Strng[]	任务ID	O	*/
  TaskIds?: string[]
  /**	Int32	任务类型	O	*/
  TaskType?: number
  /**	Int32	任务状态	O	*/
  TaskState?: number
  /**	Int32	分组ID	O	*/
  GroupId?: number
}

export class GetAnalysisTaskResultListParams extends PagedDurationParams {
  /**	String	任务名称	O	*/
  Name?: string
  /**	Strng[]	任务ID	O	*/
  TaskIds?: string[]
  /**	Int32	任务类型	O	*/
  TaskType?: number
  /**	Int32	分组ID	O	*/
  GroupId?: number
}
