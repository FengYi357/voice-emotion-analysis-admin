<script setup lang="ts">
import { deleteShare, queryShareList } from '@/apis'
import { Share } from '@/types'
import dayjs from 'dayjs'
import {
  DataTableColumns,
  FormInst,
  NButton,
  NSpace,
  useDialog,
  useMessage
} from 'naive-ui'
import { h, reactive, ref } from 'vue'

const dialog = useDialog()
const message = useMessage()

const modalShow = ref(false)
const formValue = reactive({
  title: '',
  content: ''
})
const selectedShare = ref<Share | null>(null)
const infoFormRef = ref<FormInst | null>(null)

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  itemCount: 0,
  // pageCount: 0,
  onChange: (page: number) => {
    pagination.page = page
    getShareList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getShareList()
  }
})

const data = ref<Share[]>([])

const getShareList = () => {
  queryShareList(pagination.page, pagination.pageSize).then((res) => {
    console.log('✨  ~ queryShareList ~ res:', res)
    data.value = res.list
    pagination.itemCount = res.total
  })
}
getShareList()

const columns: DataTableColumns<Share> = [
  {
    title: '头像',
    key: 'avatar',
    render(rowData) {
      return h('img', {
        src: rowData.user.avatar,
        alt: rowData.user.username,
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
    key: 'user.username'
  },
  {
    title: '分享',
    key: 'title'
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
            type: 'primary',
            size: 'small',
            secondary: true,
            onClick: () => {
              modalShow.value = true
              selectedShare.value = rowData
              formValue.title = rowData.title
              formValue.content = rowData.content || ''
            }
          },
          { default: () => '详情' }
        ),
        h(
          NButton,
          {
            type: 'error',
            size: 'small',
            secondary: true,
            onClick: () => {
              dialog.create({
                title: '删除该分享',
                content: `确定删除用户 ${rowData.user.username} 分享的 ${rowData.title} 吗？`,
                type: 'error',
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: () => {
                  deleteShare(rowData._id).then((success) => {
                    if (success) {
                      message.success('删除成功')
                      getShareList()
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
  selectedShare.value = null
}
</script>

<template>
  <div :style="{ padding: '24px' }">
    <n-h2 prefix="bar" type="info">社区管理</n-h2>
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
    title="分享详情"
    preset="dialog"
    @close="onCancel"
    @negative-click="onCancel"
    :mask-closable="false"
  >
    <n-form ref="infoFormRef" :model="formValue">
      <n-form-item label="标题" path="title">
        <n-input v-model:value="formValue.title" readonly />
      </n-form-item>
      <n-form-item label="内容" path="content">
        <n-input v-model:value="formValue.content" readonly />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button @click="onCancel">取消</n-button>
    </template>
  </n-modal>
</template>

<style lang="less" scoped></style>
