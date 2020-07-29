import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import installApi from '@/serves/index'
import config from '@/assets/js/config'
import '@/serves/mock'
import 'vant/lib/icon/local.css'
import { Toast } from 'vant'
// Gist ID:171f78aed3fccc96ca5d7850f3f8c5f3。请复制这个 ID 并将其用于其他设备来下载配置。
// 全局注册
Vue.use(Toast)
Vue.use(installApi)

Vue.config.productionTip = false
config.setRouterBeforeEach(router)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
