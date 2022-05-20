import './index.module.less'

import React from 'react'
type SvgIcon = {
  name: string
  className?: string
}
const DocItem: React.FC<SvgIcon> = ({ name, className }) => {
  return (
    <svg aria-hidden="true" className={`svg-icon ${className}`}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}

export default DocItem
