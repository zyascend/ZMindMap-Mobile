import { ErrorBlock } from 'antd-mobile'
import React from 'react'

import IMG_EMPTY from '@/assets/icons/empty.png'
import SvgIcon from '@/components/SvgIcon'

import styles from './index.module.less'

export const FullPageLoading: React.FC = () => {
  return (
    <div>
      <SvgIcon name="loading" />
    </div>
  )
}

type ErrorNull = { error: Error | null }
export const FullPageError: React.FC<ErrorNull> = () => <ErrorBlock fullPage />

export const FullPageEmpty: React.FC<{ message?: string }> = ({
  message = '暂无数据',
}) => (
  <div className={`${styles.centerContent} ${styles.empty}`}>
    <img src={IMG_EMPTY} alt="空" />
    <span className={styles.message}>{message}</span>
  </div>
)
