import { Role, User } from '@/types'
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
