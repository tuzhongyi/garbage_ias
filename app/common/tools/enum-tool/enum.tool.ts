import { DeviceProtocolType } from '../../../data-core/enums/device-protocol-type.enum'
import { ProcessState } from '../../../data-core/enums/process-state.enum'
import { ProxyChannelState } from '../../../data-core/enums/proxy-channel-state.enum'
import { Manager } from '../../../data-core/requests/managers/manager'
import { Language } from '../../language'

export class EnumTool {
  static async ProxyChannelState(value?: ProxyChannelState): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.inputproxy
        .then((capability) => {
          if (capability.ProxyChannelStates) {
            let _enum = capability.ProxyChannelStates.find(
              (x) => x.Value == value
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.ProxyChannelState(value))
        })
        .catch((x) => {
          resolve(Language.ProxyChannelState(value))
        })
    })
  }

  static async DeviceProtocolType(value?: DeviceProtocolType): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.inputproxy
        .then((capability) => {
          if (capability.DeviceProtocolTypes) {
            let _enum = capability.DeviceProtocolTypes.find(
              (x) => x.Value == value
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.DeviceProtocolType(value))
        })
        .catch((x) => {
          resolve(Language.DeviceProtocolType(value))
        })
    })
  }
  static async ProcessState(value?: ProcessState): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.device
        .then((capability) => {
          if (capability.ProcessStates) {
            let _enum = capability.ProcessStates.find((x) => x.Value == value)
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.ProcessState(value))
        })
        .catch((x) => {
          resolve(Language.ProcessState(value))
        })
    })
  }

  static async GpsState(value?: string, def: string = ''): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.gps
        .then((capability) => {
          if (capability.GpsStates) {
            let _enum = capability.GpsStates.find((x) => x.Value == value)
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(value ?? def)
        })
        .catch((x) => {
          resolve(value ?? def)
        })
    })
  }
  static async PriorityTypes(
    value?: string,
    def: string = ''
  ): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.security
        .then((capability) => {
          if (capability.PriorityTypes) {
            let _enum = capability.PriorityTypes.find((x) => x.Value == value)
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(value ?? def)
        })
        .catch((x) => {
          resolve(value ?? def)
        })
    })
  }

  static async TaskType(value?: number, def: string = ''): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.analysis
        .then((capability) => {
          if (capability.TaskTypes) {
            let _enum = capability.TaskTypes.find(
              (x) => x.Value == value?.toString()
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(value?.toString() ?? def)
        })
        .catch((x) => {
          resolve(value?.toString() ?? def)
        })
    })
  }
  static async TaskState(value?: number, def: string = ''): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.analysis
        .then((capability) => {
          if (capability.TaskStates) {
            let _enum = capability.TaskStates.find(
              (x) => x.Value == value?.toString()
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(value?.toString() ?? def)
        })
        .catch((x) => {
          resolve(value?.toString() ?? def)
        })
    })
  }
}
