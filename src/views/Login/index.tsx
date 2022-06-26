import { Button, Form, Input } from 'antd-mobile'
import md5 from 'js-md5'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useAsyncEffect from '@/hooks/useAsyncEffect'
import useUserStore, { User } from '@/store/useUserStore'
import { LoginConfigs } from '@/utils/config'

import styles from './index.module.less'

enum LOGIN_STATUS {
  LOGIN,
  LOGINED,
  CONFIRMED,
}

function Login() {
  const navigate = useNavigate()
  const params = useParams<{ from: string; qid: string }>()

  const fetchUser = useUserStore(state => state.fetchUser)
  const confirmLogin = useUserStore(state => state.confirmLogin)
  const login = useUserStore(state => state.login)

  const [status, setStatus] = useState<LOGIN_STATUS>(LOGIN_STATUS.LOGIN)
  const [user, setUser] = useState<User | null>(null)

  useAsyncEffect(async () => {
    if (params.from === 'qrcode') {
      const userInfo = await fetchUser()
      if (userInfo) {
        setStatus(LOGIN_STATUS.LOGINED)
        setUser(userInfo)
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
      <div>
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
      if (params.from === 'qrcode') {
        setStatus(LOGIN_STATUS.LOGINED)
      } else {
        navigate('/', { replace: true })
      }
    }
  }

  async function onConfirm() {
    const confirmed = await confirmLogin(params.qid || '')
    if (confirmed) {
      setStatus(LOGIN_STATUS.CONFIRMED)
    }
  }
}
export default Login
