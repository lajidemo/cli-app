import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 如果config.js使用to.matched遍历，路由配置不可使用children
const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login/Login'),
    meta: {
      title: '登录',
      keepAlive: true,
      fromRoutes: ['Code','FindPsw'],
    },
  },{
    path: '/Code',
    name: 'Code',
    component: () => import('@/views/Login/Code'),
    meta: {
      title: '验证码登录',
    },
  },{
    path: '/FindPsw',
    name: 'FindPsw',
    component: () => import('@/views/Login/FindPsw'),
    meta: {
      title: '找回密码',
    },
  },{
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home/Home'),
    meta: {
      keepAlive: true,
    },
  },{
    path: '/Car',
    name: 'Car',
    component: () => import(/* webpackChunkName: "Car" */ '@/views/Car/Car'),
    meta: {
      keepAlive: true,
    },
  },{
    path: '/Car/Car1',
    name: 'Car1',
    component: () => import('@/views/Car/Car1'),
    meta: {
      keepAlive: true,
      fromRoutes: ['Car2'],
    },
  },{
    path: '/Car/Car2',
    name: 'Car2',
    component: () => import('@/views/Car/Car2'),
  },{
    path: '/Classify',
    name: 'Classify',
    component: () => import('@/views/Classify/Classify'),
    meta: {
      keepAlive: true,
    },
  },{
    path: '/Find',
    name: 'Find',
    component: () => import('@/views/Find/Find'),
    meta: {
      keepAlive: true,
    },
  },{
    path: '/Person',
    name: 'Person',
    component: () => import('@/views/Person/Person'),
    meta: {
      keepAlive: true,
    },
  },{
    path: '/',
    redirect: '/Home',
  },{
    path: '*',
    name: 'Error',
    component: () => import('@/views/Error/Error'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
