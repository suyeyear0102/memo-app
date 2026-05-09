import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'    // ← 必须引入路由

const app = createApp(App)

app.use(createPinia())  // 挂载 Pinia
app.use(router)         // ← 必须挂载路由
app.mount('#app')