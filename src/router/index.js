import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由配置不可使用children
const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home/Home'),
    meta: {
      keepAlive: true,
    },
  },{
    path: '/About',
    name: 'About',
    component: () => import('@/views/About'),
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
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
