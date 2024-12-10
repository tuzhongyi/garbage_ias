import { Shop } from '../../data-core/models/arm/analysis/shop.model'
import { AIAnalysisShopListTableArgs } from './ai-analysis-shop-list.model'

export interface AIAnalysisShopListEvent {
  search(args: AIAnalysisShopListTableArgs): void

  begin(time: Date): void
  end(time: Date): void
  states(value?: number[]): void
}
export interface AIAnalysisShopListHtmlTableEvent {
  page(index: number): void
  details(data: Shop): void
  record(data: Shop): void
  asc(name: string): void
  desc(name: string): void
}
