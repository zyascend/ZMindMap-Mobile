import { TabBar } from 'antd-mobile'
import { AppOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import useUserStore from '@/store/useUserStore'

import styles from './index.module.less'

function Layout() {
  const tabs = [
    {
      key: '/app',
      title: '文档',
      icon: <UnorderedListOutline fontSize={23} />,
    },
    {
      key: '/app/recent',
      title: '捷径',
      icon: <AppOutline fontSize={23} />,
    },
    {
      key: '/app/user',
      title: '个人',
      icon: <UserOutline fontSize={23} />,
    },
  ]
  const token = useUserStore(state => state.token)
  const loc = useLocation()
  const navigate = useNavigate()
  if (!token) {
    return <Navigate to="/login" />
  }
  return (
    <div className={styles.main}>
      <div className={styles.footer}>{renderNavigation()}</div>
      <Outlet />
    </div>
  )
  function renderNavigation() {
    return (
      <TabBar activeKey={loc.pathname} onChange={onTabChange} className={styles.tab}>
        {tabs.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            className={styles.tabItem}
          />
        ))}
      </TabBar>
    )
  }
  function onTabChange(value: string) {
    if (value !== loc.pathname) {
      navigate(value)
    }
  }
}

export default Layout
