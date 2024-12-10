import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'

export class AIAnalysisShopListTableArgs {
  marking?: boolean
  telphone?: string
  name?: string
  confidence?: number
}
export class AIAnalysisShopListTableFilter extends AIAnalysisShopListTableArgs {
  duration = DateTimeTool.allYear(new Date())
  states: number[] = []

  asc?: string
  desc?: string
}
