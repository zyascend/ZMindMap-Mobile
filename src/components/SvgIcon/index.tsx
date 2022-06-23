import './index.module.less'

import React, { memo } from 'react'
type SvgIcon = {
  name: string
  className?: string
}
const SvgIcon: React.FC<SvgIcon> = ({ name, className }) => {
  console.log('【SvgIcon rendered】')
  return (
    <svg aria-hidden="true" className={`svg-icon ${className}`}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}
export default memo(SvgIcon)
