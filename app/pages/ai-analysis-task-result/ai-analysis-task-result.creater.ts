import { EventType } from '../../data-core/enums/event-type.enum'
import { DropWarningRule } from '../../data-core/models/arm/analysis/rules/drop-warning-rule.model'
import { GarbageDropRule } from '../../data-core/models/arm/analysis/rules/garbage-drop-rule.model'
import { IllegalDropRule } from '../../data-core/models/arm/analysis/rules/illegal-drop-rule.model'
import { MixedIntoRule } from '../../data-core/models/arm/analysis/rules/mixed-into-rule.model'
import { Polygon } from '../../data-core/models/arm/polygon.model'

export class AIAnalysisTaskResultCreater {
  static fromType(type: EventType) {
    switch (type) {
      case EventType.IllegalDrop:
        return this.IllegalDropRule()
      case EventType.MixedInto:
        return this.MixedIntoRule()
      case EventType.DropWarning:
        return this.DropWarningRule()
      case EventType.GarbageDrop:
        return this.GarbageDrop()
      default:
        throw new Error(
          `AIAnalysisTaskResultCreater:fromType: Invalid type ${type}`
        )
    }
  }

  private static IllegalDropRule() {
    let rule = new IllegalDropRule()
    rule.Regions = []
    rule.ObjectLabels = []
    rule.Confidence = 100
    rule.Duration = 3
    rule.TargetRatio = 100
    rule.OverlapRatio = 70
    return rule
  }

  private static MixedIntoRule() {
    let rule = new MixedIntoRule()
    rule.Regions = []
    rule.ObjectLabels = []
    rule.TrashCanLabels = []
    rule.Confidence = 100
    rule.Duration = 3
    rule.TargetRatio = 100
    rule.TrashCanRatio = 80

    return rule
  }

  private static GarbageDrop() {
    let rule = new GarbageDropRule()
    rule.Regions = []
    rule.ObjectLabels = []
    rule.Confidence = 100
    rule.TargetRatio = 100
    rule.MinTargetNumber = 1
    rule.CountInterval = 1
    rule.SuperTimeoutInterval = 90
    rule.TimeoutInterval = 30
    return rule
  }
  private static DropWarningRule() {
    let rule = new DropWarningRule()
    rule.Regions = []
    rule.ObjectLabels = []
    rule.Confidence = 100
    rule.Duration = 3
    rule.TargetRatio = 100

    return rule
  }

  static Polygon() {
    let data = new Polygon()
    data.Coordinates = []
    return data
  }
}
