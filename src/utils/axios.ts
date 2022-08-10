import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import useUserStore from '@/store/useUserStore'

import { toast } from './index'
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const toLoginPage = () => {
  localStorage.clear()
  window.location.replace(`/login?redirect=${window.location.pathname}`)
}

const errorMap: Record<number, (msg?: HttpResError) => void> = {
  401: toLoginPage,
  403: () => toast('操作失败 无权限'),
  404: (msg?: HttpResError) => {
    toast(msg?.error || '【404】找不到资源')
  },
}
const errorHandle = (status: number, msg: HttpResError) => {
  // 状态码判断
  const handler = errorMap[status]
  if (handler) handler(msg)
  else {
    toast('系统错误 请稍后再试')
  }
}
const IS_PRD = import.meta.env.PROD
// 创建axios实例
const { apiCfg } = window.CFG
const instance = axios.create({
  timeout: 1000 * 12,
  baseURL: IS_PRD ? apiCfg.prdHost : apiCfg.devHost,
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json'
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useUserStore.getState().token
    token && (config.headers!.Authorization = `Bearer ${token}`)
    return config
  },
  error => Promise.reject(error),
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)),
  // 请求失败
  (error: AxiosError<HttpResError>) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        //  store.commit('changeNetwork', false)
      } else {
        return Promise.reject(error)
      }
    }
  },
)

export default instance
