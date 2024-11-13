import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'

export class AIAnalysisTaskListTableArgs {
  duration = DateTimeTool.allDay(new Date())
  name?: string
  type?: number
  state?: number
}
