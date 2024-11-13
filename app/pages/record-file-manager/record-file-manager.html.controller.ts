import { EventEmitter } from '../../common/event-emitter'
import { FileInfo } from '../../data-core/models/arm/file/file-info.model'
import { RecordFileManagerBackController } from './controller/record-file-manager-back.controller'
import { RecordFileManagerPathController } from './controller/record-file-manager-path.controller'
import { RecordFileManagerUpController } from './controller/record-file-manager-up.controller'
import { RecordFileManagerEvent } from './record-file-manager.event'
import { RecordFileManagerHtmlTable } from './record-file-manager.html.table'
import './record-file-manager.less'

export class RecordFileManagerHtmlController {
  event = new EventEmitter<RecordFileManagerEvent>()

  constructor() {
    this.regist()
  }

  private element = {
    head: document.getElementById('head') as HTMLDivElement,
    back: new RecordFileManagerBackController(),
    up: new RecordFileManagerUpController(),
    path: new RecordFileManagerPathController(),
    refresh: document.getElementById('refresh') as HTMLButtonElement,
  }

  private table = new RecordFileManagerHtmlTable()

  private history: (FileInfo | undefined)[] = []
  folder?: FileInfo

  private regist() {
    this.registtable()
    this.registpath()

    this.element.back.event.on('click', () => {
      this.history.pop()
      this.refresh()
      if (this.history.length > 0) {
        let last = this.history[this.history.length - 1]

        if (last) {
          this.tofolder(last)
        } else {
          this.toroot(true)
        }
      } else {
        this.toroot(true)
      }
    })
    this.element.up.event.on('click', () => {
      if (this.folder) {
        let nodes = this.folder.FileName.split('/')
        if (nodes.length > 1) {
          nodes.pop()
          let last = nodes.pop()
          if (last) {
            this.folder = this.table.get(last)
            if (this.folder) {
              this.tofolder(this.folder)
            } else {
              this.toroot()
            }
          } else {
            this.toroot()
          }
        } else {
          this.toroot()
        }
      }
    })
    this.element.refresh.addEventListener('click', () => {
      if (this.folder) {
        this.event.emit('folder', this.folder)
      } else {
        this.event.emit('root')
      }
    })
  }

  registtable() {
    this.table.event.on('folder', (item) => {
      this.folder = item
      this.element.head.innerText = item.FileName
      this.history.push(item)
      this.element.back.refresh(this.history)
      this.element.up.refresh(this.folder)
      this.element.path.refresh(this.folder)
      this.event.emit('folder', item)
    })
    this.table.event.on('play', (item) => {
      this.event.emit('play', item)
    })
    this.table.event.on('download', (item) => {
      this.event.emit('download', item)
    })
  }

  registpath() {
    this.element.path.event.on('root', () => {
      this.toroot()
    })
    this.element.path.event.on('folder', (node) => {
      if (this.folder) {
        let last = this.folder.FileName.split('/').pop()
        if (last === node) {
          return
        }
        this.folder = this.table.get(node)
        if (this.folder) {
          this.tofolder(this.folder)
        } else {
          this.toroot()
        }
      } else {
        this.toroot()
      }
    })
  }

  private toroot(back = false) {
    this.folder = undefined
    if (!back) {
      this.history.push(undefined)
    }
    this.element.head.innerText = '根目录'
    this.refresh()
    this.event.emit('root')
  }
  private tofolder(folder: FileInfo) {
    this.folder = folder
    this.element.head.innerText = folder.FileName
    this.refresh()
    this.event.emit('folder', folder)
  }
  private refresh() {
    this.element.back.refresh(this.history)
    this.element.up.refresh(this.folder)
    this.element.path.refresh(this.folder)
  }

  clear() {
    this.table.clear()
  }

  load(datas: FileInfo[]) {
    this.table.load(datas)
  }
}
