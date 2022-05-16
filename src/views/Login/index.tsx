import md5 from 'js-md5'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import useUserStore from '@/store/useUserStore'

function Login() {
  const user = useUserStore(state => state.user)
  const login = useUserStore(state => state.login)
  useEffect(() => {
    console.log('useEffect')
    const dd = async () => {
      await login({
        isLogin: true,
        data: {
          email: 'zyascend@qq.com',
          pwd: md5('111111'),
        },
      })
    }
    dd()
  }, [])
  return (
    <div>
      <p>Login: {JSON.stringify(user)} </p>
      <Link to="/">Home</Link>
    </div>
  )
}
export default Login
