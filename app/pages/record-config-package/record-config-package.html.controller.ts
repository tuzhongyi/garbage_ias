import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { PackageConfig } from '../../data-core/models/arm/config/package-config.model'
import { RecordConfigPackageEvent } from './record-config-package.event'

import './record-config-package.less'

export class RecordConfigPackageHtmlController {
  event: EventEmitter<RecordConfigPackageEvent> = new EventEmitter()

  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    Duration: document.getElementById('Duration') as HTMLInputElement,
    PackageFormat: document.getElementById('PackageFormat') as HTMLInputElement,
    AutoOverlay: document.getElementById('AutoOverlay') as HTMLInputElement,
    save: document.getElementById('save') as HTMLButtonElement,
  }

  private init() {
    HtmlTool.input.number.mousewheelchangevalue(this.element.Duration)
  }

  private regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }

  get(data?: PackageConfig) {
    if (!data) {
      data = new PackageConfig()
    }
    data.Duration = HtmlTool.get(this.element.Duration.value, 'number')
    data.PackageFormat = HtmlTool.get(this.element.PackageFormat.value)
    data.AutoOverlay = this.element.AutoOverlay.checked
    return data
  }

  load(data: PackageConfig) {
    this.element.Duration.value = HtmlTool.set(data.Duration)
    this.element.PackageFormat.value = HtmlTool.set(data.PackageFormat)
    this.element.AutoOverlay.checked = data.AutoOverlay
  }
}
