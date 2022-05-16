import * as React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'

import useUserStore from '@/store/useUserStore'

import styles from './index.module.less'

function Layout() {
  const token = useUserStore(state => state.token)
  if (!token) {
    return <Navigate to="/login" />
  }
  return (
    <div className={styles.main}>
      <div className={styles.footer}>
        <Link to="/" className={styles.tab}>
          文档
        </Link>
        <Link to="/recent" className={styles.tab}>
          捷径
        </Link>
        <Link to="/user" className={styles.tab}>
          个人
        </Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
