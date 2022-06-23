import { PullToRefresh } from 'antd-mobile'
import React from 'react'

import DocItem from '@/components/DocListItem'
import { FullPageEmpty } from '@/components/FullPageFallback'
import PageHeader from '@/components/Headers'
import { useRecentDocs } from '@/hooks/useDocs'

import styles from './index.module.less'

function Recent() {
  const { docsToRender, updateDocs } = useRecentDocs()
  return (
    <div className={styles.main}>
      <PageHeader title="最近编辑" />
      <PullToRefresh onRefresh={updateDocs}>
        <div className={styles.listContainer}>{renderDocs()}</div>
      </PullToRefresh>
    </div>
  )
  function renderDocs() {
    if (!docsToRender || !docsToRender.length) return <FullPageEmpty />
    return docsToRender.map(doc => <DocItem key={doc.id} doc={doc} />)
  }
}
export default Recent
