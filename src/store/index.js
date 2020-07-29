import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'

Vue.use(Vuex)

// 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的
// 这样使得多个模块能够对同一 mutation 或 action 作出响应。
// 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
// 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common: { ...common,namespaced: true },
  },
})
