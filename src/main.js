import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $axios from './assets/js/config'
import './serves/mock'
import { Notify } from 'vant'

// 全局注册
Vue.use(Notify)

Vue.config.productionTip = false
Vue.prototype.$axios = $axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
