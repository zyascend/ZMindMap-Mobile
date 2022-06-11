import React from 'react'

import { useMapData } from '@/hooks/useMap'
import useMapStore from '@/store/useMapStore'

import styles from './index.module.less'

const MindMap: React.FC = () => {
  const setSvgRef = useMapStore(state => state.setSvgRef)
  const mainSvgCallback = (el: SVGSVGElement) => {
    setSvgRef(el)
  }
  const { renderData } = useMapData()
  console.log('MINDMAP renderData >', renderData)
  return (
    <div className={styles.mapContainer}>
      <svg ref={mainSvgCallback}></svg>
    </div>
  )
}

export default MindMap
