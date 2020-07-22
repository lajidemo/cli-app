import axios from 'axios'
import Vue from 'vue'
import Loading from '../../components/Loading/Loading.vue'

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
    // new $loading().$mount('#loadingNote') // 此方法会直接替换掉“#loadingNote”元素
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

Axios.interceptors.request.use((config) => {
  console.log('请求==',config)
  if (!config.hideLoading) {
    showLoading()
  }
  if (config.timeout < AXIOSTIMEOUT) {
    config.timeout = AXIOSTIMEOUT
  }
  return config
},(err) => {
  // if (!config.hideLoading) {
  //   showLoading()
  // }
  console.log(err)
  return err
})
Axios.interceptors.response.use((res) => {
  console.log('响应==',res)
  if (!res.config.hideLoading) {
    hideLoading()
  }
  return res
},(err) => {
  // if (!res.config.hideLoading) {
  //   hideLoading()
  // }
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
