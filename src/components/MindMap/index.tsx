import React from 'react'

import { useMapData } from '@/hooks/useMap'
import { MapRenderNode } from '@/hooks/useMap/LogicTree'
import useMapStore from '@/store/useMapStore'

import styles from './index.module.less'

const MindMap: React.FC = () => {
  const setSvgRef = useMapStore(state => state.setSvgRef)
  const { renderData } = useMapData()
  // TODO renderData 为空时 显示Loading状态
  // if (!renderData) return <loading />
  return (
    <div className={styles.mapContainer}>
      <svg className={styles.mainSvg} ref={setSvgRef} id="mainSvg">
        <g id="mainG">
          {renderPath()}
          {renderInfo()}
        </g>
      </svg>
    </div>
  )
  // 渲染节点间的连线
  function renderPath() {
    const paths = renderData?.path
    if (!paths || !paths.length) return
    return (
      <g>
        {paths.map(path => (
          <path key={path.id} d={path.data}></path>
        ))}
      </g>
    )
  }
  // 渲染节点的主要信息
  function renderInfo() {
    const nodes = renderData?.nodes
    if (!nodes || !nodes.length) return
    return nodes.map(node => (
      <g
        key={node.data.id}
        id={node.data.id}
        transform={`translate(${node.x},${node.y})`}>
        {renderMainRect(node)}
        {renderOutLineRect(node)}
        {renderMarkers(node)}
        {renderMainImg(node)}
        {renderText(node)}
      </g>
    ))
  }
  // 渲染节点背景方块
  function renderMainRect(node: MapRenderNode) {
    return (
      <rect
        x={node.outLineOffset}
        y={node.outLineOffset}
        rx={node.rectRadius}
        ry={node.rectRadius}
        width={node.outLineW}
        height={node.outLineH}
        style={{ fill: 'transparent' }}
      />
    )
  }
  // 渲染节点外边框
  function renderOutLineRect(node: MapRenderNode) {
    return (
      <rect
        x="0"
        y="0"
        rx={node.rectRadius}
        ry={node.rectRadius}
        width={node.cw}
        height={node.ch}
      />
    )
  }
  // 渲染节点主图
  function renderMainImg(node: MapRenderNode) {
    if (!node.iw) return
    return (
      <image
        preserveAspectRatio="xMaxYMax meet"
        transform={`translate(${node.ix} ${node.iy})`}
        width={node.iw}
        height={node.ih}
        xlinkHref={node.data.imgInfo?.url}
      />
    )
  }
  // 渲染节点的标记
  function renderMarkers(node: MapRenderNode) {
    if (!node.mw) return
    return (
      <g transform={`translate(${node.mx},${node.my})`}>
        {node.data.markerList?.map((marker, index) => (
          <image
            key={marker}
            transform={`translate(${index * 11},${0})`}
            width="18"
            height="18"
            xlinkHref={marker}
          />
        ))}
      </g>
    )
  }
  // 渲染节点的文字
  function renderText(node: MapRenderNode) {
    return (
      <text
        transform={`translate(${node.tx},${node.ty})`}
        width={node.tw}
        height={node.th}>
        {node.multiline.map(line => (
          <tspan
            key={line}
            x="0"
            dy={node.tspanDy}
            // fill="allStyles.textStyle(node).color"
          >
            {line}
          </tspan>
        ))}
      </text>
    )
  }
}

export default MindMap
