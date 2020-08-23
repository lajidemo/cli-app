/**
 * 接口请求(请求方法，接口名，上送参数，自定义参数)
 */
import commonApi from './commonApi'
import $axios from '@/assets/js/interceptors'

export function login (params,config) {
  return $axios.get(commonApi.login,params,config)
}

export function addCars (params,config) {
  return $axios.post(commonApi.addCars,params,config)
}

export function getList (params,config) {
  return $axios.get(commonApi.getList,params,config)
}
