import type { RouteObject } from 'react-router-dom'

import Layout from '@/components/Layout'
import Content from '@/views/content'
import Home from '@/views/home'
import { Course, Courses, CoursesIndex } from '@/views/login'
import NoMatch from '@/views/no-match'
import User from '@/views/user'
// https://stackblitz.com/github/remix-run/react-router/tree/main/examples/route-objects?file=src%2FApp.tsx

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/courses',
        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          { path: '/courses/:id', element: <Course /> },
        ],
      },
      { path: '*', element: <NoMatch /> },
      { path: '/User', element: <User /> },
    ],
  },
  {
    path: '/content/:id',
    element: <Content />,
  },
]

export { routes }
