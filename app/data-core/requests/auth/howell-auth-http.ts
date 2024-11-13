import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LocalStorageService } from '../../../common/local-storage/local-storage.service'
import { HowellSM4 } from './howell-sm4'

export class HowellAuthHttp {
  constructor() {}

  // blob(path: string) {
  //   fetch(path)
  //     // Retrieve its body as ReadableStream
  //     .then((response) => {
  //       if (!response.ok || !response.body)
  //         throw new Error('Network response was not ok')
  //       const reader = response.body.getReader()
  //       return new ReadableStream({
  //         start(controller) {
  //           return pump()
  //           function pump() {
  //             return reader.read().then(({ done, value }) => {
  //               // When no more data needs to be consumed, close the stream
  //               if (done) {
  //                 controller.close()
  //                 return
  //               }
  //               // Enqueue the next data chunk into our target stream
  //               controller.enqueue(value)
  //               return pump()
  //             })
  //           }
  //         },
  //       })
  //     })
  //     // Create a new response out of the stream
  //     .then((stream) => new Response(stream))
  //     // Create an object URL for the response
  //     .then((response) => response.blob())
  //     .then((blob) => URL.createObjectURL(blob))
  //     // Update image
  //     .then((url) => console.log((image.src = url)))
  //     .catch((err) => console.error(err))
  // }

  async blob(path: string, mime: string) {
    let options = this.getConfig()
    let response = await axios.get(path, { ...options, responseType: 'blob' })
    return new Blob([response.data], { type: mime })
  }

  buffer(path: string) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      fetch(path, {
        headers: {
          ...this.authorization,
        },
      }).then((response) => {
        resolve(response.arrayBuffer())
      })
    })
  }

  get<R>(path: string, config?: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      let options = this.getConfig(config)
      axios
        .get(path, options)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  post<R>(path: string): Promise<R>
  post<T>(path: string, data?: T): Promise<T>
  post<T, R>(path: string, data?: T): Promise<R>
  post<R, T>(
    path: string,
    data?: T,
    config?: AxiosRequestConfig,
    progress?: (value: number) => void
  ): Promise<R>
  post<R, T = any>(
    path: string,
    data?: T,
    config?: AxiosRequestConfig,
    progress?: (value: number) => void
  ) {
    return new Promise<R>((resolve, reject) => {
      let options = this.getConfig(config)
      if (progress) {
        options.onUploadProgress = function (e) {
          let value = Math.round((e.loaded * 100) / (e.total ?? 1))
          progress(value)
        }
      }

      axios
        .post<T, AxiosResponse<R>>(path, data, options)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  put<R>(path: string): Promise<R>
  put<T>(path: string, data?: T): Promise<T>
  put<T, R>(path: string, data?: T): Promise<R>
  put<R, T = any>(path: string, data?: T, config?: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      let options = this.getConfig(config)
      axios
        .put<T, AxiosResponse<R>>(path, data, options)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  delete<R>(path: string, config?: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      let options = this.getConfig(config)
      return axios
        .delete(path, options)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  auth(username: string, password: string, path: string): Promise<boolean> {
    let code = HowellSM4.encrypt(password)
    return new Promise((resolve, reject) => {
      axios
        .post(path, {
          Username: username,
          Password: code.toLocaleUpperCase(),
        })
        .then((res) => {
          if (res.status === 200) {
            let howell = res.data
            LocalStorageService.login.save({
              username: username,
              token: howell.Data,
            })
            resolve(true)
          } else {
            LocalStorageService.login.clear()
            reject(res.status)
          }
        })
        .catch((e) => {
          reject(e.status)
        })
    })
  }
  clear() {
    LocalStorageService.login.clear()
  }
  //获取已授权的头部
  get authorization() {
    let info = LocalStorageService.login.get()

    if (info) {
      return {
        Authorization: `Bearer ${info.token}`,
      }
    }
    throw new Error('未授权')
  }

  getConfig(config?: AxiosRequestConfig) {
    return {
      ...config,
      headers: {
        ...config?.headers,
        ...this.authorization,
      },
    }
  }
}
