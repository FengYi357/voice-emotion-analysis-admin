import { createI18n } from 'vue-i18n'
import { zh } from './zh'
import { en } from './en'

export const i18n = createI18n({
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 回退语言
  legacy: false, // 设置为 false 以在 Vue 3 中使用 Composition API
  messages: {
    en,
    zh
  }
})
