import { instanceToPlain } from 'class-transformer'
import { AnalysisServerCapability } from '../../../models/arm/analysis/analysis-server-capability.model'
import { AnalysisServer } from '../../../models/arm/analysis/analysis-server.model'
import { AnalysisTaskResult } from '../../../models/arm/analysis/analysis-task-result.model'
import { AnalysisTask } from '../../../models/arm/analysis/analysis-task.model'
import { PagedList } from '../../../models/page-list.model'
import { HowellResponse } from '../../../models/response'
import { ArmServerUrl } from '../../../urls/arm/server/server.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'
import {
  GetAnalysisTaskListParams,
  GetAnalysisTaskResultListParams,
} from './server-analysis.params'

export class ArmServerAnalysisRequestService {
  constructor(private http: HowellAuthHttp) {}

  async array() {
    let url = ArmServerUrl.analysis.basic()
    return this.http.get<HowellResponse<AnalysisServer[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, AnalysisServer)
    })
  }
  async create(data: AnalysisServer) {
    let url = ArmServerUrl.analysis.basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<AnalysisServer>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisServer)
      })
  }

  async get(id: string) {
    let url = ArmServerUrl.analysis.item(id)
    return this.http.get<HowellResponse<AnalysisServer>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisServer)
    })
  }
  async delete(id: string) {
    let url = ArmServerUrl.analysis.item(id)
    return this.http.delete<HowellResponse<AnalysisServer>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisServer)
    })
  }
  async update(data: AnalysisServer) {
    let url = ArmServerUrl.analysis.item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<AnalysisServer>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisServer)
      })
  }

  async capability() {
    let url = ArmServerUrl.analysis.capability()
    return this.http
      .get<HowellResponse<AnalysisServerCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisServerCapability)
      })
  }

  private _task?: ArmServerAnalysisTaskRequestService
  public get task(): ArmServerAnalysisTaskRequestService {
    if (!this._task) {
      this._task = new ArmServerAnalysisTaskRequestService(this.http)
    }
    return this._task
  }
}
class ArmServerAnalysisTaskRequestService {
  constructor(private http: HowellAuthHttp) {}

  async create(data: AnalysisTask) {
    let url = ArmServerUrl.analysis.task.basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<AnalysisTask>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisTask)
      })
  }

  async get(id: string) {
    let url = ArmServerUrl.analysis.task.item(id)
    return this.http.get<HowellResponse<AnalysisTask>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisTask)
    })
  }
  async delete(id: string) {
    let url = ArmServerUrl.analysis.task.item(id)
    return this.http.delete<HowellResponse<AnalysisTask>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisTask)
    })
  }
  async list(params: GetAnalysisTaskListParams) {
    let url = ArmServerUrl.analysis.task.list()
    let plain = instanceToPlain(params)
    return this.http
      .put<any, HowellResponse<PagedList<AnalysisTask>>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, AnalysisTask)
      })
  }

  private _result?: { params: ArmServerAnalysisTaskResultRequestService }
  public get result(): { params: ArmServerAnalysisTaskResultRequestService } {
    if (!this._result) {
      this._result = {
        params: new ArmServerAnalysisTaskResultRequestService(this.http),
      }
    }
    return this._result
  }
}

class ArmServerAnalysisTaskResultRequestService {
  constructor(private http: HowellAuthHttp) {}

  async list(params: GetAnalysisTaskResultListParams) {
    let url = ArmServerUrl.analysis.task.result.list()
    let plain = instanceToPlain(params)
    return this.http
      .put<any, HowellResponse<PagedList<AnalysisTaskResult>>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, AnalysisTaskResult)
      })
  }
}
