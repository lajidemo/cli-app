import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },{
    path: '/about',
    name: 'About',
    component: () => import('@/views/About'),
  },{
    path: '/Car',
    name: 'Car',
    component: () => import('@/views/Car/Car'),
    meta: {
      keepAlive: true,
    },
  },{
    path: '/Classify',
    name: 'Classify',
    component: () => import('@/views/Classify/Classify'),
  },{
    path: '/Find',
    name: 'Find',
    component: () => import('@/views/Find/Find'),
  },{
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home/Home'),
  },{
    path: '/Person',
    name: 'Person',
    component: () => import('@/views/Person/Person'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
