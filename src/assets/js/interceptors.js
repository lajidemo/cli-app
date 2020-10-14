/**
 * 设置axios请求和响应拦截
 * 全局添加请求loading效果
 * 导出Axios的get和post方法
 */
import axios from 'axios'
import Vue from 'vue'
import Loading from '@/components/Loading/Loading'
import { Toast } from 'vant'

const AXIOSTIMEOUT = 20000

const Axios = axios.create({
  timeout: AXIOSTIMEOUT,
})

let count = 0
function showLoading () {
  if (count === 0) {
    const loadingNote = document.createElement('div')
    loadingNote.setAttribute('id','loadingNote')
    document.body.appendChild(loadingNote)
    const $loading = Vue.extend(Loading)
    var _loading = new $loading().$mount()
    document.getElementById('loadingNote').appendChild(_loading.$el)
    // new $loading().$mount('#loadingNote') // $mount方法会直接替换掉“#loadingNote”元素
  }
  count++
}
function hideLoading () {
  count--
  if (count === 0) {
    const loadingNote = document.getElementById('loadingNote')
    document.body.removeChild(loadingNote)
  }
}
// 请求拦截
Axios.interceptors.request.use((config) => {
  console.log('请求==',config)
  if (!config.hideLoading) {
    showLoading()
  }
  if (config.timeout < AXIOSTIMEOUT) {
    config.timeout = AXIOSTIMEOUT
  }
  config.headers = {
    ...config.headers,
    cookie: localStorage.getItem('cookieStr'),
  }
  return config
},(err) => {
  console.log('请求err==',err)
  return err
})
// 响应拦截
Axios.interceptors.response.use((res) => {
  console.log('响应==',res)
  if (!res.config.hideLoading) {
    hideLoading()
  }
  if (res.status === 200) {
    if (res.data.code === '00000000') {
      return res.data.data
    } else if (res.data.code === 'A00') {
      Toast({ message: res.data.message,duration: 1000,onClose: () => {
        console.log('window.vm====',window.vm)
        sessionStorage.setItem('fromRouteName',window.vm.$route.name)
        window.vm.$router.push('/Login')
      } })
      return Promise.reject(res)
    }
  } else {
    Toast({ message: '请求异常',duration: 2000 })
    return Promise.reject(res)
  }
},(err) => {
  if (!err.config.hideLoading) {
    hideLoading()
  }
  console.log('响应err==',err)
  Toast({ message: '连接服务器失败',duration: 2000 })
  return err
})

function get (url,params = {},config = {}) {
  return Axios.get(url,{ ...config,params })
}
function post (url,params = {},config = {}) {
  return Axios.post(url,params,config)
}

export default {
  get,
  post,
}
