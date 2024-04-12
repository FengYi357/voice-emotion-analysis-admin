<script setup lang="ts">
import { deleteUser, queryUserList, resetPassword } from '@/apis'
import { User, Role } from '@/types'
import dayjs from 'dayjs'
import {
  DataTableColumns,
  FormInst,
  NButton,
  NInput,
  NSpace,
  NTag,
  useDialog,
  useMessage
} from 'naive-ui'
import { h, reactive, ref } from 'vue'

const dialog = useDialog()
const message = useMessage()

const modalShow = ref(false)
const formValue = reactive({
  password: ''
})
const selectedUser = ref<User | null>(null)
const formRef = ref<FormInst | null>(null)

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  itemCount: 0,
  // pageCount: 0,
  onChange: (page: number) => {
    pagination.page = page
    getUserList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getUserList()
  }
})

const data = ref<User[]>([])

const getUserList = () => {
  queryUserList(pagination.page, pagination.pageSize).then((res) => {
    data.value = res.list
    pagination.itemCount = res.total
  })
}
getUserList()

const columns: DataTableColumns<User> = [
  {
    title: '头像',
    key: 'avatar',
    render(rowData) {
      return h('img', {
        src: rowData.avatar,
        alt: rowData.username,
        style: {
          width: '40px',
          height: '40px',
          borderRadius: '50%'
        }
      })
    }
  },
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '昵称',
    key: 'nickname',
    render(rowData) {
      return h('span', rowData.nickname || '--')
    }
  },
  {
    title: '角色',
    key: 'role',
    render(rowData) {
      return h(NTag, rowData.role === Role.Admin ? '管理员' : '普通用户')
    }
  },
  {
    title: '更新时间',
    key: 'updatedAt',
    render(rowData) {
      return dayjs(rowData.updatedAt as string).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '创建时间',
    key: 'createdAt',
    render(rowData) {
      return dayjs(rowData.updatedAt as string).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '操作',
    key: 'action',
    width: '200px',
    render(rowData) {
      return h(NSpace, {}, [
        h(
          NButton,
          {
            type: 'info',
            size: 'small',
            secondary: true,
            onClick: () => {
              modalShow.value = true
              selectedUser.value = rowData
            }
          },
          { default: () => '重置密码' }
        ),
        h(
          NButton,
          {
            type: 'error',
            size: 'small',
            secondary: true,
            onClick: () => {
              dialog.create({
                title: '删除用户',
                content: `确定删除用户 ${rowData.username} 吗？`,
                type: 'error',
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: () => {
                  deleteUser(rowData._id).then((success) => {
                    if (success) {
                      message.success('删除成功')
                      getUserList()
                    } else {
                      message.error('删除失败')
                    }
                  })
                }
              })
            }
          },
          { default: () => '删除' }
        )
      ])
    }
  }
]

const onCancel = () => {
  modalShow.value = false
  formValue.password = ''
  selectedUser.value = null
}

const onConfirm = () => {
  formRef.value?.validate().then(() => {
    if (selectedUser.value) {
      modalShow.value = false
      resetPassword(selectedUser.value?._id, formValue.password)
        .then((success) => {
          if (success) {
            message.success('重置密码成功')
          } else {
            message.error('重置密码失败')
          }
        })
        .finally(() => {
          formValue.password = ''
          selectedUser.value = null
          getUserList()
        })
    }
  })
}
</script>

<template>
  <div :style="{ padding: '24px' }">
    <n-h2 prefix="bar" type="info">用户管理</n-h2>
    <n-data-table
      remote
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </div>
  <n-modal
    :show="modalShow"
    title="重置密码"
    preset="dialog"
    @close="onCancel"
    @negative-click="onCancel"
    :mask-closable="false"
  >
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="{
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }"
    >
      <n-form-item path="password">
        <n-input
          v-model:value="formValue.password"
          show-count
          :maxlength="20"
          placeholder="请输入新密码"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button @click="onCancel">取消</n-button>
      <n-button type="primary" @click="onConfirm">确定</n-button>
    </template>
  </n-modal>
</template>

<style lang="less" scoped></style>
