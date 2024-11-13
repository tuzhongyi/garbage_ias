import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { User } from '../../data-core/models/user/user.model'
import { UserManagerDetailsBusiness } from './user-manager-details.business'
import { UserManagerDetailsHtmlController } from './user-manager-details.html.controller'
import { UserManagerDetailsMessage } from './user-manager-details.message'

export namespace UserManagerDetails {
  class Controller {
    constructor() {
      this.init().then(() => {
        this.regist()
        this.load()
      })
    }
    private html = new UserManagerDetailsHtmlController()
    private business = new UserManagerDetailsBusiness()
    private message = new UserManagerDetailsMessage()
    private data?: User

    private async init() {
      let group = await this.business.group()
      this.html.init(group)
    }

    async load() {
      if (this.id) {
        this.data = await this.business.load(this.id)
        if (this.data) {
          this.html.load(this.data)
        }
      }
    }

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    check(data: User) {
      let args = CheckTool.User(data)
      if (args.result) {
        return true
      }
      this.message.result(args)
      return false
    }

    oncancel() {
      this.message.close()
    }
    onok() {
      if (!this.check(this.html.get())) return
      let promise: Promise<User>
      if (this.data) {
        promise = this.toupdate(this.data)
      } else {
        promise = this.tocreate()
      }
      promise
        .then((x) => {
          this.message.result({
            result: true,
          })
          this.message.close()
        })
        .catch((e) => {
          console.log(e)
          this.message.result({
            result: false,
            inner: true,
            message: e.message,
          })
        })
    }

    toupdate(data: User) {
      let _data = this.html.get(data)
      return this.business.update(_data)
    }
    tocreate() {
      let data = this.html.get()

      return this.business.create(data)
    }

    get id() {
      if (location.search.length === 0) return undefined
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }
  }

  const controller = new Controller()
}
