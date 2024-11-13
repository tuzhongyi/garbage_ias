import { LoginStorage } from './login.storage'
import { LogoutStorage } from './logout.storage'
import { NavigationStorage } from './navigation.storage'
import { VideoGPSConfigStorage } from './robot-config.storage'
import { SessionStorage } from './session.storage'

export class LocalStorageService {
  static navigation = new NavigationStorage()
  static session = new SessionStorage()
  static login = new LoginStorage()
  static logout = new LogoutStorage()
  static gps = new VideoGPSConfigStorage()
}
