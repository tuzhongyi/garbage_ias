import { NTPTimeMode } from '../../../data-core/enums/ntp-time-mode.enum'
import { AnalysisServer } from '../../../data-core/models/arm/analysis/analysis-server.model'
import { AnalysisTask } from '../../../data-core/models/arm/analysis/analysis-task.model'
import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { SystemTime } from '../../../data-core/models/arm/system-time.model'
import { User } from '../../../data-core/models/user/user.model'
import { ResultArgs } from '../../../pages/main/main.event'

export class CheckTool {
  static SystemTime(data: SystemTime): ResultArgs {
    if (!data.TimeMode) {
      return {
        result: false,
        message: '时间模式为空',
        inner: true,
      }
    }
    if (!data.LocalTime) {
      return {
        result: false,
        message: '本地时间为空',
        inner: true,
      }
    }
    if (data.TimeMode === NTPTimeMode.NTP) {
      if (!data.NTPServer) {
        return {
          result: false,
          message: 'NTP服务为空',
          inner: true,
        }
      }
      if (!data.NTPServer.HostAddress) {
        return {
          result: false,
          message: '请填写NTP服务地址',
          inner: true,
        }
      }
      if (data.NTPServer.PortNo >= 0) {
        return {
          result: false,
          message: '请填写服务器端口号',
          inner: true,
        }
      }
      if (data.NTPServer.SynchronizeInterval > 0) {
        return {
          result: false,
          message: '请填写校时时间间隔',
          inner: true,
        }
      }
    }

    return {
      result: true,
    }
  }

  static InputProxyChannel(data: InputProxyChannel): ResultArgs {
    if (!data.Name) {
      return {
        result: false,
        message: '请输入通道名称',
        inner: true,
      }
    }
    if (!data.SourceChannel.HostAddress) {
      return {
        result: false,
        message: '请输入设备IP地址',
        inner: true,
      }
    }
    if (!data.SourceChannel) {
      return {
        result: false,
        message: '数据来源为空',
        inner: true,
      }
    }
    if (!Number.isFinite(data.SourceChannel.PortNo)) {
      return {
        result: false,
        message: '请输入设备端口号',
        inner: true,
      }
    }
    if (data.SourceChannel.PortNo < 0 || 65535 < data.SourceChannel.PortNo) {
      return {
        result: false,
        message: '设备端口号范围为0-65535',
        inner: true,
      }
    }
    if (!data.SourceChannel.ProtocolType) {
      return {
        result: false,
        message: '请选择协议类型',
        inner: true,
      }
    }
    if (!Number.isFinite(data.SourceChannel.ChannelNo)) {
      return {
        result: false,
        message: '请输入设备视频通道编号',
        inner: true,
      }
    }

    if (data.PositionNo) {
      if (data.PositionNo < 1 || 30 < data.PositionNo) {
        return {
          result: false,
          message: '摄像机机位编号范围为1-30',
          inner: true,
        }
      }
    }

    return {
      result: true,
    }
  }
  static AnalysisServer(data: AnalysisServer): ResultArgs {
    if (!data.IPAddress) {
      return {
        result: false,
        message: '请填写服务器IP地址',
        inner: true,
      }
    }
    if (!Number.isFinite(data.Port)) {
      return {
        result: false,
        message: '请填写服务器端口号',
        inner: true,
      }
    }
    if (data.Port < 0 || 65535 < data.Port) {
      return {
        result: false,
        message: '服务器端口号范围为0-65535',
        inner: true,
      }
    }
    if (!data.ProtocolType) {
      return {
        result: false,
        message: '请选择协议类型',
        inner: true,
      }
    }
    return {
      result: true,
    }
  }

  static User(data: User) {
    if (!data.Username) {
      return {
        result: false,
        message: '请输入用户名',
        inner: true,
      }
    }
    if (!data.Password) {
      return {
        result: false,
        message: '请输入密码',
        inner: true,
      }
    }
    return {
      result: true,
    }
  }
  static AnalysisTask(data: AnalysisTask) {
    if (!data.Name) {
      return {
        result: false,
        message: '请输入任务名称',
        inner: true,
      }
    }
    if (!data.Files || data.Files.length === 0) {
      return {
        result: false,
        message: '请上传分析文件',
        inner: true,
      }
    }
    return {
      result: true,
    }
  }
}
