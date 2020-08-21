import commonApi from './commonApi'
import $axios from '@/assets/js/interceptors'

export function apiLogin (params,config) {
  return $axios.get(commonApi.login,params,config)
}

export function addCars (params,config) {
  return $axios.post(commonApi.addCars,params,config)
}
