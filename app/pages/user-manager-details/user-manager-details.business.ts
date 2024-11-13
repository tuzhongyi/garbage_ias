import { Guid } from '../../common/tools/guid/guid'
import { User } from '../../data-core/models/user/user.model'
import { HowellSM4 } from '../../data-core/requests/auth/howell-sm4'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class UserManagerDetailsBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load(id: string) {
    return this.service.security.user.get(id)
  }

  create(data: User) {
    data.Id = Guid.NewGuid().ToString('D')
    if (data.Password) {
      data.Password = HowellSM4.encrypt(data.Password).toLocaleUpperCase()
    }
    data.CreationTime = new Date()
    data.UpdateTime = new Date()

    return this.service.security.user.create(data)
  }

  update(data: User) {
    if (data.Password) {
      data.Password = HowellSM4.encrypt(data.Password).toLocaleUpperCase()
    }
    data.UpdateTime = new Date()
    return this.service.security.user.update(data)
  }
  group() {
    return this.service.security.user.group()
  }
}
