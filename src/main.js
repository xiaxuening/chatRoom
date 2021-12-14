import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as VueUse from '@vueuse/core'
import dayjs from 'dayjs'
console.log(process.env.VUE_APP_ROBOT_HOST)
const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
