import { PullToRefresh, SafeArea } from 'antd-mobile'
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
  const getFolderNameById = useDocStore(state => state.getFolderNameById)
  const fetchAllDocs = useDocStore(state => state.fetchAllDocs)
  const docs = useDocStore(state => state.docs)

  const [docsToRender, setDocsToRender] = useState<Doc[] | undefined>(
    getDocsById(params?.id || '0'),
  )
  const [title, setTitle] = useState<string>('所有文档')

  useEffect(() => {
    fetchAllDocs()
  }, [])
  useEffect(() => {
    setDocsToRender(getDocsById(params?.id || '0'))
    setTitle(getFolderNameById(params?.id || '0'))
  }, [docs, params])

  const renderDocs = () => {
    if (!docsToRender || !docsToRender.length) return <div>暂无文档</div>
    return docsToRender.map(doc => <DocItem key={doc.id} doc={doc} />)
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <SafeArea position="top" />
        <div className={styles.headerContent}>
          <h1>{title}</h1>
        </div>
      </div>
      <PullToRefresh onRefresh={fetchAllDocs}>
        <div className={styles.listContainer}>{renderDocs()}</div>
      </PullToRefresh>
    </div>
  )
}
export default Home
