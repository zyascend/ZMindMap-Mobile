import React from 'react'
import { Link } from 'react-router-dom'

import type { Doc } from '@/store/useDocStore'

import styles from './index.module.less'

const DocItem: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <Link to={`/${'folderType' in doc ? 'app' : 'edit'}/${doc.id}`} key={doc.id}>
      <div className={styles.item}>
        {'folderType' in doc ? '[文件夹]' : '[文件]'} - {doc.name}
      </div>
    </Link>
  )
}

export default DocItem
