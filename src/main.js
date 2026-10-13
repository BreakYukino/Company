import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './signage.css'
import { brand } from './brand'
document.title = `${brand.name} · ${brand.id === 'signage' ? 'IoT 广告标识' : '登录'}`
createApp(App).mount('#app')
