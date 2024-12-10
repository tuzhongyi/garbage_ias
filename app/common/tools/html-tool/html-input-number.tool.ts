export class HTMLInputNumberElementTool {
  mousewheelchangevalue(
    element: HTMLInputElement,
    callback?: (value: number) => void
  ) {
    element.addEventListener('mousewheel', (e) => {
      let event = e as WheelEvent
      event.preventDefault()
      let input = e.target as HTMLInputElement
      let value = parseInt(input.value)
      let min = parseInt(input.min)
      let max = parseInt(input.max)
      let step = parseInt(input.step)
      if (Number.isNaN(step)) {
        step = 1
      }
      let _return = false
      if (event.deltaY < 0) {
        if (!Number.isNaN(max) && value >= max) {
          _return = true
        }
        if (!Number.isNaN(min) && value <= min) {
          input.value = `${min}`
          _return = true
        }

        if (_return) {
          return
        }

        value += step
      } else {
        if (!Number.isNaN(max) && value >= max) {
          input.value = `${max}`
          _return = true
        }
        if (!Number.isNaN(min) && value <= min) {
          _return = true
        }
        if (_return) {
          return
        }
        value -= step
      }
      if (Number.isNaN(value)) {
        value = step
      }
      input.value = `${value}`
      if (callback) {
        ;(function (fn: Function, value: number) {
          setTimeout(() => {
            fn(value)
          }, 0)
        })(callback, value)
      }
    })
  }
}
