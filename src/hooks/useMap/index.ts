import { useEffect, useState } from 'react'

import useMapStore, { DefinitionNode, MapDefinition } from '@/store/useMapStore'
import { simpleDeepClone } from '@/utils'
import { Replace } from '@/utils/types'
import zoomAndFit from '@/utils/zoom'

import { LogicTree, MapRenderData } from './LogicTree'

// export type TreeData = Omit<DefinitionNode, '_children' | 'children'> & {
//   _children: TreeData[]
//   children: TreeData[]
// }

export type TreeData = Replace<DefinitionNode, '_children' | 'children', TreeData[]>

export const useMapData = () => {
  const definition = useMapStore(state => state.definition)
  const svgRef = useMapStore(state => state.svgRef)

  const [renderData, setRenderData] = useState<MapRenderData | null>(null)
  // 监听renderData的变化 重新自动缩放
  useEffect(() => {
    zoomAndFit()
  }, [renderData, svgRef])
  // 导图的definition和svgRef变化时 更新渲染数据
  useEffect(() => {
    if (!definition || !svgRef) return
    setRenderData(getRenderData(definition, svgRef))
  }, [definition, svgRef])

  return { renderData }
}

/**
 * 计算得到最新的渲染数据
 * @param definition
 * @param svgRef
 * @returns MapRenderData
 */
function getRenderData(definition: MapDefinition, svgRef: SVGSVGElement): MapRenderData {
  // 1. 转换 MapDefinition => TreeData
  const treeData = transform(definition)
  // 2. 计算每个节点的位置&尺寸 TreeData => RenderData
  const logicTree = new LogicTree(svgRef)
  return logicTree.create(treeData)
}

/**
 * 平铺数据转为树形数据
 * @param definition MapDefinition
 * @returns TreeData
 */
function transform(definition: MapDefinition): TreeData {
  const cloned = simpleDeepClone<MapDefinition>(definition)
  // cycleTrans(cloned)
  return recursionTransform(cloned)
}

/**
 * 递归 + 前序遍历 转换
 * @param definition 转换数据源
 * @param rootId 当前节点ID
 * @param level 当前层级
 * @returns
 */
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

/**
 * 非递归 循环改进版
 * TODO 还有细节需要完善
 * @param definition
 */
// function cycleTrans(definition: MapDefinition) {
//   console.log(definition)
//   for (const id of Object.keys(definition)) {
//     const node = definition[id]
//     const { parent } = node
//     if (parent === '-1') continue
//     const pNode = definition[parent]
//     if (pNode.children.includes(id)) {
//       if (pNode.children_o) {
//         pNode.children_o.push(node)
//       } else {
//         pNode.children_o = [node]
//       }
//     } else {
//       if (pNode._children_o) {
//         pNode._children_o.push(node)
//       } else {
//         pNode._children_o = [node]
//       }
//     }
//   }
// }
