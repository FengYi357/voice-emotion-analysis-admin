export enum Role {
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
