import React from 'react'
import { Link } from 'react-router-dom'
function NoMatch() {
  return (
    <div>
      <h2>It looks like you&lsquo;re lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
export default NoMatch
