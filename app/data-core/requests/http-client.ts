import { HowellAuthHttp } from './auth/howell-auth-http'

export namespace HowellHttpClient {
  export class HttpClient {
    constructor() {}

    private _http?: HowellAuthHttp
    get http() {
      if (!this._http) {
        this._http = new HowellAuthHttp()
      }
      return this._http
    }
  }
}
