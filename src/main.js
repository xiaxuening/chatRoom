import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as VueUse from '@vueuse/core'
console.log(VueUse);

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
