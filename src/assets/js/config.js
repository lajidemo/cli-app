import Vue from 'vue'
import store from '@/store/index'

const { aliveRouters } = store.state.common

function addRoutes (item) {
  // 未匹配到才添加
  if (item.meta.keepAlive && aliveRouters.indexOf(item.name) === -1) {
    store.commit('common/updateAliveRouters',{
      action: 'add',
      routerName: item.name,
    })
  }
}

function delRoutes (item) {
  // 匹配到才删除
  if (item.meta.keepAlive && aliveRouters.indexOf(item.name) !== -1) {
    store.commit('common/updateAliveRouters',{
      action: 'del',
      routerName: item.name,
    })
  }
}

/*
  钩子触发顺序：beforeEach -> 全局混入beforeRouteEnter -> 路由组件beforeRouteEnter -> created/activated -> next回调
  1、在全局前置守卫beforeEach先判断to的路由是否标记为keepAlive: true
  2、如不需要，则先删除store里to的缓存路由
  3.1、之后keep-alive的include匹配不到to的路由，则走created生命周期流程，即刷新
  3.2、之后keep-alive的include匹配到to的路由，则走activated生命周期流程，即不刷新
  4、然后在全局混入的beforeRouterEnter里next回调方法里再添加to的路由

  注：因为用了to.matched遍历，故路由配置不可使用children，因为如果匹配子路由matched会匹配到父路由和子路由，导致判断有问题
*/
function setRouterBeforeEach (router) {
  router.beforeEach((to,from,next) => {
    to.matched.forEach(item => {
      // ↓↓↓ 配置的是从哪些页面跳转过去的需要to页面是缓存状态的
      const fromRoutes = item.meta.fromRoutes
      // 添加缓存路由：
      //     未配置缓存路由数组（则所有页面跳转至to路由，该页面都是缓存状态） ||
      //     首次进入 ||
      //     fromRoutes配置了from.name
      if (
        item.meta.keepAlive &&
        (!fromRoutes || !from.name || fromRoutes.indexOf(from.name) !== -1)
      ) {
        console.log('回退添加000000')
        addRoutes(item)
      } else {
        console.log('前进删除111111')
        delRoutes(item)
      }
    })
    next()
  })

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
}

export default {
  setRouterBeforeEach,
}
