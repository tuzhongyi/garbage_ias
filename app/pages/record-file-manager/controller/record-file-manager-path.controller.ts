import { EventEmitter } from '../../../common/event-emitter'
import { FileInfo } from '../../../data-core/models/arm/file/file-info.model'

interface RecordFileManagerPathControllerEvent {
  root: () => void
  folder: (node: string) => void
}

export class RecordFileManagerPathController {
  event = new EventEmitter<RecordFileManagerPathControllerEvent>()
  constructor() {
    this.init()
  }

  private element = document.getElementById('path') as HTMLUListElement

  refresh(folder?: FileInfo) {
    this.clear()
    if (folder) {
      let nodes = folder.FileName.split('/')
      nodes.forEach((node) => {
        this.append(node)
      })
    }
  }

  private clear() {
    this.init()
  }

  private init() {
    this.element.innerHTML = ''
    let root = document.createElement('li')
    root.innerHTML = '根目录'
    root.addEventListener('click', () => {
      this.event.emit('root')
    })
    this.element.appendChild(root)
  }

  private append(node: string) {
    let span = document.createElement('span')
    span.innerText = '/'
    this.element.appendChild(span)
    let li = document.createElement('li')
    li.innerText = node
    li.addEventListener('click', () => {
      this.event.emit('folder', node)
    })
    this.element.appendChild(li)
  }
}
