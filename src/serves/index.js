import * as api from './api'

const installApi = {
  install (Vue) {
    Vue.prototype.$api = api
  },
}

export default installApi
