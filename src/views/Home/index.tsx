import { PullToRefresh } from 'antd-mobile'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import DocItem from '@/components/DocListItem'
import { FullPageEmpty } from '@/components/FullPageFallback'
import PageHeader, { HeaderAction } from '@/components/Headers'
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
