import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useAsyncEffect from '@/hooks/useAsyncEffect'
import useDocStore, { Doc } from '@/store/useDocStore'

type FolderParams = {
  id: string
}

export default function useDocList() {
  const params = useParams<FolderParams>()

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
    setDocsToRender(getDocsById(params?.id || '0'))
    setTitle(getFolderNameById(params?.id || '0'))
  }, [docs, params])

  return { docsToRender, title, fetchAllDocs }
}
