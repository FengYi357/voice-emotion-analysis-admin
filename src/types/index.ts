export enum Role {
  SYS_ADMIN = 'sys_admin',
  Admin = 'admin',
  User = 'user'
}

export interface User {
  _id: string
  username: string
  nickname?: string
  avatar: string
  role: Role
  createdAt: string
  updatedAt: string
}
