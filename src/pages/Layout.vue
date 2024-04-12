<script setup lang="ts">
import { LanguageOutline, PersonOutline } from '@vicons/ionicons5'
import { DropdownProps, MenuOption } from 'naive-ui'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'
import { renderIcon } from '../utils'
import { useStore } from '../store'
import { profile } from '../apis'
import { AUTH_TOKEN_KEY } from '../config'

const { t, locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const store = useStore()

if (!store.userInfo) {
  profile()
    .then((res) => {
      store.userInfo = res
    })
    .catch(() => {
      store.userInfo = null
      localStorage.removeItem(AUTH_TOKEN_KEY)
      router.push('/login')
    })
}

const languageOptions: DropdownProps['options'] = [
  {
    label: '中文',
    key: 'zh'
  },
  {
    label: 'English',
    key: 'en'
  }
]

const handleLanguageChange = (value: string) => {
  locale.value = value
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        { to: { name: 'user' } },
        { default: () => t('menu.user') }
      ),
    key: 'user',
    icon: renderIcon(PersonOutline)
  }
]

const dropdownOptions: MenuOption[] = [
  {
    label: () => t('menu.logout'),
    key: 'logout'
  }
]

const selectHandle = (key: string) => {
  if (key === 'logout') {
    store.userInfo = null
    localStorage.removeItem(AUTH_TOKEN_KEY)
    router.push('/login')
  }
}
</script>

<template>
  <n-layout :style="{ height: '100%' }">
    <n-layout-header bordered :style="{ height: '64px' }">
      <n-flex
        :style="{ height: '100%', padding: '0 24px' }"
        justify="space-between"
        align="center"
      >
        <n-h1 prefix="bar" :style="{ margin: 0 }">{{ t('global.title') }}</n-h1>
        <n-flex align="center">
          <n-dropdown
            :value="locale"
            trigger="click"
            :options="languageOptions"
            @select="handleLanguageChange"
          >
            <n-button text style="font-size: 18px">
              <n-icon>
                <LanguageOutline />
              </n-icon>
            </n-button>
          </n-dropdown>
          <!-- 用户信息区 -->
          <n-dropdown
            trigger="click"
            :options="dropdownOptions"
            @select="selectHandle"
          >
            <n-avatar
              size="small"
              shape="circle"
              style="margin-left: 8px"
              :src="store.userInfo?.avatar"
            />
          </n-dropdown>
        </n-flex>
      </n-flex>
    </n-layout-header>
    <n-layout has-sider :style="{ height: 'calc(100% - 64px)' }">
      <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="0"
        :width="240"
        show-trigger="bar"
        bordered
        content-style="padding: 12px;"
        :native-scrollbar="false"
      >
        <n-menu :options="menuOptions" default-value="user" />
      </n-layout-sider>
      <n-layout-content>
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped></style>
