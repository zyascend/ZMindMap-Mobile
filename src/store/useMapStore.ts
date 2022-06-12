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

export interface DefinitionNode {
  _children: string[]
  children: string[]
  collapsed: boolean
  html: string
  id: string
  imgInfo?: {
    height: number
    url: string
    width: number
  }
  level?: number
  markerList?: string[]
  parent: string
}

export interface MapDefinition {
  [id: string]: DefinitionNode
}

export type TreeData = Omit<DefinitionNode, '_children' | 'children'> & {
  _children: TreeData[]
  children: TreeData[]
}

/* eslint-disable no-unused-vars */
interface MapStoreProps {
  map: MapRes | undefined
  definition: MapDefinition | undefined
  svgRef: SVGSVGElement | null
  fetchMap: (docId: string) => Promise<any>
  setRenderData: () => void
  setSvgRef: (ref: SVGSVGElement | null) => void
}

// 创建 store
const useStore = create<MapStoreProps>()(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  devtools((set, get) => ({
    map: undefined,
    definition: undefined,
    svgRef: null,
    fetchMap: async docId => {
      const user = useUserStore.getState().user
      const url = `${API.getDocContent}/${user?._id}/${docId}`
      const res = await useHttp<MapRes>(url)
      if (res) {
        set({
          map: res,
          definition: JSON.parse(res.definition),
        })
      } else {
        // 错误处理
        console.log(res)
      }
    },
    setRenderData: () => {
      console.log('format map')
    },
    setSvgRef: ref => {
      set({ svgRef: ref })
    },
  })),
)

export default useStore
