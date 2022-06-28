import { Button, Form, Input } from 'antd-mobile'
import md5 from 'js-md5'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import useAsyncEffect from '@/hooks/useAsyncEffect'
import useUserStore from '@/store/useUserStore'
import { LoginConfigs } from '@/utils/config'

import styles from './index.module.less'

enum LOGIN_STATUS {
  LOGIN,
  LOGINED,
  CONFIRMED,
}

function Login() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const user = useUserStore(state => state.user)
  const setQrcodeStatus = useUserStore(state => state.setQrcodeStatus)
  const login = useUserStore(state => state.login)

  const [status, setStatus] = useState<LOGIN_STATUS>(LOGIN_STATUS.LOGIN)

  useAsyncEffect(async () => {
    const from = params.get('from')
    const qid = params.get('qid')
    if (from === 'qrcode') {
      // TODO 当前移动端的token是过期状态的怎么处理
      if (user) {
        setStatus(LOGIN_STATUS.LOGINED)
        // TODO 异常处理 -> status设置失败的情况
        await setQrcodeStatus(qid, 'CONFIRMING')
      } else {
        setStatus(LOGIN_STATUS.LOGIN)
      }
    } else {
      setStatus(LOGIN_STATUS.LOGIN)
    }
  }, [params])
  return (
    <div className={styles.main}>
      {status === LOGIN_STATUS.LOGIN && renderForm()}
      {status === LOGIN_STATUS.LOGINED && renderUserInfo()}
      {status === LOGIN_STATUS.CONFIRMED && renderConfirmed()}
    </div>
  )

  function renderUserInfo() {
    if (!user) return null
    return (
      <div className={styles.userInfo}>
        <img src={user.avatar} alt="头像"></img>
        <span>{user.name}</span>
        <Button block color="primary" size="large" onClick={onConfirm}>
          确认登录
        </Button>
      </div>
    )
  }

  function renderConfirmed() {
    return <div>登录成功</div>
  }

  function renderForm() {
    return (
      <Form
        name="form"
        onFinish={onFinish}
        validateMessages={LoginConfigs.validateMessages}
        footer={
          <Button block type="submit" color="primary" size="large">
            登录
          </Button>
        }>
        <Form.Item name="email" label="邮箱" rules={LoginConfigs.rules.email}>
          <Input placeholder="请输入邮箱" clearable type="email" />
        </Form.Item>
        <Form.Item name="pwd" label="密码" rules={LoginConfigs.rules.pwd}>
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
      </Form>
    )
  }

  async function onFinish(values: { email: string; pwd: string }) {
    const { email, pwd } = values
    const success = await login({
      isLogin: true,
      data: {
        email,
        pwd: md5(pwd),
      },
    })
    if (success) {
      const from = params.get('from')
      const qid = params.get('qid')
      // 登录成功之后
      // 二维码登录的 -> 切换成确认登录状态
      if (from === 'qrcode') {
        setStatus(LOGIN_STATUS.LOGINED)
        await setQrcodeStatus(qid, 'CONFIRMING')
      } else {
        // 正常登录的 -> 跳转首页
        navigate('/', { replace: true })
      }
    }
    // TODO 登录不成功的情况处理
  }

  async function onConfirm() {
    // 移动端确认登录
    const confirmed = await setQrcodeStatus(params.get('qid'), 'CONFIRMED')
    if (confirmed) {
      setStatus(LOGIN_STATUS.CONFIRMED)
    } else {
      console.log('确认登录失败')
    }
  }
}
export default Login
