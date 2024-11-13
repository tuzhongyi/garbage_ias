class CanvasDrawColor {
  stroke = {
    normal: '#0f0',
    drawing: '#ffff7d',
    selected: '#ff3232',
    object: '#f00',
    rule: '#00f',
  }
  fill = {
    normal: 'rgba(0,150,0,0.3)',
    drawing: 'rgba(255,255,125,0.3)',
    selected: 'rgba(180,40,40,0.3)',
    object: 'rgba(255,0,0,0.3)',
    rule: 'rgba(0,0,255,0.3)',
  }
}

class TrashCanColor {
  [key: string]: string
  Dry = 'rgb(44, 43, 39)'
  Wet = '#8e442f'
  Recycle = '#186cc4'
  Hazard = 'rgb(229, 49, 34)'
}

export class ColorTool {
  static canvas = new CanvasDrawColor()
  static trashcan = new TrashCanColor()
}
