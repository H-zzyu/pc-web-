import './assets/main.css'
import mitt from 'mitt'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router.js'
import App from './App.vue'
import { vueBaberrage } from 'vue-baberrage'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElMessage)
app.use(router)
app.use(createPinia())
app.use(vueBaberrage)
app.mount('#app')
app.config.globalProperties.$Bus=new mitt()
import "element-plus/es/components/message/style/css"