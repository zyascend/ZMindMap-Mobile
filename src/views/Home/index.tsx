import { PullToRefresh } from 'antd-mobile'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import DocItem from '@/components/DocListItem'
import { FullPageEmpty } from '@/components/FullPageFallback'
import PageHeader, { HeaderAction } from '@/components/Headers'
import { useDocList } from '@/hooks/useDocs'

import styles from './index.module.less'

function Home() {
  const params = useParams<{ id: string }>()
  const { docsToRender, title, fetchAllDocs } = useDocList()
  // useRef保证在每一次渲染rightActions都是初始值 不会触发PageHeader组件的重新渲染
  const rightActions = useRef<HeaderAction[]>([{ icon: 'more', clickFc: onMoreAction }])
  const [leftActions, setLeftActions] = useState<HeaderAction[]>([])
  useEffect(() => {
    if (params?.id) {
      setLeftActions([{ icon: 'arrow-left', clickFc: () => history.go(-1) }])
    } else {
      setLeftActions([])
    }
  }, [params])
  return (
    <div className={styles.main}>
      <PageHeader
        title={title}
        rightActions={rightActions.current}
        leftActions={leftActions}
      />
      <PullToRefresh onRefresh={fetchAllDocs}>
        <div className={styles.listContainer}>{renderDocs()}</div>
      </PullToRefresh>
    </div>
  )
  // ? 自定义的函数放在 return 部分的后面
  function onMoreAction() {
    // TODO
    console.log('onMoreAction')
  }
  function renderDocs() {
    if (!docsToRender || !docsToRender.length) return <FullPageEmpty />
    return docsToRender.map(doc => <DocItem key={doc.id} doc={doc} />)
  }
}
export default Home
