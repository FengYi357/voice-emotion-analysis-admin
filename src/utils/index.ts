import { NIcon } from 'naive-ui'
import { Component, h } from 'vue'
export * from './request'

// 渲染 icon
export function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

