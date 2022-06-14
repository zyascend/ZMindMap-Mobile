import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import useHttp from '@/hooks/useHttp'
import API from '@/utils/api'

const STORE_STORAGE_KEY = 's-website'

type ColorStyle = {
  id: string
  imgUrl: string
  style: {
    colors: {
      bgLeaf: string
      bgRoot: string
      bgSubRoot: string
      bgSvg: string
      border: string
      path: string
      textLeaf: string
      textRoot: string
      textSubRoot: string
    }
  }
}
type MapTreeStyle = {
  id: string
  imgUrl: string
  name: string
}
type MarkerStyle = {
  category: string
  imgs: string[]
}
export type AllStyle = {
  colorList: ColorStyle[]
  mapList: MapTreeStyle[]
  markerList: MarkerStyle[]
}
interface WebsiteStoreProps {
  allStyle: AllStyle | undefined
  fetchAllStyle: () => Promise<void>
}

// 创建 store
const websiteStore = create<WebsiteStoreProps>()(
  devtools(
    persist(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (set, get) => ({
        allStyle: undefined,
        fetchAllStyle: async (): Promise<void> => {
          const res = await useHttp<AllStyle>(API.getStyles)
          // TODO 错误处理
          if (!res) return
          set({
            allStyle: res,
          })
        },
      }),
      { name: STORE_STORAGE_KEY },
    ),
  ),
)

export default websiteStore
