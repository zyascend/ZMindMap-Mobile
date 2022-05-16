import React from 'react'
// import cls from './index.module.less'
import { Link } from 'react-router-dom'

const User: React.FC = () => {
  return (
    <div>
      <h2>User</h2>
      <Link to="/login">登录</Link>
    </div>
  )
}
export default User
