import { instanceToPlain, plainToInstance } from 'class-transformer'
import { FileGpsItem } from '../../../../models/arm/file/file-gps-item.model'
import { FileInfo } from '../../../../models/arm/file/file-info.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../../service-process'
import { ParseGpsItemParams } from './system-file.param'

export class SystemFileRequestService {
  constructor(private http: HowellAuthHttp) {}
  async array() {
    let url = ArmSystemUrl.file.basic()
    let response = await this.http.get<HowellResponse<FileInfo[]>>(url)
    if (response.FaultCode === 0) {
      return plainToInstance(FileInfo, response.Data)
    }
    throw new Error(response.FaultReason)
  }
  async upload(data: FormData, progress: (x: number) => void) {
    let url = ArmSystemUrl.file.basic()
    return this.http
      .post<HowellResponse<FileInfo>, any>(url, data, undefined, progress)
      .then((x) => {
        return HowellResponseProcess.item(x, FileInfo)
      })
  }

  async folder(path: string) {
    let url = ArmSystemUrl.file.path(path)
    let response = await this.http.get<HowellResponse<FileInfo[]>>(url)
    if (response.FaultCode === 0) {
      return plainToInstance(FileInfo, response.Data)
    }
    throw new Error(response.FaultReason)
  }
  async file(path: string) {
    let url = ArmSystemUrl.file.path(path)
    return this.http.get<any>(url)
  }
  path(path: string) {
    return ArmSystemUrl.file.path(path)
  }

  async gps(params: ParseGpsItemParams) {
    let url = ArmSystemUrl.file.gps()
    let plain = instanceToPlain(params)
    return this.http
      .post<any, HowellResponse<FileGpsItem[]>>(url, plain)
      .then((response) => {
        return HowellResponseProcess.array(response, FileGpsItem)
      })
  }
}
