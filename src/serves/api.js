import common from './common'
import $axios from '@/assets/js/interceptors'

export function apiLogin (params,config) {
  return $axios.get(common.login,params,config)
}
