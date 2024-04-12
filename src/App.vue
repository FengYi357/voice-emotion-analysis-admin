<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AUTH_TOKEN_KEY } from './config'

const router = useRouter()
const token = localStorage.getItem(AUTH_TOKEN_KEY)

if (!token) {
  router.push('/login')
}
</script>

<template>
  <n-modal-provider>
    <n-dialog-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-dialog-provider>
  </n-modal-provider>
</template>

<style lang="less" scoped></style>
