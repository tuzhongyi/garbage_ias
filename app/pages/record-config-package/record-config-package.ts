import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { PackageConfig } from '../../data-core/models/arm/config/package-config.model'
import { RecordConfigPackageBusiness } from './record-config-package.business'
import { RecordConfigPackageHtmlController } from './record-config-package.html.controller'
import { RecordConfigPackageMessage } from './record-config-package.message'
import { RecordConfigPackageWindow } from './record-config-package.window'

export namespace RecordConfigPackage {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new RecordConfigPackageHtmlController()
    private business = new RecordConfigPackageBusiness()
    private message = new RecordConfigPackageMessage()
    private window = new RecordConfigPackageWindow()
    private data?: PackageConfig

    private async load() {
      try {
        this.data = await this.business.load()
        this.html.load(this.data)
      } catch (error) {
        MessageBar.error('录像储存配置信息读取失败')
      }
    }

    private regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存配置信息?'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.save.bind(this))
    }

    private save() {
      if (this.data) {
        this.data = this.html.get(this.data)
        this.business
          .update(this.data)
          .then((x) => {
            MessageBar.success('保存成功')
            this.load()
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }
  }

  const controller = new Controller()
}
