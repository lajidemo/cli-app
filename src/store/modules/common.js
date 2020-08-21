const common = {
  namespaced: true,
  state: {
    // isLogin: false,
    aliveRouters: [],
  },
  mutations: {
    checkLoginState (st,{ vueContext,callBack }) {
      if (!sessionStorage.isLogin) {
        vueContext.$router.push('/login')
      } else {
        callBack && callBack()
      }
    },
    toggleLoginState (st,state) { // 切换登录状态
      // st.isLogin = state
      sessionStorage.isLogin = state
    },
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
    addCars ({ commit },vueContext,params,config) { // 添加购物车
      const callBack = () => {
        vueContext.$api.apiLogin(params,config).then(res => {
          console.log('res===',res)
        })
      }
      // commit(mutations方法名,参数,{root: true}(访问全局的mutations方法))
      commit('checkLoginState',{ vueContext,callBack })
    },
  },
}

export default common
