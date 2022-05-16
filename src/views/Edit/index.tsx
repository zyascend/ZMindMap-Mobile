import React from 'react'
import { Link, useParams } from 'react-router-dom'
const Content: React.FC = () => {
  const { id } = useParams<'id'>()
  return (
    <div>
      <h2>CONTENT id: {id}</h2>
      <p>
        <Link to="/">回主页</Link>
      </p>
    </div>
  )
}
export default Content
