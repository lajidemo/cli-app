import Vue from 'vue'
import store from '@/store/index'

const { aliveRouters } = store.state.common

function addRoutes (item) {
  // 未匹配到才添加
  if (item.meta.keepAlive && aliveRouters.indexOf(item.name) === -1) {
    store.commit('updateAliveRouters',{
      action: 'add',
      routerName: item.name,
    })
  }
}

function delRoutes (item) {
  // 匹配到才删除
  if (item.meta.keepAlive && aliveRouters.indexOf(item.name) !== -1) {
    store.commit('updateAliveRouters',{
      action: 'del',
      routerName: item.name,
    })
  }
}

function setRouterBeforeEach (router) {
  router.beforeEach((to,from,next) => {
    to.matched.forEach(item => {
      // ↓↓↓ 配置的是从哪些页面回来的需要store添加缓存当前页面的路由
      const fromRoutes = item.meta.fromRoutes
      /* 添加缓存路由：
          未配置缓存路由数组 ||
          首次进入 ||
          fromRoutes配置了from.name */
      if (
        item.meta.keepAlive &&
        (!fromRoutes || !from.name || fromRoutes.indexOf(from.name) !== -1)
      ) {
        addRoutes(item)
      } else {
        delRoutes(item)
      }
    })
    console.log('store==',aliveRouters)
    next()
  })
}

Vue.mixin({
  beforeRouteEnter (to,from,next) {
    next(() => {
      to.matched.forEach(item => {
        if (item.meta.keepAlive) {
          addRoutes(item)
        }
      })
    })
  },
})

export default {
  setRouterBeforeEach,
}
