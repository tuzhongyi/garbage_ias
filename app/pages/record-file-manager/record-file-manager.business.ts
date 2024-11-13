import { FileInfo } from '../../data-core/models/arm/file/file-info.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class RecordFileManagerBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  async load() {
    let datas = await this.service.file.array()
    return datas.sort((a, b) => {
      if (a.IsDirectory === b.IsDirectory) {
        return 0
      }
      return a.IsDirectory < b.IsDirectory ? 1 : -1
    })
  }

  async folder(data: FileInfo) {
    if (data.IsDirectory) {
      return this.service.file.folder(data.FileName)
    }
    return []
  }

  file(data: FileInfo) {
    return this.service.file.path(data.FileName)
  }
}
