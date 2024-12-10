import { wait } from '../../../common/tools/wait'
import { AnalysisServerCapability } from '../../models/arm/analysis/analysis-server-capability.model'
import { DeviceCapability } from '../../models/capabilities/arm/device-capability.model'
import { GpsCapability } from '../../models/capabilities/arm/gps-capability.model'
import { InputProxyCapability } from '../../models/capabilities/arm/input-proxy-capability.model'
import { NetworkCapability } from '../../models/capabilities/arm/network-capability.model'
import { SecurityCapability } from '../../models/capabilities/arm/security-capability.model'
import { HowellHttpClient } from '../http-client'
import { ArmAnalysisServerRequestService } from '../services/analysis/server/analysis-server.service'
import { ArmSystemRequestService } from '../services/system/system.service'

export class CapabilityManager {
  private client = new HowellHttpClient.HttpClient()
  private service = {
    system: new ArmSystemRequestService(this.client.http),
    analysis: new ArmAnalysisServerRequestService(this.client.http),
  }

  private loading = {
    device: false,
    security: false,
    network: false,
    inputproxy: false,
    gps: false,
    analysis: false,
  }

  private _device?: DeviceCapability
  public get device(): Promise<DeviceCapability> {
    if (this.loading.device) {
      return new Promise<DeviceCapability>((resolve) => {
        wait(
          () => {
            return this.loading.device === false && !!this._device
          },
          () => {
            if (this._device) {
              resolve(this._device)
            }
          }
        )
      })
    }
    if (this._device) {
      return Promise.resolve(this._device)
    }
    this.loading.device = true
    return new Promise<DeviceCapability>((resolve) => {
      this.service.system.capability().then((x) => {
        this._device = x
        this.loading.device = false
        resolve(this._device)
      })
    })
  }

  private _security?: SecurityCapability
  public get security(): Promise<SecurityCapability> {
    if (this.loading.security) {
      return new Promise<SecurityCapability>((resolve) => {
        wait(
          () => {
            return this.loading.security === false && !!this._security
          },
          () => {
            if (this._security) {
              resolve(this._security)
            }
          }
        )
      })
    }
    if (this._security) {
      return Promise.resolve(this._security)
    }
    this.loading.security = true
    return new Promise<SecurityCapability>((resolve) => {
      this.service.system.security.capability().then((x) => {
        this._security = x
        this.loading.security = false
        resolve(this._security)
      })
    })
  }

  private _network?: NetworkCapability
  public get network(): Promise<NetworkCapability> {
    if (this.loading.network) {
      return new Promise<NetworkCapability>((resolve) => {
        wait(
          () => {
            return this.loading.network === false && !!this._network
          },
          () => {
            if (this._network) {
              resolve(this._network)
            }
          }
        )
      })
    }
    if (this._network) {
      return Promise.resolve(this._network)
    }
    this.loading.network = true
    return new Promise<NetworkCapability>((resolve) => {
      this.service.system.network.capability().then((x) => {
        this._network = x
        this.loading.network = false
        resolve(this._network)
      })
    })
  }

  private _inputproxy?: InputProxyCapability
  public get inputproxy(): Promise<InputProxyCapability> {
    if (this.loading.inputproxy) {
      return new Promise<InputProxyCapability>((resolve) => {
        wait(
          () => {
            return this.loading.inputproxy === false && !!this._inputproxy
          },
          () => {
            if (this._inputproxy) {
              resolve(this._inputproxy)
            }
          }
        )
      })
    }
    if (this._inputproxy) {
      return Promise.resolve(this._inputproxy)
    }
    this.loading.inputproxy = true
    return new Promise<InputProxyCapability>((resolve) => {
      this.service.system.input.proxy.capability().then((x) => {
        this._inputproxy = x
        this.loading.inputproxy = false
        resolve(this._inputproxy)
      })
    })
  }

  private _gps?: GpsCapability
  public get gps(): Promise<GpsCapability> {
    if (this.loading.gps) {
      return new Promise<GpsCapability>((resolve) => {
        wait(
          () => {
            return this.loading.gps === false && !!this._gps
          },
          () => {
            if (this._gps) {
              resolve(this._gps)
            }
          }
        )
      })
    }
    if (this._gps) {
      return Promise.resolve(this._gps)
    }
    this.loading.gps = true
    return new Promise<GpsCapability>((resolve) => {
      this.service.system.gps.capability().then((x) => {
        this._gps = x
        this.loading.gps = false
        resolve(this._gps)
      })
    })
  }

  private _analysis?: AnalysisServerCapability
  public get analysis(): Promise<AnalysisServerCapability> {
    if (this.loading.analysis) {
      return new Promise<AnalysisServerCapability>((resolve) => {
        wait(
          () => {
            return this.loading.analysis === false && !!this._analysis
          },
          () => {
            if (this._analysis) {
              resolve(this._analysis)
            }
          }
        )
      })
    }
    if (this._analysis) {
      return Promise.resolve(this._analysis)
    }
    this.loading.analysis = true
    return new Promise<AnalysisServerCapability>((resolve) => {
      this.service.analysis.capability().then((x) => {
        this._analysis = x
        this.loading.analysis = false
        resolve(this._analysis)
      })
    })
  }
}
