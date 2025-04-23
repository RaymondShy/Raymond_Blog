import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import router from './router'
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/base.css'
import '@/assets/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(ArcoVue)
app.use(router)

app.mount('#app')
