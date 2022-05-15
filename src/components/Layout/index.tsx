import * as React from 'react'
import { Link, Outlet } from 'react-router-dom'

import style from './index.module.less'

function Layout() {
  return (
    <div className={style.main}>
      <div className={style.footer}>
        <Link to="/">文档</Link>
        <Link to="/recent">捷径</Link>
        <Link to="/user">个人</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
