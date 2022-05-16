import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import cls from './index.module.less'
function Home() {
  useEffect(() => {
    console.log('home effect')
  }, [])
  return (
    <div>
      <h2>Home</h2>
      <Link to="/edit/123123">编辑页</Link>
    </div>
  )
}
export default Home
