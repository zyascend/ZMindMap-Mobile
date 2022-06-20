import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useAsyncEffect from '@/hooks/useAsyncEffect'
import useDocStore, { Doc } from '@/store/useDocStore'

/**
 * 首页渲染的doc列表
 * @returns { 待渲染的文档列表，当前文档文件夹名，刷新文档方法 }
 */
export default function useDocList() {
  const params = useParams<{ id: string }>()

  const docs = useDocStore(state => state.docs)
  const getDocsById = useDocStore(state => state.getDocsById)
  const getFolderNameById = useDocStore(state => state.getFolderNameById)
  const fetchAllDocs = useDocStore(state => state.fetchAllDocs)

  const [docsToRender, setDocsToRender] = useState<Doc[] | undefined>(
    getDocsById(params?.id || '0'),
  )
  const [title, setTitle] = useState<string>('所有文档')

  useAsyncEffect(async () => {
    await fetchAllDocs()
  }, [])
  useEffect(() => {
    // 监听params.id 从store拿id对应的文档
    setDocsToRender(getDocsById(params?.id || '0'))
    setTitle(getFolderNameById(params?.id || '0'))
  }, [docs, params])

  return { docsToRender, title, fetchAllDocs }
}
