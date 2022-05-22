import { Button } from 'antd-mobile'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import useUserStore from '@/store/useUserStore'

import styles from './index.module.less'

function User() {
  const user = useUserStore(state => state.user)
  const logout = useUserStore(state => state.logout)
  const navigate = useNavigate()
  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <h2>{user?.name}</h2>
      <Button color="primary" onClick={onClickLogout}>
        退出登录
      </Button>
    </div>
  )
  function onClickLogout() {
    logout()
    navigate('/login', { replace: true })
  }
}
export default User
