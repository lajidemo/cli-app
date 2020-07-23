import common from './common'
import $axios from '@/assets/js/config'

export function apiLogin (params,config) {
  return $axios.get(common.login,params,config)
}
