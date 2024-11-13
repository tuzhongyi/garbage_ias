import { EventEmitter } from '../../../common/event-emitter'
import { FileInfo } from '../../../data-core/models/arm/file/file-info.model'

interface RecordFileManagerBackControllerEvent {
  click: (e: Event) => void
}
export class RecordFileManagerBackController {
  event = new EventEmitter<RecordFileManagerBackControllerEvent>()
  constructor() {
    this.regist()
  }
  private element = document.getElementById('back') as HTMLButtonElement
  private regist() {
    this.element.addEventListener('click', (e) => {
      let target = e.currentTarget as HTMLButtonElement
      if (target.classList.contains('disabled')) {
        return
      }
      this.event.emit('click', e)
    })
  }
  refresh(history: (FileInfo | undefined)[]) {
    if (history.length === 0) {
      this.element.classList.add('disabled')
    } else {
      this.element.classList.remove('disabled')
    }
  }
}
