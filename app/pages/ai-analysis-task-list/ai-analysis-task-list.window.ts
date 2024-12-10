import { WindowModel } from '../window/window.model'

export class AIAnalysisTaskListWindow {
  details = new DetailsWindow()
  record = new RecordWindow()
}

class DetailsWindow extends WindowModel {
  clear() {}
  style = {
    width: '800px',
    height: '620px',
  }
  url: string = '../ai-analysis-task-details/ai-analysis-task-details.html'
}
class RecordWindow extends WindowModel {
  clear() {}
  style = {
    width: '85%',
    height: '85%',
  }
  url = '../ai-analysis-task-result/ai-analysis-task-result.html'
}
