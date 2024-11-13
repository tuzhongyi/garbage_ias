import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { FileInfo } from '../../data-core/models/arm/file/file-info.model'
import { RecordFileManagerBusiness } from './record-file-manager.business'
import { RecordFileManagerHtmlController } from './record-file-manager.html.controller'
import { RecordFileManagerMessage } from './record-file-manager.message'
import { RecordFileManagerWindow } from './record-file-manager.window'

export namespace RecordFileManager {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new RecordFileManagerHtmlController()
    private business = new RecordFileManagerBusiness()
    private message = new RecordFileManagerMessage()
    private window = new RecordFileManagerWindow()
    private datas: FileInfo[] = []

    private async load() {
      try {
        this.datas = await this.business.load()
        this.html.load(this.datas)
      } catch (error) {
        MessageBar.error('录像文件读取失败')
      }
    }

    private regist() {
      this.html.event.on('folder', (data) => {
        this.business.folder(data).then((x) => {
          this.html.clear()
          this.html.load(x)
        })
      })
      this.html.event.on('root', () => {
        this.html.clear()
        this.load()
      })
      this.html.event.on('play', (data) => {
        this.window.video.query.title = data.FileName
        this.window.video.query.src = this.business.file(data)
        this.message.video(this.window.video)
      })
      this.html.event.on('download', (data) => {
        let url = this.business.file(data)
        window.open(url, '_blank')
      })
    }
  }

  const controller = new Controller()
}
