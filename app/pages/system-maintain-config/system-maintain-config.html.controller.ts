import { EventEmitter } from '../../common/event-emitter'
import { UploadControl } from '../../common/tools/controls/upload-control/upload-control'
import { FileReadType } from '../../common/tools/controls/upload-control/upload-control.model'
import { FactoryResetMode } from '../../data-core/enums/factory-reset-mode.enum'
import { SystemMaintainConfigEvent } from './system-maintain-config.event'
import './system-maintain-config.less'

export class SystemMaintainConfigHtmlController {
  event = new EventEmitter<SystemMaintainConfigEvent>()
  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    power: {
      reboot: document.getElementById('button_reboot') as HTMLButtonElement,
      shutdown: document.getElementById('button_shutdown') as HTMLButtonElement,
    },
    reset: {
      factory: {
        basic: document.getElementById(
          'button_reset_factory_basic'
        ) as HTMLButtonElement,
        full: document.getElementById(
          'button_reset_factory_full'
        ) as HTMLButtonElement,
      },
    },
    config: {
      name: document.getElementById('config_upload_text') as HTMLInputElement,
      upload: new UploadControl(
        document.getElementById('config_upload_button') as HTMLButtonElement,
        document.getElementById('config_upload_file') as HTMLInputElement
      ),
      input: document.getElementById(
        'button_config_input'
      ) as HTMLButtonElement,
      output: document.getElementById(
        'button_config_output'
      ) as HTMLButtonElement,
    },
    upgrade: {
      name: document.getElementById('upgrade_text') as HTMLInputElement,
      upload: new UploadControl(
        document.getElementById('upgrade_button') as HTMLButtonElement,
        document.getElementById('upgrade_file') as HTMLInputElement
      ),
      input: document.getElementById(
        'button_upgrade_input'
      ) as HTMLButtonElement,
      state: document.getElementById('upgrade_state') as HTMLSpanElement,
    },
  }

  private file: {
    config?: ArrayBuffer
    upgrade?: ArrayBuffer
  } = {}

  private init() {
    this.element.config.upload.accept = '.zip'
    this.element.config.upload.type = FileReadType.ArrayBuffer
  }

  private regist() {
    this.element.power.reboot.addEventListener('click', () => {
      this.event.emit('reboot')
    })
    this.element.power.shutdown.addEventListener('click', () => {
      this.event.emit('shutdown')
    })
    this.element.reset.factory.basic.addEventListener('click', () => {
      this.event.emit('factoryreset', FactoryResetMode.Basic)
    })
    this.element.reset.factory.full.addEventListener('click', () => {
      this.event.emit('factoryreset', FactoryResetMode.Full)
    })
    this.element.config.output.addEventListener('click', () => {
      this.event.emit('configdownload')
    })
    this.element.config.upload.event.on('upload', (args) => {
      this.element.config.name.value = args.filename
      this.file.config = args.data as ArrayBuffer
    })
    this.element.config.input.addEventListener('click', () => {
      if (this.file.config) {
        this.event.emit('configupload', this.file.config)
      }
    })
    this.element.upgrade.upload.event.on('upload', (args) => {
      this.element.upgrade.name.value = args.filename
      this.file.upgrade = args.data as ArrayBuffer
    })
    this.element.upgrade.input.addEventListener('click', () => {
      if (this.file.upgrade) {
        this.event.emit('upgradeupload', this.file.upgrade)
      }
    })
  }
}
