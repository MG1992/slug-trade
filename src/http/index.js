import axios from 'axios'
import defaultConfig, { defaultRequestCallBack } from './defaultConfig'
import apiAjax from './apiAjax'
// import Cookie from 'js-cookie'
import { Toast } from 'vant'
import repeatRequest from './repeatRequest'
import i18n from '@/langs'

let $http = null
let requestObj = {}
if (process.env.VUE_APP_IS_APP) {
  $http = apiAjax
} else {
  $http = axios.create({
    baseURL: defaultConfig.baseURL,
    timeout: defaultConfig.timeout,
    headers: defaultConfig.headers
  })
  // request拦截器
  $http.interceptors.request.use(config => {
    const conf = defaultConfig.getToken(config)
    requestObj = conf
    // 防止重复请求
    const configs = repeatRequest.beforeRequest(conf)
    return configs
  }, error => {
    // Do something with request error
    Promise.reject(error)
  })

  // response 拦截器
  $http.interceptors.response.use(
    response => {
      // 释放重复请求
      repeatRequest.afterRequest(requestObj)
      return defaultRequestCallBack(response)
    },
    error => {
      Toast(i18n.t(`requestResponse.OTHER_ERROR`))
      return Promise.reject(error)
    }
  )
}

export default $http
