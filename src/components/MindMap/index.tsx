import './index.module.less'

import React, { useEffect } from 'react'

import { useMapData } from '@/hooks/useMap'

const MindMap: React.FC = () => {
  const [getRenderData] = useMapData()
  useEffect(() => {
    getRenderData()
  }, [])
  return <div>MindMap</div>
}

export default MindMap
