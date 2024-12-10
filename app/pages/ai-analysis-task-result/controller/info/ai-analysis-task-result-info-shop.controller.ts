import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { Shop } from '../../../../data-core/models/arm/analysis/shop.model'

export class AIAnalysisTaskResultInfoShopController {
  private element = {
    id: document.getElementById('shop-id') as HTMLInputElement,
    name: document.getElementById('shop-name') as HTMLInputElement,
    address: document.getElementById('shop-address') as HTMLInputElement,
    telphone: document.getElementById('shop-telphone') as HTMLInputElement,
  }

  load(shop: Shop) {
    this.element.id.value = HtmlTool.set(shop.Id)
    this.element.name.value = HtmlTool.set(shop.Name)
    this.element.address.value = HtmlTool.set(shop.Address)
    this.element.telphone.value = HtmlTool.set(shop.Telphone)
  }
}
