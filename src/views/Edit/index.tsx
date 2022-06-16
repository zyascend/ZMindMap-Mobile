import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PageHeader, { HeaderAction } from '@/components/Headers'
import MindMap from '@/components/MindMap'
import useMapStore from '@/store/useMapStore'
import useWebsiteStore from '@/store/website'

import styles from './index.module.less'

enum PAGE_STATUS {
  LOADING,
  ERROR,
  NORMAL,
}
const leftActions: HeaderAction[] = [
  { icon: 'hamberger', clickFc: () => console.log('navi click') },
  { icon: 'arrow-left', clickFc: () => history.go(-1) },
]
const rightActions: HeaderAction[] = [
  { icon: 'tree', clickFc: () => console.log('note click') },
  { icon: 'more', clickFc: () => console.log('more click') },
]
function Edit() {
  const params = useParams<{ id: string }>()
  const map = useMapStore(state => state.map)
  const fetchMap = useMapStore(state => state.fetchMap)
  const fetchAllStyle = useWebsiteStore(state => state.fetchAllStyle)

  const [pageStatus, setPageStatus] = useState<PAGE_STATUS>(PAGE_STATUS.LOADING)

  useEffect(() => {
    fetchAllStyle()
    if (params.id) {
      fetchMap(params.id)
      setPageStatus(PAGE_STATUS.NORMAL)
    } else {
      setPageStatus(PAGE_STATUS.ERROR)
    }
  }, [params])

  return (
    <div className={styles.main}>
      <PageHeader
        title={map?.name || '编辑文档'}
        leftActions={leftActions}
        rightActions={rightActions}
      />
      {renderContent()}
    </div>
  )
  function renderContent() {
    if (pageStatus === PAGE_STATUS.ERROR) {
      return <div>出错啦。。。</div>
    }
    if (pageStatus === PAGE_STATUS.LOADING) {
      return <div>Loading...</div>
    }
    return <MindMap />
  }
}
export default Edit
