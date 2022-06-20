import { Button, Form, Input } from 'antd-mobile'
import md5 from 'js-md5'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import useUserStore from '@/store/useUserStore'
import { LoginConfigs } from '@/utils/config'

import styles from './index.module.less'

function Login() {
  const navigate = useNavigate()
  const user = useUserStore(state => state.user)
  const login = useUserStore(state => state.login)
  console.log(navigate, user, login)

  return (
    <div className={styles.main}>
      <Form
        name="form"
        onFinish={onFinish}
        validateMessages={LoginConfigs.validateMessages}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }>
        <Form.Item name="email" label="邮箱" rules={LoginConfigs.rules.email}>
          <Input placeholder="请输入邮箱" clearable type="email" />
        </Form.Item>
        <Form.Item name="pwd" label="密码" rules={LoginConfigs.rules.pwd}>
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
      </Form>
    </div>
  )
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
      navigate('/', { replace: true })
    }
  }
}
export default Login
