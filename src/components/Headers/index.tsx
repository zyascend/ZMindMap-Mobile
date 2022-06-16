import { SafeArea } from 'antd-mobile'
import React, { memo } from 'react'

import SvgIcon from '@/components/SvgIcon'

import styles from './index.module.less'

export interface HeaderAction {
  icon: string
  clickFc: () => void
}

export interface Header {
  leftActions?: Array<HeaderAction>
  rightActions?: Array<HeaderAction>
  title: string
}

const PageHeader: React.FC<Header> = ({ title, leftActions, rightActions }) => {
  console.log('PageHeader rendered')
  return (
    <div className={styles.header}>
      <SafeArea position="top" />
      <div className={styles.headerContent}>
        {renderAction(leftActions)}
        <h1>{title}</h1>
        {renderAction(rightActions)}
      </div>
    </div>
  )
  function renderAction(actions: HeaderAction[] | undefined) {
    if (!actions || !actions.length) return
    return actions.map(action => (
      <div
        aria-hidden="true"
        className={styles.icon}
        key={action.icon}
        onClick={action.clickFc}>
        <SvgIcon name={action.icon} />
      </div>
    ))
  }
}
// function goBack() {
//   history.go(-1)
// }
export default memo(PageHeader)
