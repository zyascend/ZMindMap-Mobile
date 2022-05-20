import React from 'react'
import { Link } from 'react-router-dom'

import type { Doc } from '@/store/useDocStore'
import { format } from '@/utils/date'

import styles from './index.module.less'

const DocItem: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <Link to={`/${'folderType' in doc ? 'app' : 'edit'}/${doc.id}`} key={doc.id}>
      <div className={styles.item}>
        {'folderType' in doc ? '[文件夹]' : '[文件]'} - {doc.name} -{' '}
        {format(doc.updateTime)}
      </div>
    </Link>
  )
}

export default DocItem
