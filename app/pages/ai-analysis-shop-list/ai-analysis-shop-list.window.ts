import { WindowModel } from '../window/window.model'

export class AIAnalysisShopListWindow {
  details = new DetailsWindow()
  record = new RecordWindow()
}

class DetailsWindow extends WindowModel {
  clear() {}
  style = {
    width: '800px',
    height: '500px',
  }
  url: string = '../ai-analysis-shop-details/ai-analysis-shop-details.html'
}
class RecordWindow extends WindowModel {
  clear() {}
  style = {
    width: '55%',
    height: 'calc(81% + 50px)',
  }
  url = '../ai-analysis-shop-sign/ai-analysis-shop-sign.html'
}
