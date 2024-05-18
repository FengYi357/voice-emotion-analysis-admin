import { User } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('app', () => {
  const userInfo = ref<User | null>(null)
  return {
    userInfo
  }
})
