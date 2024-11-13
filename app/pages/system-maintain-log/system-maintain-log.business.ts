import * as fs from 'file-saver'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'
export class SystemMaintainLogBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  private filename(date: Date) {
    return date.format('yyyyMMdd')
  }

  async load(date: Date) {
    return this.service.data.log.download(this.filename(date))
  }

  download(date: Date) {
    let filename = this.filename(date)
    this.load(date).then((data) => {
      let suffix = 'txt'
      let blob = new Blob([data], {
        type: 'text/plain',
      })
      fs.saveAs(blob, `${filename}.${suffix}`)
    })
  }
}
