import { PullToRefresh } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import DocItem from '@/components/DocListItem'
import useDocStore, { Doc } from '@/store/useDocStore'

import styles from './index.module.less'
type FolderParams = {
  id: string
}
function Home() {
  const params = useParams<FolderParams>()
  const getDocsById = useDocStore(state => state.getDocsById)
  const fetchAllDocs = useDocStore(state => state.fetchAllDocs)
  const docs = useDocStore(state => state.docs)
  const [docsToRender, setDocsToRender] = useState<Doc[] | undefined>(
    getDocsById(params.id || '0'),
  )

  useEffect(() => {
    fetchAllDocs()
  }, [])
  useEffect(() => {
    setDocsToRender(getDocsById(params.id || '0'))
  }, [docs, params])

  const renderDocs = () => {
    if (!docsToRender || !docsToRender.length) return <div>暂无文档</div>
    return docsToRender.map(doc => <DocItem key={doc.id} doc={doc} />)
  }

  return (
    <PullToRefresh onRefresh={fetchAllDocs}>
      <div className={styles.listContainer}>{renderDocs()}</div>
    </PullToRefresh>
  )
}
export default Home
