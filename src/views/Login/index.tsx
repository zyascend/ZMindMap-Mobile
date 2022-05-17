import { Button } from 'antd-mobile'
import md5 from 'js-md5'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import useUserStore from '@/store/useUserStore'

function Login() {
  const user = useUserStore(state => state.user)
  const login = useUserStore(state => state.login)
  const navigate = useNavigate()
  const submitLogin = async () => {
    const success = await login({
      isLogin: true,
      data: {
        email: 'zyascend@qq.com',
        pwd: md5('111111'),
      },
    })
    if (success) {
      navigate('/', { replace: true })
    }
  }
  return (
    <div>
      <p>Login: {JSON.stringify(user)} </p>
      <Button color="primary" onClick={submitLogin}>
        登录
      </Button>
    </div>
  )
}
export default Login
