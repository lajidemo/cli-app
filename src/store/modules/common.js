const common = {
  state: {
    aliveRouters: [],
  },
  mutations: {
    updateAliveRouters (st,{ action,router }) {
      const methods = {
        add () {
          st.aliveRouters.push(router)
        },
        del () {
          st.aliveRouters.splice(st.aliveRouters.indexOf(router),1)
        },
      }
      methods[action]()
    },
  },
}

export default common
