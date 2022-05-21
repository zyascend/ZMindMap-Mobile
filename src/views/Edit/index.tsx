import { SafeArea } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useMapStore from '@/store/useMapStore'

import styles from './index.module.less'

enum PAGE_STATUS {
  LOADING,
  ERROR,
  NORMAL,
}

function Edit() {
  const params = useParams<{ id: string }>()
  const fetchMap = useMapStore(state => state.fetchMap)
  const map = useMapStore(state => state.map)
  const [pageStatus, setPageStatus] = useState<PAGE_STATUS>(PAGE_STATUS.LOADING)

  useEffect(() => {
    if (params.id) {
      fetchMap(params.id)
      setPageStatus(PAGE_STATUS.NORMAL)
    } else {
      setPageStatus(PAGE_STATUS.ERROR)
    }
  }, [params])

  const renderContent = () => {
    if (pageStatus === PAGE_STATUS.ERROR) {
      return <div>出错啦。。。</div>
    }
    if (pageStatus === PAGE_STATUS.LOADING) {
      return <div>Loading...</div>
    }
    return <div>{map?.definition}</div>
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <SafeArea position="top" />
        <div className={styles.headerContent}>
          <h1>{map?.name || '编辑文档'}</h1>
        </div>
      </div>
      {renderContent()}
    </div>
  )
}
export default Edit
