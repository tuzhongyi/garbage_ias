export class HTMLImageElementTool {
  size(url: string) {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      let img = new Image()
      img.src = url
      img.onload = (e) => {
        let target = e.currentTarget as HTMLImageElement
        resolve({ width: target.naturalWidth, height: target.naturalHeight })
      }
      img.onerror = (e) => {
        reject(e)
      }
    })
  }
  target(url: string) {
    return new Promise<HTMLImageElementTargetTool>((resolve, reject) => {
      let img = new Image()
      img.src = url
      img.onload = (e) => {
        let target = new HTMLImageElementTargetTool(
          e.currentTarget as HTMLImageElement
        )
        resolve(target)
      }
      img.onerror = (e) => {
        reject(e)
      }
    })
  }
}

class HTMLImageElementTargetTool {
  constructor(private target: HTMLImageElement) {}

  get size() {
    return {
      width: this.target.naturalWidth,
      height: this.target.naturalHeight,
    }
  }

  get url() {
    let canvas = document.createElement('canvas')
    canvas.width = this.target.naturalWidth
    canvas.height = this.target.naturalHeight
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.drawImage(this.target, 0, 0)
    return canvas.toDataURL()
  }
}
