import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import useHttp from '@/hooks/useHttp'
import API from '@/utils/api'

export interface User {
  _id: string
  avatar: string
  email: string
  name: string
}
export interface LoginPayload {
  isLogin: boolean
  data: {
    email: string
    pwd: string
  }
}
const STORE_STORAGE_KEY = 's-user'
/* eslint-disable no-unused-vars */
interface UserStoreProps {
  token: string | undefined
  user: User | undefined
  getToken: () => string | undefined
  getUser: () => User | undefined
  setToken: (token: string) => void
  setUser: (user: User) => void
  login: (payload: LoginPayload) => Promise<boolean>
  logout: () => void
}

// 创建 store
const useStore = create<UserStoreProps>()(
  devtools(
    persist(
      (set, get) => ({
        token: undefined,
        user: undefined,
        getToken: () => get().token,
        getUser: () => get().user,
        setToken: token => {
          set({ token })
        },
        setUser: user => {
          set({ user })
        },
        login: async (payload: LoginPayload): Promise<boolean> => {
          const { isLogin, data } = payload
          const res = await useHttp<{ token: string; user: User }>(
            isLogin ? API.login : API.register,
            {
              method: 'post',
              data,
            },
          )
          if (!res) return false
          const { token, user } = res
          set({ token, user })
          return true
        },
        logout: () => {
          set({ user: undefined, token: undefined })
          localStorage.clear()
        },
      }),
      { name: STORE_STORAGE_KEY },
    ),
  ),
)

export default useStore
