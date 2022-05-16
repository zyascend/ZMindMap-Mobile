import axios, { AxiosError, AxiosRequestConfig } from 'axios'

// import { useNavigate } from 'react-router-dom'
import useUserStore from '@/store/useUserStore'
// const navigate = useNavigate()
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      console.log('未登录')
      // navigate('/login', { replace: true })
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      console.log('登录过期，请重新登录')
      // navigate('/login', { replace: true })
      break
    // 404请求不存在
    case 404:
      console.log('资源不存在')
      break
    default:
      console.log('资源不存在')
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 12,
  // TODO 如何动态获取域名？
  // baseURL: process.env.NODE_ENV === 'production' ? 'https://mapapi.kimjisoo.cn' : 'http://localhost:3003'
  // eslint-disable-next-line no-undef
  // baseURL: BASE_API_URL
  baseURL: 'http://localhost:3003',
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
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status)
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
