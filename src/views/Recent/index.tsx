import { PullToRefresh } from 'antd-mobile'
import React, { useState } from 'react'

import DocItem from '@/components/DocListItem'
import useDocStore, { Doc } from '@/store/useDocStore'

import styles from './index.module.less'
function Recent() {
  const getDocsByDate = useDocStore(state => state.getDocsByDate)
  const [docsToRender, setDocsToRender] = useState<Doc[] | undefined>(getDocsByDate())

  return (
    <PullToRefresh onRefresh={refreshDoc}>
      <div className={styles.listContainer}>{renderDocs()}</div>
    </PullToRefresh>
  )

  function renderDocs() {
    if (!docsToRender || !docsToRender.length) return <div>暂无文档</div>
    return docsToRender.map(doc => <DocItem key={doc.id} doc={doc} />)
  }
  async function refreshDoc() {
    setDocsToRender(getDocsByDate())
  }
}
export default Recent
