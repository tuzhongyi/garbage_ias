import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { RunningStatus } from '../../data-core/models/arm/running-status.model'
import './system-status-running.less'

export class SystemStatusRunningHtmlController {
  constructor() {
    this.regist()
  }

  element = {
    MemoryUsage: document.getElementById('MemoryUsage') as HTMLInputElement,
    TotalMemory: document.getElementById('TotalMemory') as HTMLInputElement,
    CPUUsage: document.getElementById('CPUUsage') as HTMLInputElement,
    SystemUpTime: document.getElementById('SystemUpTime') as HTMLInputElement,
    ChipType: document.getElementById('ChipType') as HTMLInputElement,
    NetworkSpeed: document.getElementById('NetworkSpeed') as HTMLInputElement,
    ChipTemperature: document.getElementById(
      'ChipTemperature'
    ) as HTMLInputElement,
  }

  regist() {}

  load(data: RunningStatus) {
    this.element.MemoryUsage.value = HtmlTool.set(data.MemoryUsage)
    this.element.TotalMemory.value = HtmlTool.set(data.TotalMemory)
    this.element.CPUUsage.value = HtmlTool.set(data.CPUUsage)
    this.element.SystemUpTime.value = HtmlTool.set(
      Language.Time(data.SystemUpTime)
    )
    this.element.ChipType.value = HtmlTool.set(data.ChipType)
    this.element.NetworkSpeed.value = HtmlTool.set(data.NetworkSpeed)
    this.element.ChipTemperature.value = HtmlTool.set(
      data.ChipTemperature?.toFixed(1)
    )
    this.run(++data.SystemUpTime)
  }

  run(time: number) {
    setTimeout(() => {
      this.element.SystemUpTime.value = Language.Time(time) ?? ''
      this.run(++time)
    }, 1000)
  }
}
