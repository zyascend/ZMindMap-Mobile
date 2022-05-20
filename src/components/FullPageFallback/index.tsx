import React from 'react'

export const FullPageLoading: React.FC = () => {
  return <div>loading</div>
}

type ErrorNull = { error: Error | null }
export const FullPageError: React.FC<ErrorNull> = ({ error }) => (
  <div>出错啦： {error?.message}</div>
)
