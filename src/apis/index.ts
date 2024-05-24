import { Advice, Role, Share, User } from '@/types'
import { request } from '@/utils'

export const login = (data: {
  username: string
  password: string
}): Promise<{
  access_token: string
  userInfo: User
}> => request.post('/users/admin/login', data)

export const register = (data: {
  username: string
  password: string
}): Promise<User> => request.post('/users/register', data)

export const profile = (): Promise<User> => request.get('/users/profile')

export const queryUserList = (
  page: number = 1,
  pageSize: number = 10
): Promise<{
  list: User[]
  total: number
}> =>
  request.get('/users', {
    params: {
      page,
      pageSize
    }
  })

export const deleteUser = (id: string): Promise<boolean> => {
  return request.delete(`/users/${id}`)
}

export const resetPassword = (
  id: string,
  password: string
): Promise<boolean> => {
  return request.put(`/users/${id}/password`, { password })
}

export const updateUserInfo = (
  id: string,
  data: {
    username: string
    nickname: string
    role: Role
  }
): Promise<boolean> => {
  return request.put(`/users/${id}`, data)
}

export const queryAdviceList = (
  page: number = 1,
  pageSize: number = 10
): Promise<{
  list: Advice[]
  total: number
}> =>
  request.get('/advices/admin', {
    params: {
      page,
      pageSize
    }
  })

export const deleteAdvice = (id: string): Promise<boolean> => {
  return request.delete(`/advices/${id}`)
}

export const updateAdvice = (
  id: string,
  data: {
    reply: string
  }
): Promise<boolean> => {
  return request.put(`/advices/${id}/reply`, data)
}

export const queryShareList = (
  page: number = 1,
  pageSize: number = 10
): Promise<{
  list: Share[]
  total: number
}> =>
  request.get('/shares/admin', {
    params: {
      page,
      pageSize
    }
  })

export const deleteShare = (id: string): Promise<boolean> => {
  return request.delete(`/shares/${id}`)
}
