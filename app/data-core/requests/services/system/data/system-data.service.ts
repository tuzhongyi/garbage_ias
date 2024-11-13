import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'

export class SystemDataRequestService {
  constructor(private http: HowellAuthHttp) {}

  configuration = {
    download: () => {
      let url = ArmSystemUrl.data.configuration()
      return this.http.get<Blob>(url, {
        responseType: 'blob',
      })
    },
    upload: (data: BinaryData) => {
      let url = ArmSystemUrl.data.configuration()
      return this.http
        .post<HowellResponse, BinaryData>(url, data, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then((x) => {
          return x.FaultCode == 0
        })
    },
  }
  log = {
    download: (filename: string) => {
      let url = ArmSystemUrl.data.log(filename)
      return this.http.get<string>(url)
    },
  }
}
