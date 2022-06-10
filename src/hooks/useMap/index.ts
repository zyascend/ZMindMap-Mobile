import useMapStore, { MapDefinition, TreeData } from '@/store/useMapStore'

function transform(definition: MapDefinition): TreeData {
  console.log(definition)
  return {} as TreeData
}

export const useMapData = () => {
  const getRenderData = () => {
    // 1. 转换 MapDefinition => TreeData
    const definition = useMapStore(state => state.definition)
    if (!definition) return
    const treeData = transform(definition)
    // 2. 计算 TreeData => RenderData
    console.log(treeData)
    // 3. 更新store
  }
  return [getRenderData]
}
