<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/apis'
import { FormInst, useMessage } from 'naive-ui'
import { useStore } from '@/store'
import { AUTH_TOKEN_KEY } from '@/config'

const message = useMessage()
const store = useStore()

const formRef = ref<FormInst | null>(null)
const formValue = reactive({
  username: '',
  password: ''
})

const router = useRouter()

const onLogin = () => {
  formRef.value
    ?.validate()
    .then(() =>
      login(formValue)
        .then((res) => {
          message.success('登录成功')
          localStorage.setItem(AUTH_TOKEN_KEY, res.access_token)
          store.userInfo = res.userInfo
          router.push('/')
        })
        .catch(() => {
          message.error('登录失败')
        })
    )
    .catch(() => {
      message.error('请检查输入')
    })
}
</script>

<template>
  <n-flex :style="{ height: '100%' }" justify="center" align="center">
    <n-card :style="{ width: '400px' }">
      <n-h3 prefix="bar">登录</n-h3>
      <n-form
        ref="formRef"
        :model="formValue"
        label-placement="top"
        label-width="80px"
        :rules="{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }"
      >
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="formValue.username" placeholder="用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            type="password"
            v-model:value="formValue.password"
            placeholder="密码"
          />
        </n-form-item>
      </n-form>
      <n-flex justify="center">
        <n-button block type="primary" @click="onLogin">登录</n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<style lang="less" scoped></style>
