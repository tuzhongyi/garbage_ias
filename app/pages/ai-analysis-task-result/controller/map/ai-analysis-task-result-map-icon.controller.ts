import { SourceStorage } from '../../../../common/local-storage/source/source.storage'

declare var AMap: any
export class AIAnalysisTaskResultMapIconController {
  private storage = SourceStorage.map.get()

  create1(selected = false) {
    let src = selected ? this.storage.amap_red : this.storage.amap_blue
    let width = 53
    let height = 68
    let icon: AMap.Icon
    let ratio = 2
    if (src === this.storage.amap_blue) {
      ratio = 6
    }
    let opts = {
      size: [width / ratio, height / ratio],
      image: src,
      imageSize: [width / ratio, height / ratio],
      // imageOffset: [-width / ratio / 2, -height / ratio],
      anchor: 'bottom-center',
    }
    icon = new AMap.Icon(opts)

    return icon
  }

  private icon(selected: boolean) {
    return selected ? this.storage.amap_red : this.storage.amap_blue
  }
  private size(selected = false) {
    let width = 53
    let height = 68
    let ratio = 6
    if (selected) {
      ratio = 2
    }
    return [width / ratio, height / ratio]
  }
  create() {
    let icon = {
      type: 'image',
      image: this.icon(false),
      size: this.size(false),
      anchor: 'bottom-center',
    }
    return icon
  }

  get(selected = false) {
    return {
      image: this.icon(selected),
      size: this.size(selected),
    }
  }
}
