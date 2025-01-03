import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'

export class AIAnalysisTaskListTableArgs {
  duration = DateTimeTool.beforeDay(new Date(), 365)
  name?: string
  type?: number
  state?: number
}
