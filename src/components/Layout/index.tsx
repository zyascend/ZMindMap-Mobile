import * as React from 'react'
import { Link, Outlet } from 'react-router-dom'

import styles from './index.module.less'

function Layout() {
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
