import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { User } from '../../data-core/models/user/user.model'
import { UserManagerListBusiness } from './business/user-manager-list.business'
import { UserManagerListHtmlController } from './user-manager-list.html.controller'
import { UserManagerListMessage } from './user-manager-list.message'
import { UserManagerListWindow } from './user-manager-list.model'

export namespace UserManagerList {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    private html = new UserManagerListHtmlController()
    private business = new UserManagerListBusiness()
    private message = new UserManagerListMessage()
    private window = new UserManagerListWindow()
    datas: User[] = []

    async load() {
      this.datas = await this.business.load()
      this.html.table.clear()
      this.html.table.load(this.datas)
    }

    regist() {
      this.html.table.event.on('modify', this.onmodify.bind(this))

      this.html.event.on('create', this.oncreate.bind(this))
      this.message.event.on('load', this.load.bind(this))

      this.html.event.on('delete', this.ondelete.bind(this))
      this.message.event.on('delete', this.todelete.bind(this))
    }
    oncreate() {
      this.window.details.clear()
      this.message.create(this.window.details)
    }
    onmodify(id: string) {
      this.window.details.query.id = id
      this.message.modify(this.window.details)
    }

    ondelete(ids: string[]) {
      this.window.confirm.ids = ids
      this.window.confirm.message = `确定要删除这 ${ids.length} 个用户吗?`
      this.message.delete_confirm(this.window.confirm)
    }
    todelete() {
      if (this.window.confirm.ids.length > 0) {
        this.business
          .delete(this.window.confirm.ids)
          .then((x) => {
            MessageBar.success('操作成功')

            this.datas = this.datas.filter(
              (x) => !this.window.confirm.ids.includes(x.Id.toString())
            )
            this.html.table.clear()
            this.html.table.load(this.datas)
          })
          .catch((e) => {
            MessageBar.error('操作失败')
          })
      }
    }

    onresult(promise: Promise<any>) {
      promise
        .then((x) => {
          MessageBar.success('操作成功')
          this.load()
        })
        .catch((e) => {
          MessageBar.error('操作失败')
        })
    }
  }

  let controller = new Controller()
}
