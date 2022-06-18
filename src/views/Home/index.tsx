import { PullToRefresh } from 'antd-mobile'
import React, { useRef } from 'react'

import DocItem from '@/components/DocListItem'
import { FullPageEmpty } from '@/components/FullPageFallback'
import PageHeader, { HeaderAction } from '@/components/Headers'
import useDocList from '@/hooks/useDocList'

import styles from './index.module.less'

function Home() {
  const { docsToRender, title, fetchAllDocs } = useDocList()
  // useRef保证在每一次渲染headerActions都是初始值 不会触发PageHeader组件的重新渲染
  const headerActions = useRef<HeaderAction[]>([
    {
      icon: 'more',
      clickFc: onMoreAction,
    },
  ])
  return (
    <div className={styles.main}>
      <PageHeader title={title} rightActions={headerActions.current} />
      <PullToRefresh onRefresh={fetchAllDocs}>
        <div className={styles.listContainer}>{renderDocs()}</div>
      </PullToRefresh>
    </div>
  )
  // ? 自定义的函数放在 return 部分的后面
  function onMoreAction() {
    console.log('onMoreAction')
  }
  function renderDocs() {
    if (!docsToRender || !docsToRender.length) return <FullPageEmpty />
    return docsToRender.map(doc => <DocItem key={doc.id} doc={doc} />)
  }
}
export default Home
