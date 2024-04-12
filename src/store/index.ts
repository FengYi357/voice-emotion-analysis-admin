import { User } from '@/types'
import { defineStore } from 'pinia'

export const useStore = defineStore('app', () => {
  const userInfo = null as null | User
  return {
    userInfo
  }
})
