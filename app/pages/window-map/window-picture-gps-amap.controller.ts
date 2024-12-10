declare var AMap: any
export class PictureGPSWindowAMapController {
  constructor() {
    this.map = this.init()
  }

  private map: AMap.Map

  private init() {
    return new AMap.Map('container', {
      resizeEnable: true,
      zoom: 17,
    })
  }

  create(name: string, position: number[]) {
    const marker = new AMap.Marker({
      position: [...position],
      title: name,
    })
    this.map.add(marker)
    this.map.setCenter([...position])
  }
}
