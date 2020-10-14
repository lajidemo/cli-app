/**
 * 入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import installApi from '@/serves/index'
import config from '@/assets/js/config'
import '@/assets/css/reset.css'
import '@/serves/mock'
import 'vant/lib/icon/local.css'
import { Toast,Icon } from 'vant'
// 全局注册
Vue.use(Icon)
Vue.use(installApi)

Vue.prototype.$toast = Toast
Vue.config.productionTip = false

// 全局前置守卫，路由组件前置守卫
config.setRouterBeforeEach(router)

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

window.vm = vm
