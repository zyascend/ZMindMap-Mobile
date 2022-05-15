import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

export function Courses() {
  return (
    <div>
      <h2>Courses</h2>
      <Outlet />
    </div>
  )
}

export function CoursesIndex() {
  return (
    <div>
      <p>Please choose a course:</p>

      <nav>
        <ul>
          <li>
            <Link to="react-fundamentals">React Fundamentals</Link>
          </li>
          <li>
            <Link to="advanced-react">Advanced React</Link>
          </li>
          <li>
            <Link to="react-router">React Router</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export function Course() {
  const { id } = useParams<'id'>()

  return (
    <div>
      <h2>Welcome to the id: {id} course!</h2>
      <p>This is a great course. You&apos;re gonna love it!</p>
      <Link to="/courses">See all courses</Link>
    </div>
  )
}
