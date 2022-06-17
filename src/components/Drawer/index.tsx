/**
 * @param {visible} 控制Drawer显示
 *  onClose 关闭回调
 *  title 标题
 *  width 宽度
 *  zIndex zIndex
 *  placement 抽屉方向
 *  mask 是否展示遮罩
 *  maskClosable 点击遮罩是否关闭
 *  closable 是否显示右上角关闭按钮
 *  destroyOnClose 关闭抽屉销毁子元素
 *  getContainer 指定 Drawer 挂载的 HTML 节点, 可以将抽屉挂载在任何元素上
 *  drawerStyle 能自定义抽屉弹出层样式
 */

import classnames from 'classnames'
import { CSSProperties, ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import styles from './index.module.less'

interface DrawerProps {
  visible: boolean
  title: string
  width?: number
  zIndex?: number
  placement?: 'left' | 'right'
  mask?: boolean
  maskClosable?: boolean
  closable?: boolean
  destroyOnClose?: boolean
  container?: HTMLElement | undefined
  children?: ReactNode
  onClose?: () => void
  drawerStyle?: CSSProperties
}

export const Drawer: React.FC<DrawerProps> = props => {
  const {
    visible,
    title = '标题',
    closable = true,
    width = 300,
    onClose,
    zIndex = 1000,
    placement = 'right',
    mask = true,
    maskClosable = true,
    destroyOnClose = true,
    container = document.body,
    drawerStyle,
  } = props

  // 控制关闭弹框清空弹框里面的元素
  const [clearContentDom, setClearContentDom] = useState(false)

  // 控制drawer 的显示隐藏
  const [drawerVisible, setDrawerVisible] = useState(visible)
  useEffect(() => {
    setDrawerVisible(() => {
      if (container && visible) {
        container.style.overflow = 'hidden'
      }
      return visible
    })
    if (visible) {
      setClearContentDom(false)
    }
  }, [visible])

  // 点击弹框关闭
  const handleClose = () => {
    setDrawerVisible(prevVisible => {
      if (container && prevVisible) {
        container.style.overflow = 'auto'
      }
      return false
    })
    onClose && onClose()
    if (destroyOnClose) {
      setClearContentDom(true)
    }
  }

  const drawerDom = (
    <div
      className={styles.drawerWarp}
      style={{
        width: drawerVisible ? '100%' : '0',
        zIndex,
        position: container ? 'absolute' : 'fixed',
      }}>
      {mask && (
        <div
          aria-hidden="true"
          className={styles.drawerMask}
          style={{ opacity: drawerVisible ? 1 : 0 }}
          onClick={maskClosable ? handleClose : undefined}></div>
      )}
      <div
        className={classnames(
          styles.drawerContent,
          !drawerVisible ? styles.closeDrawer : '',
        )}
        style={{
          width,
          [placement]: 0,
          ...drawerStyle,
        }}>
        {title && <div className={styles.titleDrawer}>{title}</div>}
        <div style={{ padding: 16 }}>{clearContentDom ? null : props.children}</div>
        {closable && (
          <span
            aria-hidden="true"
            className={styles.closeDrawerBtn}
            onClick={handleClose}>
            X
          </span>
        )}
      </div>
    </div>
  )
  return !container ? drawerDom : ReactDOM.createPortal(drawerDom, container)
}
