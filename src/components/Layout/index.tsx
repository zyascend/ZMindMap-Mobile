import * as React from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'

import useUserStore from '@/store/useUserStore'

import styles from './index.module.less'

function Layout() {
  const naviList = [
    {
      to: '/app',
      name: '文档',
    },
    {
      to: '/app/recent',
      name: '捷径',
    },
    {
      to: '/app/user',
      name: '个人',
    },
  ]
  const token = useUserStore(state => state.token)
  const loc = useLocation()
  let left = 0
  for (let i = 0; i < naviList.length; i++) {
    if (naviList[i].to === loc.pathname) {
      left = i * 0.33 * 100
      break
    }
  }
  if (!token) {
    return <Navigate to="/login" />
  }
  return (
    <div className={styles.main}>
      <div className={styles.footer}>
        <div className={styles.overlay} style={{ left: `${left}%` }}></div>
        <div className={styles.navigations}>{renderNavigation()}</div>
      </div>
      <Outlet />
    </div>
  )
  function renderNavigation() {
    return naviList.map(navi => (
      <Link
        to={navi.to}
        className={`${styles.tab} ${navi.to === loc.pathname ? styles.active : ''}`}
        key={navi.name}>
        {navi.name}
      </Link>
    ))
  }
}

export default Layout
