import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import axios from '@/utils/axios'
// ! 待补充返回值泛型
const useHttp = async <D>(
  url: string,
  config: AxiosRequestConfig = { method: 'get' },
): Promise<D | null> => {
  const [err, res] = await axios(url, config)
    .then((res: AxiosResponse<D>) => [null, res])
    .catch(err => [err, null])
  if (err || !res) {
    return null
  }
  return res.data
}
export default useHttp
