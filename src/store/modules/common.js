const common = {
  namespaced: true,
  state: {
    aliveRouters: [],
  },
  mutations: {
    updateAliveRouters (st,{ action,routerName }) { // 缓存路由列表
      const methods = {
        add () {
          st.aliveRouters.push(routerName)
        },
        del () {
          st.aliveRouters.splice(st.aliveRouters.indexOf(routerName),1)
        },
      }
      methods[action]()
    },
  },
  actions: {
    /* commit(mutations方法名,参数,{root: true}(访问全局的mutations方法))
    fn ({ commit },params) {
      commit('mutationsFn',params,{root: true})
    }, */
  },
}

export default common
