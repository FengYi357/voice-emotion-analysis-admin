import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './locale'
import { router } from './routes'
import './style.css'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
