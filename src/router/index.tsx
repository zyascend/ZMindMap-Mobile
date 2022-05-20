import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { FullPageLoading } from '@/components/FullPageFallback'
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
    element: <Navigate to="/app" replace />,
  },
  {
    path: '/app',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/app/recent', element: <Recent /> },
      { path: '/app/user', element: <User /> },
      { path: '/app/:id', element: <Home /> },
    ],
  },
  {
    path: '/edit/:id',
    element: (
      <React.Suspense fallback={<FullPageLoading />}>
        <Edit />
      </React.Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <React.Suspense fallback={<FullPageLoading />}>
        <Login />
      </React.Suspense>
    ),
  },
  { path: '*', element: <NoMatch /> },
]

export { routes }
