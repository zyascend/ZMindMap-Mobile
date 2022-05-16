import React from 'react'
import type { RouteObject } from 'react-router-dom'

import FullScreenLoading from '@/components/FullScreenLoading'
import Layout from '@/components/Layout'
import Home from '@/views/Home'
import NoMatch from '@/views/NoMatch'
import Recent from '@/views/Recent'
import User from '@/views/User'

const Login = React.lazy(() => import('@/views/Login'))
const Edit = React.lazy(() => import('@/views/Edit'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/recent', element: <Recent /> },
      { path: '/user', element: <User /> },
    ],
  },
  {
    path: '/edit/:id',
    element: (
      <React.Suspense fallback={<FullScreenLoading />}>
        <Edit />
      </React.Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <React.Suspense fallback={<FullScreenLoading />}>
        <Login />
      </React.Suspense>
    ),
  },
  { path: '*', element: <NoMatch /> },
]

export { routes }
