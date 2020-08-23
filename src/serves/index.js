/**
 * api接口插件，挂载$api，全局调用
 */
import * as api from './api'

const installApi = {
  install (Vue) {
    Vue.prototype.$api = api
  },
}

export default installApi
