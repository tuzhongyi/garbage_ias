import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { PictureWindowModel } from '../window-picture/window-picture.model'
import { WindowModel } from '../window/window.model'

export interface UserManagerListMessageReceiverEvent {
  details_result(result: ResultArgs): void
  delete_result(result: ResultArgs): void
}
export interface UserManagerListMessageSenderEvent {
  open(window: WindowModel): void
  delete_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  load(): void
  delete(): void
}

export class UserManagerListMessage {
  event = new EventEmitter<MessageEvent>()

  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    UserManagerListMessageSenderEvent,
    UserManagerListMessageReceiverEvent
  >(['open', 'delete_confirm'])

  private reigst() {
    this.client.receiver.on('details_result', (args: ResultArgs) => {
      if (args.result) {
        MessageBar.success(args.message ?? '操作成功')
        this.event.emit('load')
      } else {
        MessageBar.error(args.message ?? '操作失败')
      }
    })
    this.client.receiver.on('delete_result', (args) => {
      if (args.result) {
        this.event.emit('delete')
      } else {
        MessageBar.error(args.message ?? '操作失败')
      }
    })
  }

  discover(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
  create(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
  modify(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
  delete_confirm(window: ConfirmWindowModel) {
    this.client.sender.emit('delete_confirm', window)
  }
  picture(window: PictureWindowModel) {
    this.client.sender.emit('open', window)
  }
}
