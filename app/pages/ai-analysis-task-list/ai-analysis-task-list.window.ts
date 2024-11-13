import { WindowModel } from '../window/window.model'

export class AIAnalysisTaskListWindow {
  details = new DetailsWindow()
}

class DetailsWindow extends WindowModel {
  clear() {}
  style = {
    width: '800px',
    height: '620px',
  }
  url: string = '../ai-analysis-task-details/ai-analysis-task-details.html'
}
