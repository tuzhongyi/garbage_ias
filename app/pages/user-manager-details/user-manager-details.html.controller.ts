import { EventEmitter } from '../../common/event-emitter'
import { MultiSelectControl } from '../../common/tools/controls/multi-select-control/multi-select-control'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { UserGroup } from '../../data-core/models/user/user-group.model'
import { User } from '../../data-core/models/user/user.model'
import { Manager } from '../../data-core/requests/managers/manager'

import '../window/window.less'
import { UserManagerDetailsEvent } from './user-manager-details.event'
import './user-manager-details.less'

export class UserManagerDetailsHtmlController {
  constructor() {
    this._init()
    this.regist()
  }

  event: EventEmitter<UserManagerDetailsEvent> = new EventEmitter()

  private element = {
    Username: document.getElementById('Username') as HTMLInputElement,
    Password: document.getElementById('Password') as HTMLInputElement,
    Group: document.getElementById('Group') as HTMLSelectElement,
    IsRoot: document.getElementById('IsRoot') as HTMLInputElement,
    Description: document.getElementById('Description') as HTMLInputElement,

    Priorities: new MultiSelectControl(
      document.getElementById('Priorities') as HTMLDivElement
    ),
    buttons: {
      ok: document.getElementById('ok') as HTMLButtonElement,
      cancel: document.getElementById('cancel') as HTMLButtonElement,
    },
  }
  private inited = {
    priority: false,
    group: false,
  }
  private source: { [key: string]: IIdNameModel[] } = {
    priorities: [],
  }

  private _init() {
    this.element.Priorities.clear()

    Manager.capability.security.then((capability) => {
      if (capability.PriorityTypes) {
        let types = capability.PriorityTypes.map((x) => {
          return {
            Id: x.Value.toString(),
            Name: x.Name,
          }
        })
        this.source.priorities = types
        this.element.Priorities.load(types)
      }
      this.inited.priority = true
    })
  }

  init(datas: UserGroup[]) {
    for (let i = 0; i < datas.length; i++) {
      let model = {
        Id: datas[i].GroupId,
        Name: datas[i].GroupName,
      }
      HtmlTool.select.append(model, this.element.Group)
    }
    this.inited.group = true
  }

  regist() {
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  private _load(data: User) {
    this.element.Username.value = HtmlTool.set(data.Username)
    this.element.Group.value = HtmlTool.set(data.GroupId)
    this.element.IsRoot.checked = data.IsRoot
    this.element.Description.value = HtmlTool.set(data.Description)
    if (data.Priorities) {
      let types = data.Priorities.map((x) => {
        let type = this.source.priorities.find((y) => y.Id === x.toString())
        return type
      }).filter((x) => !!x) as IIdNameModel[]
      this.element.Priorities.select(types)
    }
  }

  load(data: User) {
    wait(
      () => this.inited.group && this.inited.priority,
      () => this._load(data)
    )
  }

  get(source?: User): User {
    let data = source ?? new User()
    data.Username = HtmlTool.get(this.element.Username.value)
    data.Password = HtmlTool.get(this.element.Password.value)
    data.GroupId = HtmlTool.get(this.element.Group.value, 'number')
    data.GroupName =
      this.element.Group.options[this.element.Group.selectedIndex].text
    data.IsRoot = this.element.IsRoot.checked
    data.Description = HtmlTool.get(this.element.Description.value)
    data.Priorities = this.element.Priorities.selecteds.map((selected) => {
      return selected.Id
    })
    return data
  }
}
