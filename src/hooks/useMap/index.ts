import { useEffect, useState } from 'react'

import useMapStore, { MapDefinition, MapRenderData, TreeData } from '@/store/useMapStore'
import { simpleDeepClone } from '@/utils'

export const useMapData = () => {
  const definition = useMapStore(state => state.definition)
  const svgRef = useMapStore(state => state.svgRef)

  const [renderData, setRenderData] = useState<MapRenderData | null>(null)
  useEffect(() => {
    if (!definition || !svgRef) return
    setRenderData(getRenderData(definition, svgRef))
  }, [definition, svgRef])
  return { renderData }
}

const getRenderData = (
  definition: MapDefinition,
  svgRef: SVGSVGElement,
): MapRenderData => {
  // 1. 转换 MapDefinition => TreeData
  const treeData = transform(definition)
  // 2. 计算 TreeData => RenderData
  console.log(treeData, svgRef)
  // 3. 更新store
  return {} as MapRenderData
}
/**
 * 平铺数据转为树形数据
 * @param definition MapDefinition
 * @returns TreeData
 */
function transform(definition: MapDefinition): TreeData {
  const cloned = simpleDeepClone<MapDefinition>(definition)
  const treeData = recursionTransform(cloned)
  console.log('transform treeData > ', treeData)
  return treeData
}

function recursionTransform(definition: MapDefinition, rootId = 'map-root', level = 0) {
  const definitionNode = definition[rootId]
  const { _children, children } = definitionNode
  const root: TreeData = {
    ...definitionNode,
    _children: [] as TreeData[],
    children: [] as TreeData[],
  }
  root.level = level
  const newChildren: TreeData[] = []
  if (children?.length) {
    for (const childId of children) {
      newChildren.push(recursionTransform(definition, childId, level + 1))
    }
    root.children = newChildren
  } else if (_children?.length) {
    for (const childId of children) {
      newChildren.push(recursionTransform(definition, childId, level + 1))
    }
    root._children = newChildren
  }
  return root
}
