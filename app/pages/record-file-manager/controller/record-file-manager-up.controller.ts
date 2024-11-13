import { EventEmitter } from '../../../common/event-emitter'
import { FileInfo } from '../../../data-core/models/arm/file/file-info.model'

interface RecordFileManagerUpControllerEvent {
  click: (e: Event) => void
}

export class RecordFileManagerUpController {
  event = new EventEmitter<RecordFileManagerUpControllerEvent>()
  constructor() {
    this.regist()
  }

  private element = document.getElementById('up') as HTMLButtonElement

  private regist() {
    this.element.addEventListener('click', (e) => {
      let target = e.currentTarget as HTMLButtonElement
      if (target.classList.contains('disabled')) {
        return
      }
      this.event.emit('click', e)
    })
  }

  refresh(folder?: FileInfo) {
    if (folder) {
      this.element.classList.remove('disabled')
    } else {
      this.element.classList.add('disabled')
    }
  }
}
