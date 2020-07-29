const common = {
  state: {
    aliveRouters: [],
  },
  mutations: {
    updateAliveRouters (st,{ action,routerName }) {
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
}

export default common
