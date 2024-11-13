import { instanceToInstance } from 'class-transformer'
import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { UploadControl } from '../../common/tools/controls/upload-control/upload-control'
import {
  FileReadType,
  UploadControlFile,
} from '../../common/tools/controls/upload-control/upload-control.model'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { FileInfo } from '../../data-core/models/arm/file/file-info.model'
import {
  AIAnalysisTaskDetailsFile,
  AIAnalysisTaskDetailsFileProgress,
} from './ai-analysis-task-details.model'

interface FileEvent {
  upload(data: AIAnalysisTaskDetailsFile): void
}

export class AIAnalysisTaskDetailsFileTableController {
  event = new EventEmitter<FileEvent>()
  constructor() {
    this.regist()
    this.init()
  }

  private element = {
    upload: document.getElementById('upload') as HTMLButtonElement,
    file: document.getElementById('file') as HTMLInputElement,
  }

  upload = new UploadControl(this.element.upload, this.element.file)

  private table = document.getElementById('table') as HTMLTableElement

  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private thead = document.querySelector(
    '#table thead'
  ) as HTMLTableSectionElement

  private widths = ['46%', '18%', '18%', '18%']
  datas: FileInfo[] = []

  private exist(name: string) {
    return !!document.getElementById(name)
  }

  private regist() {
    this.upload.event.on('upload', (file: UploadControlFile) => {
      let name = file.filename
      this.change(file)

      let form = document.createElement('form') as HTMLFormElement
      form.name = name
      let data = new FormData(form)
      let blob = new Blob([file.data as ArrayBuffer], {
        type: 'video/x-matroska',
      })
      data.append('file', blob, name)
      this.event.emit('upload', { name: name, data })
    })
    this.upload.event.on('loadstart', (file) => {
      let name = file.filename
      if (this.exist(name)) return
      this.append(name)
    })
  }

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
    this.upload.accept = 'video/*,.mkv'
    this.upload.type = FileReadType.ArrayBuffer
    this.upload.multiple = true
  }

  append(name: string) {
    let values: string[] = [HtmlTool.set(name, '-'), '-', '-', '准备上传']
    let tr = HtmlTool.table.insert(this.tbody, values)
    tr.id = name
  }
  change(file: UploadControlFile) {
    let tr = document.getElementById(file.filename) as HTMLTableRowElement

    let info = new FileInfo()
    info.FileName = file.filename
    info.CreationTime = new Date()
    info.ModifiedTime = new Date()
    info.FileSize = (file.data as ArrayBuffer).byteLength
    let plain = instanceToInstance(info)
    let size = tr.children[1] as HTMLTableCellElement
    size.innerText = plain.FileSize.toString()
  }

  progress(args: AIAnalysisTaskDetailsFileProgress) {
    let tr = document.getElementById(args.name) as HTMLTableRowElement
    let progress = tr.children[2] as HTMLTableCellElement
    progress.innerText = `${args.value === 100 ? 99 : args.value}%`
    let status = tr.children[3] as HTMLTableCellElement
    status.innerText = '上传中'
  }

  async load(data: FileInfo) {
    let filename = data.FileName.substring(data.FileName.lastIndexOf('/') + 1)
    let tr = document.getElementById(filename) as HTMLTableRowElement
    let name = tr.children[0] as HTMLTableCellElement
    name.innerText = data.FileName
    let size = tr.children[1] as HTMLTableCellElement
    size.innerText = data.FileSize.toString()
    let progress = tr.children[2] as HTMLTableCellElement
    progress.innerText = '100%'
    let status = tr.children[3] as HTMLTableCellElement
    status.innerText = '上传完成'
    tr.classList.add('success')
  }

  get() {
    let names: string[] = []
    let rows = this.tbody.querySelectorAll('tr')
    for (let i = 0; i < rows.length; i++) {
      const tr = rows[i]
      if (!tr.classList.contains('success')) {
        throw new Error('文件未上传完成')
      }
      names.push(tr.children[0].innerHTML)
    }
    return names
  }
}
