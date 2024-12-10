import { LoginStorage } from './login.storage'
import { LogoutStorage } from './logout.storage'
import { NavigationStorage } from './navigation.storage'
import { SessionStorage } from './session.storage'
import { VideoGPSConfigStorage } from './video-gps-config.storage'

export class LocalStorageService {
  static navigation = new NavigationStorage()
  static session = new SessionStorage()
  static login = new LoginStorage()
  static logout = new LogoutStorage()
  static gps = new VideoGPSConfigStorage()
}
