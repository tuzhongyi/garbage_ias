export class TimeController {
  constructor(element: HTMLInputElement, format: string) {
    this.element = element
    this.format = format
  }
  element: HTMLInputElement
  private handle?: NodeJS.Timer
  private index = 0
  private format: string
  date?: Date

  run(date: Date) {
    this.date = date
    this.index = 0
    this.runing()
    this.handle = setInterval(() => {
      this.runing()
    }, 1000)
  }

  runing() {
    if (this.date) {
      let now = new Date(this.date.getTime() + 1000 * this.index)
      this.element.value = now.format(this.format)
      this.index++
    }
  }

  stop() {
    if (this.handle) {
      clearInterval(this.handle)
    }
    this.date = undefined
    this.index = 0
  }
}
