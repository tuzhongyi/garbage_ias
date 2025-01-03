import { LocalStorageService } from '../../common/local-storage/local-storage.service'

export class ArmMainBusiness {
  login(username: string, token: string) {
    LocalStorageService.login.save({
      username,
      token,
    })
  }
}
