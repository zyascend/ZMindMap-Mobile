import { SafeArea } from 'antd-mobile'
import React from 'react'

import SvgIcon from '@/components/SvgIcon'

import styles from './index.module.less'

export interface Header {
  title: string
  showBack?: boolean
  onMoreClick: () => void
}

export const HomeHeader: React.FC<Header> = ({
  title,
  showBack = false,
  onMoreClick,
}) => {
  return (
    <div className={styles.header}>
      <SafeArea position="top" />
      <div className={styles.headerContent}>
        <div
          aria-hidden="true"
          className={`${styles.icon} ${showBack ? '' : styles.hidden}`}
          onClick={goBack}>
          <SvgIcon name="arrow-left" />
        </div>
        <h1>{title}</h1>
        <div aria-hidden="true" className={styles.icon} onClick={onMoreClick}>
          <SvgIcon name="more" />
        </div>
      </div>
    </div>
  )
}
function goBack() {
  history.go(-1)
}
