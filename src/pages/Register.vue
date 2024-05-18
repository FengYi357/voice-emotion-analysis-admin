<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/apis'
import { FormInst, useMessage } from 'naive-ui'

const message = useMessage()

const formRef = ref<FormInst | null>(null)
const formValue = reactive({
  username: '',
  password: ''
})

const router = useRouter()

const onRegister = () => {
  formRef.value
    ?.validate()
    .then(() =>
      register(formValue)
        .then(() => {
          message.success('注册成功')
          router.push('/login')
        })
        .catch((e) => {
          message.error(e.message)
        })
    )
    .catch((e) => {
      message.error(e.message)
    })
}
</script>

<template>
  <n-flex :style="{ height: '100%' }" justify="center" align="center">
    <n-card :style="{ width: '400px' }">
      <n-h3 prefix="bar">注册</n-h3>
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
          <n-input v-model:value="formValue.password" placeholder="密码" />
        </n-form-item>
      </n-form>
      <n-flex justify="center">
        <n-button block type="primary" @click="onRegister">注册</n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<style lang="less" scoped></style>
