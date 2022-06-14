import { CSSProperties, useEffect, useState } from 'react'

import { MapRenderNode } from '@/hooks/useMap/LogicTree'
import useMapStore, { MapStyle } from '@/store/useMapStore'
import useWebsiteStore, { AllStyle } from '@/store/website'

export type RenderStyle = {
  svgStyle: CSSProperties
  pathStyle: CSSProperties
  imageStyle: CSSProperties
  rectStyle: (node: MapRenderNode) => CSSProperties
  textStyle: (node: MapRenderNode) => CSSProperties
}

const useStyle = () => {
  const mapStyle = useMapStore(state => state.map?.styles)
  const styleFactory = useWebsiteStore(state => state.allStyle)

  const [styleData, setStyleData] = useState<RenderStyle>()
  useEffect(() => {
    if (!mapStyle || !styleFactory) return
    setStyleData(getStyleData(mapStyle, styleFactory))
  }, [mapStyle])

  return { styleData }
}

function getStyleData(mapStyle: MapStyle, styleFactory: AllStyle): RenderStyle {
  const { colorId } = mapStyle
  // TODO 修改后端返回的数据结构：Record<String, ColorStyle> 不再循环查找
  const theColor = styleFactory.colorList.find(item => item.id === colorId)!
  const colors = theColor?.style.colors
  return {
    svgStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.bgSvg,
    },
    pathStyle: {
      stroke: colors.path,
      fill: 'none',
      strokeWidth: '1.5px',
    },
    imageStyle: {
      display: 'none',
    },
    rectStyle: node => {
      let style: CSSProperties = {
        stroke: colors.border,
        strokeWidth: `${node.strokeWidth}px`,
      }
      switch (node.depth) {
        case 0:
          style = { ...style, fill: colors.bgRoot }
          break
        case 1:
          style = { ...style, fill: colors.bgSubRoot }
          break
        default:
          style = { ...style, fill: colors.bgLeaf }
      }
      return style
    },
    textStyle: node => {
      const fontSize = node.depth === 0 ? 16 : 14
      const lineHeight = fontSize + 2
      let style: CSSProperties = {
        fontSize: `${fontSize}px`,
        lineHeight: `${lineHeight}px`,
        textAnchor: 'start',
        whiteSpace: 'initial',
      }
      switch (node.depth) {
        case 0:
          style = { ...style, color: colors.textRoot }
          break
        case 1:
          style = { ...style, color: colors.textSubRoot }
          break
        default:
          style = { ...style, color: colors.textLeaf }
      }
      return style
    },
  }
}

export default useStyle
