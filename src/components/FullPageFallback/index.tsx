import { ErrorBlock } from 'antd-mobile'
import React from 'react'

import SvgIcon from '@/components/SvgIcon'

export const FullPageLoading: React.FC = () => {
  return (
    <div>
      <SvgIcon name="loading" />
    </div>
  )
}

type ErrorNull = { error: Error | null }
export const FullPageError: React.FC<ErrorNull> = () => <ErrorBlock fullPage />
