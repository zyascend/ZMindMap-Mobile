import create from 'zustand'
import { devtools } from 'zustand/middleware'

import useHttp from '@/hooks/useHttp'
import useUserStore from '@/store/useUserStore'
import API from '@/utils/api'

export interface MapRes {
  directory: Array<{ name: string; id: string }>
  _id: string
  docId: string
  name: string
  role: number
  definition: string
  baseVersion: string
}

/* eslint-disable no-unused-vars */
interface MapStoreProps {
  map: MapRes | undefined
  fetchMap: (docId: string) => Promise<any>
}

// 创建 store
const useStore = create<MapStoreProps>()(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  devtools((set, get) => ({
    map: undefined,
    fetchMap: async docId => {
      const user = useUserStore.getState().user
      const url = `${API.getDocContent}/${user?._id}/${docId}`
      const res = await useHttp<MapRes>(url)
      if (res) {
        set({ map: res })
      } else {
        // 错误处理
        console.log(res)
      }
    },
  })),
)

export default useStore
