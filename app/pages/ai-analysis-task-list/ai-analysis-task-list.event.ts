import { AnalysisTask } from '../../data-core/models/arm/analysis/analysis-task.model'

export interface AIAnalysisTaskListEvent {
  search(name?: string): void
  create(): void

  begin(time: Date): void
  end(time: Date): void
  type(value?: number): void
  state(value?: number): void
}
export interface AIAnalysisTaskListHtmlTableEvent {
  page(index: number): void
  record(item: AnalysisTask): void
}
